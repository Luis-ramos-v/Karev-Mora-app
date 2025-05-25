# PowerShell script to rename background images
$imageDir = "public/images"
$mapping = @{
    "Imagen de WhatsApp 2025-05-17 a las 16.05.44_0dd9dd71.jpg" = "background-1.jpg"
    "Imagen de WhatsApp 2025-05-17 a las 16.05.44_3b2fb5bd.jpg" = "background-2.jpg"
    "Imagen de WhatsApp 2025-05-17 a las 16.05.44_62b6422d.jpg" = "background-3.jpg"
    "Imagen de WhatsApp 2025-05-17 a las 16.05.44_6e5cb684.jpg" = "background-4.jpg"
    "Imagen de WhatsApp 2025-05-17 a las 16.05.44_bb63478c.jpg" = "background-5.jpg"
    "Imagen de WhatsApp 2025-05-17 a las 16.05.44_df0c665e.jpg" = "background-6.jpg"
    "Imagen de WhatsApp 2025-05-17 a las 16.05.45_589a6d94.jpg" = "background-7.jpg"
    "Imagen de WhatsApp 2025-05-17 a las 16.05.45_68190c10.jpg" = "background-8.jpg"
    "Imagen de WhatsApp 2025-05-17 a las 16.05.45_864c8c2d.jpg" = "background-9.jpg"
    "Imagen de WhatsApp 2025-05-17 a las 16.05.45_c61654dc.jpg" = "background-10.jpg"
}

# Create a backup directory
$backupDir = "$imageDir/backup"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Write-Host "Created backup directory at $backupDir"
}

# Backup and rename files
foreach ($oldName in $mapping.Keys) {
    $oldPath = Join-Path $imageDir $oldName
    $newName = $mapping[$oldName]
    $newPath = Join-Path $imageDir $newName
    $backupPath = Join-Path $backupDir $oldName

    if (Test-Path $oldPath) {
        # Create backup
        Copy-Item $oldPath $backupPath
        Write-Host "Backed up $oldName to $backupPath"

        # Rename file
        Rename-Item -Path $oldPath -NewName $newName
        Write-Host "Renamed $oldName to $newName"
    } else {
        Write-Host "Warning: File $oldName not found" -ForegroundColor Yellow
    }
}

Write-Host "`nImage renaming complete!" -ForegroundColor Green
Write-Host "Backups are stored in $backupDir" -ForegroundColor Cyan 