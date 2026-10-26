param(
    [Parameter(Mandatory = $true)]
    [string]$OutputPath,
    [string]$NodePath
)

$ErrorActionPreference = 'Stop'
$compiler = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
if (-not (Test-Path -LiteralPath $compiler)) {
    throw "The .NET Framework C# compiler was not found at $compiler."
}

if (-not $NodePath) {
    $nodeCommand = Get-Command node.exe -ErrorAction Stop
    $NodePath = $nodeCommand.Source
}
if (-not (Test-Path -LiteralPath $NodePath)) {
    throw "Node.js runtime was not found at $NodePath."
}

$payloadFiles = @(
    @{ Path = 'index.html'; Name = 'payload.index.html' },
    @{ Path = 'style.css'; Name = 'payload.style.css' },
    @{ Path = 'app.js'; Name = 'payload.app.js' },
    @{ Path = 'lessons.js'; Name = 'payload.lessons.js' },
    @{ Path = 'simulator.js'; Name = 'payload.simulator.js' },
    @{ Path = 'dev_server.js'; Name = 'payload.dev_server.js' },
    @{ Path = $NodePath; Name = 'payload.node.exe' }
)

foreach ($font in Get-ChildItem -LiteralPath (Join-Path $PSScriptRoot 'fonts') -File) {
    $payloadFiles += @{ Path = $font.FullName; Name = "payload.fonts.$($font.Name)" }
}

$assemblyInfo = Join-Path ([System.IO.Path]::GetTempPath()) ("QuingCppCoreAssemblyInfo-{0}.cs" -f [guid]::NewGuid().ToString('N'))
$outputFullPath = [System.IO.Path]::GetFullPath($OutputPath)
$outputDirectory = [System.IO.Path]::GetDirectoryName($outputFullPath)
if (-not (Test-Path -LiteralPath $outputDirectory)) {
    New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
}

try {
    & (Join-Path $PSScriptRoot 'build_version_info.ps1') -OutputPath $assemblyInfo

    $arguments = @(
        '/nologo',
        '/target:winexe',
        "/out:$outputFullPath",
        (Join-Path $PSScriptRoot 'launcher.cs'),
        $assemblyInfo
    )

    foreach ($payload in $payloadFiles) {
        $sourcePath = if ([System.IO.Path]::IsPathRooted($payload.Path)) {
            $payload.Path
        } else {
            Join-Path $PSScriptRoot $payload.Path
        }
        if (-not (Test-Path -LiteralPath $sourcePath)) {
            throw "Required launcher payload file was not found: $sourcePath"
        }
        $arguments += "/resource:$sourcePath,$($payload.Name)"
    }

    & $compiler @arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Launcher compilation failed with exit code $LASTEXITCODE."
    }
} finally {
    Remove-Item -LiteralPath $assemblyInfo -Force -ErrorAction SilentlyContinue
}
