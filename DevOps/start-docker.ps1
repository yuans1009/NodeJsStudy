# Start or stop Docker services defined in docker-compose.yml
param(
	[string]$Action = "start"
)

if ($Action -eq "stop") {
	Write-Host "Stopping Docker services..."
	docker-compose -f "$(Join-Path $PSScriptRoot 'docker-compose.yml')" down
	Write-Host "Services stopped."
} else {
	Write-Host "Starting Docker services..."
	docker-compose -f "$(Join-Path $PSScriptRoot 'docker-compose.yml')" up -d
	Write-Host "Services started."
}
