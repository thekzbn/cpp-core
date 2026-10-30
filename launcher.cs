using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Net;
using System.Net.Sockets;
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
            Version appVersion = Assembly.GetExecutingAssembly().GetName().Version;
            string versionText = appVersion != null ? appVersion.ToString() : "0.0.0.0";
            int serverPort = 8000;
            string serverUrl = "http://localhost:" + serverPort;
            bool serverReady = IsServerForVersion(serverUrl + "/api/status", versionText);

            // Replace an older Quing server on the normal origin to keep browser storage intact.
            if (!serverReady)
            {
                if (!IsPortAvailable(serverPort))
                {
                    if (IsQuingServer(serverUrl + "/api/status"))
                    {
                        RequestServerShutdown(serverUrl + "/api/shutdown");
                        for (int i = 0; i < 15 && !IsPortAvailable(serverPort); i++)
                        {
                            Thread.Sleep(200);
                        }
                    }

                    if (!IsPortAvailable(serverPort))
                    {
                        serverPort = GetAvailablePort();
                        serverUrl = "http://localhost:" + serverPort;
                    }
                }

                ProcessStartInfo serverPsi = new ProcessStartInfo
                {
                    FileName = nodeExe,
                    Arguments = "\"" + serverScript + "\"",
                    WorkingDirectory = baseDir,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    WindowStyle = ProcessWindowStyle.Hidden
                };
                serverPsi.EnvironmentVariables["QUING_PORT"] = serverPort.ToString();
                serverPsi.EnvironmentVariables["QUING_VERSION"] = versionText;

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

                // Wait up to 6 seconds for this launcher's server to be ready
                for (int i = 0; i < 30; i++)
                {
                    Thread.Sleep(200);
                    if (IsServerForVersion(serverUrl + "/api/status", versionText))
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
                    Arguments = "--app=\"" + serverUrl + "/?app=1&apiPort=" + serverPort + "\" --window-size=1280,820",
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
                            Arguments = "-new-window \"" + serverUrl + "/?app=1&apiPort=" + serverPort + "\"",
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
                    Process.Start(new ProcessStartInfo(serverUrl + "/?app=1&apiPort=" + serverPort) { UseShellExecute = true });
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
                "payload.src.core.storage.js",
                "payload.src.core.theme.js",
                "payload.src.compiler.native-runner.js",
                "payload.src.compiler.toolchain.js",
                "payload.src.ui.terminal.js",
                "payload.src.ui.editor.js",
                "payload.src.ui.drills.js",
                "payload.src.ui.dialogs.js",
                "payload.src.ui.navigation.js",
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
                "src/core/storage.js",
                "src/core/theme.js",
                "src/compiler/native-runner.js",
                "src/compiler/toolchain.js",
                "src/ui/terminal.js",
                "src/ui/editor.js",
                "src/ui/drills.js",
                "src/ui/dialogs.js",
                "src/ui/navigation.js",
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

                // Helium Chrome
                Path.Combine(localAppData, @"imput\Helium\Application\chrome.exe"),

                // Vivaldi
                Path.Combine(localAppData, @"Vivaldi\Application\vivaldi.exe"),
                Path.Combine(progFiles, @"Vivaldi\Application\vivaldi.exe"),

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

        static int GetAvailablePort()
        {
            TcpListener listener = new TcpListener(IPAddress.Loopback, 0);
            listener.Start();
            int port = ((IPEndPoint)listener.LocalEndpoint).Port;
            listener.Stop();
            return port;
        }

        static bool IsPortAvailable(int port)
        {
            TcpListener listener = new TcpListener(IPAddress.Loopback, port);
            try
            {
                listener.Start();
                return true;
            }
            catch
            {
                return false;
            }
            finally
            {
                listener.Stop();
            }
        }

        static bool IsServerForVersion(string url, string expectedVersion)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Timeout = 800;
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    return response.StatusCode == HttpStatusCode.OK &&
                        reader.ReadToEnd().Contains("\"appVersion\":\"" + expectedVersion + "\"");
                }
            }
            catch
            {
                return false;
            }
        }

        static bool IsQuingServer(string url)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Timeout = 800;
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    string status = reader.ReadToEnd();
                    return response.StatusCode == HttpStatusCode.OK &&
                        status.Contains("\"online\":true") &&
                        status.Contains("\"compilerVersion\"");
                }
            }
            catch
            {
                return false;
            }
        }

        static void RequestServerShutdown(string url)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "POST";
                request.Timeout = 800;
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse()) {}
            }
            catch
            {
                // Older or non-Node companion servers may not support shutdown.
            }
        }
    }
}
