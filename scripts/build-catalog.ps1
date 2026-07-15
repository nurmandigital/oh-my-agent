$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$output = Join-Path $root 'docs\data\catalog.json'
$folders = @('agents', 'workflows', 'templates', 'guardrails', 'skills')
$items = foreach ($folder in $folders) {
  $base = Join-Path $root $folder
  if (-not (Test-Path -LiteralPath $base)) { continue }
  Get-ChildItem -LiteralPath $base -Recurse -File -Filter '*.md' | ForEach-Object {
    $content = [IO.File]::ReadAllText($_.FullName)
    $heading = [regex]::Match($content, '(?m)^#\s+(.+)$')
    $title = if ($heading.Success) { $heading.Groups[1].Value.Trim() } else { [IO.Path]::GetFileNameWithoutExtension($_.Name) }
    $plain = ($content -replace '(?m)^#{1,6}\s*', '' -replace '`', '' -replace '\*', '' -replace '\[(.*?)\]\(.*?\)', '$1' -replace '\s+', ' ').Trim()
    $description = if ($plain.Length -gt 220) { $plain.Substring(0, 217) + '...' } else { $plain }
    $relative = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    $kind = $folder.Substring(0, 1).ToUpper() + $folder.Substring(1)
    [PSCustomObject]@{ title = $title; kind = $kind; path = $relative; description = $description; content = $content }
  }
}
$items | Sort-Object kind, title | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $output -Encoding utf8
Write-Host "Generated $($items.Count) entries → $output"
