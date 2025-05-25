$directories = @(
    # Components
    "src\components\common",
    "src\components\layout",
    "src\components\pages",
    
    # Hooks
    "src\hooks",
    
    # Services
    "src\services",
    
    # Utils
    "src\utils",
    
    # Types
    "src\types",
    
    # Styles
    "src\styles",
    
    # Assets
    "src\assets\images",
    "src\assets\fonts",
    "src\assets\icons",
    
    # Tests
    "src\__tests__\components",
    "src\__tests__\hooks",
    "src\__tests__\services",
    "src\__tests__\utils"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
        Write-Host "Created directory: $dir"
    }
} 