$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$output = Join-Path $root 'docs\data\catalog.json'
$folders = @('agents', 'workflows', 'templates', 'guardrails', 'skills')
$items = foreach ($folder in $folders) {
  $base = Join-Path $root $folder
  if (-not (Test-Path -LiteralPath $base)) { continue }
  Get-ChildItem -LiteralPath $base -Recurse -File -Filter '*.md' | ForEach-Object {
    $rawContent = [IO.File]::ReadAllText($_.FullName)
    $content = $rawContent
    $metadata = @{}
    $frontmatter = [regex]::Match($rawContent, '\A---\r?\n(?<yaml>[\s\S]*?)\r?\n---\s*(?:\r?\n)?')
    if ($frontmatter.Success) {
      $frontmatter.Groups['yaml'].Value -split '\r?\n' | ForEach-Object {
        $property = [regex]::Match($_, '^(name|title|description|order|phase|usage|condition|output|next):\s*(.*)$')
        if ($property.Success) { $metadata[$property.Groups[1].Value] = $property.Groups[2].Value.Trim(' ', '"', "'") }
      }
      $content = $rawContent.Substring($frontmatter.Length)
    }
    $heading = [regex]::Match($content, '(?m)^#\s+(.+)$')
    $title = if ($heading.Success) { $heading.Groups[1].Value.Trim() } elseif ($metadata.name) { $metadata.name } else { [IO.Path]::GetFileNameWithoutExtension($_.Name) }
    $plain = ($content -replace '(?m)^#{1,6}\s*', '' -replace '`', '' -replace '\*', '' -replace '\[(.*?)\]\(.*?\)', '$1' -replace '\s+', ' ').Trim()
    $sourceDescription = if ($metadata.description) { $metadata.description } else { $plain }
    $description = if ($sourceDescription.Length -gt 220) { $sourceDescription.Substring(0, 217) + '...' } else { $sourceDescription }
    $relative = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    $kind = $folder.Substring(0, 1).ToUpper() + $folder.Substring(1)
    [PSCustomObject]@{ title = $title; kind = $kind; path = $relative; description = $description; metadata = $metadata; content = $content; rawContent = $rawContent }
  }
}
$items = $items | Sort-Object @{ Expression = { if ($_.kind -eq 'Workflows' -and $_.metadata.order) { [int]$_.metadata.order } else { 999 } } }, kind, title
$items | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $output -Encoding utf8
Write-Host "Generated $($items.Count) entries → $output"
