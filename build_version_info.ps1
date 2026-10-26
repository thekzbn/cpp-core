param(
    [Parameter(Mandatory = $true)]
    [string]$OutputPath
)

$version = (Get-Content -LiteralPath (Join-Path $PSScriptRoot 'VERSION') -Raw).Trim()
$versionMatch = [regex]::Match(
    $version,
    '^(?<numeric>\d+\.\d+\.\d+\.\d+)(?:-(?:alpha|beta))?$'
)

if (-not $versionMatch.Success) {
    throw "VERSION must use MAJOR.MINOR.PATCH.REVISION with optional -alpha or -beta; found '$version'."
}

$numericVersion = $versionMatch.Groups['numeric'].Value

$source = @"
using System.Reflection;
[assembly: AssemblyTitle("Quing C++ Core")]
[assembly: AssemblyProduct("Quing learn")]
[assembly: AssemblyCompany("Quing")]
[assembly: AssemblyDescription("Quing C++ Core local launcher")]
[assembly: AssemblyVersion("$numericVersion")]
[assembly: AssemblyFileVersion("$numericVersion")]
[assembly: AssemblyInformationalVersion("$version")]
"@

[System.IO.File]::WriteAllText(
    $OutputPath,
    $source,
    [System.Text.UTF8Encoding]::new($false)
)
