using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Net;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Win32;

namespace Quing.Learn
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            string baseDir;
            try
            {
                baseDir = EnsureEmbeddedAppFiles();
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Quing C++ Core could not prepare its built-in app files.\n\n" + ex.Message,
                    "Quing learn — C++ Core",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
                return;
            }

            string serverScript = Path.Combine(baseDir, "dev_server.js");
            string nodeExe = Path.Combine(baseDir, "node.exe");

            // 1. Check if server is already responding
            bool serverReady = IsServerResponding("http://localhost:8000/api/status");

            if (!serverReady)
            {
                ProcessStartInfo serverPsi = new ProcessStartInfo
                {
                    FileName = nodeExe,
                    Arguments = "\"" + serverScript + "\"",
                    WorkingDirectory = baseDir,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    WindowStyle = ProcessWindowStyle.Hidden
                };

                try
                {
                    Process.Start(serverPsi);
                }
                catch (Exception ex)
                {
                    MessageBox.Show(
                        "Unable to launch the built-in companion server.\n\nError: " + ex.Message,
                        "Quing learn — Companion Server",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Error
                    );
                    return;
                }

                // Wait up to 6 seconds for server to be ready
                for (int i = 0; i < 30; i++)
                {
                    Thread.Sleep(200);
                    if (IsServerResponding("http://localhost:8000/api/status"))
                    {
                        serverReady = true;
                        break;
                    }
                }
            }

            // 2. Locate any available Chromium browser for native standalone App Mode
            string appBrowserPath = FindChromiumBrowser();
            bool launchedAppMode = false;

            if (!string.IsNullOrEmpty(appBrowserPath))
            {
                ProcessStartInfo appPsi = new ProcessStartInfo
                {
                    FileName = appBrowserPath,
                    Arguments = "--app=\"http://localhost:8000/?app=1\" --window-size=1280,820",
                    UseShellExecute = false
                };
                try
                {
                    Process.Start(appPsi);
                    launchedAppMode = true;
                }
                catch {}
            }

            // 3. If no Chromium browser, launch Zen Browser in dedicated new window
            if (!launchedAppMode)
            {
                string zenPath = @"C:\Program Files\Zen Browser\zen.exe";
                if (File.Exists(zenPath))
                {
                    try
                    {
                        Process.Start(new ProcessStartInfo
                        {
                            FileName = zenPath,
                            Arguments = "-new-window \"http://localhost:8000/?app=1\"",
                            UseShellExecute = false
                        });
                        launchedAppMode = true;
                    }
                    catch {}
                }
            }

            // 4. Final fallback to default browser
            if (!launchedAppMode)
            {
                try
                {
                    Process.Start(new ProcessStartInfo("http://localhost:8000/?app=1") { UseShellExecute = true });
                }
                catch (Exception ex)
                {
                    MessageBox.Show(
                        "Unable to open browser:\n" + ex.Message,
                        "Quing learn",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Error
                    );
                }
            }
        }

        static string EnsureEmbeddedAppFiles()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            Version version = assembly.GetName().Version;
            string versionText = version != null ? version.ToString() : "0.0.0.0";
            string appDir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "Quing",
                "C++ Core",
                versionText
            );
            string marker = Path.Combine(appDir, ".payload-ready");
            string[] resources = new string[]
            {
                "payload.index.html",
                "payload.style.css",
                "payload.app.js",
                "payload.lessons.js",
                "payload.simulator.js",
                "payload.dev_server.js",
                "payload.node.exe",
                "payload.fonts.InterVariable.ttf",
                "payload.fonts.InterVariable-Italic.ttf",
                "payload.fonts.Inter.ttc",
                "payload.fonts.JetBrainsMono-VariableFont_wght.ttf",
                "payload.fonts.JetBrainsMono-Italic-VariableFont_wght.ttf"
            };
            string[] relativePaths = new string[]
            {
                "index.html",
                "style.css",
                "app.js",
                "lessons.js",
                "simulator.js",
                "dev_server.js",
                "node.exe",
                "fonts/InterVariable.ttf",
                "fonts/InterVariable-Italic.ttf",
                "fonts/Inter.ttc",
                "fonts/JetBrainsMono-VariableFont_wght.ttf",
                "fonts/JetBrainsMono-Italic-VariableFont_wght.ttf"
            };

            if (!File.Exists(marker))
            {
                Directory.CreateDirectory(appDir);
                for (int i = 0; i < resources.Length; i++)
                {
                    string resourceName = resources[i];
                    string destination = Path.Combine(appDir, relativePaths[i].Replace('/', Path.DirectorySeparatorChar));
                    string destinationDirectory = Path.GetDirectoryName(destination);
                    if (!String.IsNullOrEmpty(destinationDirectory)) Directory.CreateDirectory(destinationDirectory);

                    using (Stream source = assembly.GetManifestResourceStream(resourceName))
                    {
                        if (source == null)
                        {
                            throw new FileNotFoundException("Embedded app resource is missing: " + resourceName);
                        }
                        using (FileStream target = File.Create(destination))
                        {
                            source.CopyTo(target);
                        }
                    }
                }
                File.WriteAllText(marker, versionText);
            }

            return appDir;
        }

        static string FindChromiumBrowser()
        {
            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string progFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
            string progFilesX86 = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86);

            // Candidate Chromium paths (including Vivaldi, Helium, Chrome, Brave, Edge)
            string[] candidates = new string[]
            {
                // Vivaldi
                Path.Combine(localAppData, @"Vivaldi\Application\vivaldi.exe"),
                Path.Combine(progFiles, @"Vivaldi\Application\vivaldi.exe"),

                // Helium Chrome
                Path.Combine(localAppData, @"imput\Helium\Application\chrome.exe"),

                // Google Chrome
                Path.Combine(progFiles, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(progFilesX86, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(localAppData, @"Google\Chrome\Application\chrome.exe"),

                // Brave
                Path.Combine(progFiles, @"BraveSoftware\Brave-Browser\Application\brave.exe"),
                Path.Combine(localAppData, @"BraveSoftware\Brave-Browser\Application\brave.exe"),

                // Microsoft Edge
                Path.Combine(progFilesX86, @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(progFiles, @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(localAppData, @"Microsoft\Edge\Application\msedge.exe")
            };

            foreach (string path in candidates)
            {
                if (File.Exists(path))
                {
                    return path;
                }
            }

            // Check Windows Registry App Paths
            string[] regKeys = new string[] { "chrome.exe", "vivaldi.exe", "brave.exe", "msedge.exe" };
            foreach (string name in regKeys)
            {
                string path = GetRegistryAppPath(name);
                if (!string.IsNullOrEmpty(path) && File.Exists(path))
                {
                    return path;
                }
            }

            return null;
        }

        static string GetRegistryAppPath(string appName)
        {
            try
            {
                using (RegistryKey key = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\App Paths\" + appName))
                {
                    if (key != null)
                    {
                        object val = key.GetValue("");
                        if (val != null) return val.ToString();
                    }
                }
                using (RegistryKey key = Registry.LocalMachine.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\App Paths\" + appName))
                {
                    if (key != null)
                    {
                        object val = key.GetValue("");
                        if (val != null) return val.ToString();
                    }
                }
            }
            catch {}
            return null;
        }

        static bool IsServerResponding(string url)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Timeout = 800;
                request.Method = "GET";
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    return response.StatusCode == HttpStatusCode.OK;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}
