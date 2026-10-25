param(
    [Parameter(Mandatory = $true)]
    [string]$OutputPath
)

$version = (Get-Content -LiteralPath (Join-Path $PSScriptRoot 'VERSION') -Raw).Trim()
if ($version -notmatch '^\d+\.\d+\.\d+$') {
    throw "VERSION must use MAJOR.MINOR.PATCH format; found '$version'."
}

$assemblyVersion = "$version.0"
$source = @"
using System.Reflection;
[assembly: AssemblyTitle("Quing C++ Core")]
[assembly: AssemblyProduct("Quing learn")]
[assembly: AssemblyCompany("Quing")]
[assembly: AssemblyDescription("Quing C++ Core local launcher")]
[assembly: AssemblyVersion("$assemblyVersion")]
[assembly: AssemblyFileVersion("$assemblyVersion")]
[assembly: AssemblyInformationalVersion("$version")]
"@

[System.IO.File]::WriteAllText(
    $OutputPath,
    $source,
    [System.Text.UTF8Encoding]::new($false)
)
