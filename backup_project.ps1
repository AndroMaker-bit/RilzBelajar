$sourceDir = "D:\project\study-ai"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$tempZipFolder = "D:\project\study-ai-backup-$timestamp"
$zipFile = "D:\project\study-ai-backup-$timestamp.zip"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "    BACKUP PELAJARIN.FREE (STUDY AI)      " -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

# Check for external drives (removable or other fixed drives besides C and D)
$allDrives = Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Name -notin @('C', 'D') }
$targetDir = $null

if ($allDrives.Count -gt 0) {
    Write-Host "Drive eksternal terdeteksi:" -ForegroundColor Green
    foreach ($d in $allDrives) {
        Write-Host "  - Drive $($d.Name): ($([Math]::Round($d.Free/1GB, 2)) GB Free)"
    }
    $targetDir = "$($allDrives[0].Root)Backup_StudyAI"
} else {
    Write-Host "Tidak ada drive eksternal USB yang dicolok saat ini." -ForegroundColor Yellow
    Write-Host "Backup akan disimpan di D:\project sebagai file ZIP kompak." -ForegroundColor Gray
}

# Create temporary export directory without node_modules
Write-Host "Menyiapkan file source (exclude node_modules & dist)..."
New-Item -ItemType Directory -Path $tempZipFolder -Force | Out-Null

$itemsToCopy = Get-ChildItem -Path $sourceDir | Where-Object { $_.Name -notin @('node_modules', 'dist', '.git') }
foreach ($item in $itemsToCopy) {
    Copy-Item -Path $item.FullName -Destination $tempZipFolder -Recurse -Force
}

# Compress to ZIP
Write-Host "Membuat file ZIP: $zipFile ..." -ForegroundColor Cyan
Compress-Archive -Path "$tempZipFolder\*" -DestinationPath $zipFile -Force
Remove-Item -Path $tempZipFolder -Recurse -Force

if ($targetDir) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    Copy-Item -Path $zipFile -Destination $targetDir -Force
    Write-Host "Salinan ZIP juga berhasil dicopy ke HDD eksternal: $targetDir" -ForegroundColor Green
}

Write-Host ""
Write-Host "SUCCESS! Backup selesai disimpan di:" -ForegroundColor Green
Write-Host "  -> $zipFile" -ForegroundColor White
Write-Host "Ukuran file: $([Math]::Round((Get-Item $zipFile).Length / 1KB, 2)) KB" -ForegroundColor Cyan
