output "frontend_url" {
  description = "URL to access the frontend"
  value       = "https://${azurerm_app_service.frontend.default_site_hostname}"
}

output "backend_url" {
  description = "URL to access the backend API"
  value       = "https://${azurerm_app_service.backend.default_site_hostname}"
}

output "resource_group_name" {
  description = "Name of the created resource group"
  value       = azurerm_resource_group.tasktidy.name
}