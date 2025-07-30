terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "tasktidy" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_app_service_plan" "tasktidy" {
  name                = "tasktidy-service-plan"
  location            = azurerm_resource_group.tasktidy.location
  resource_group_name = azurerm_resource_group.tasktidy.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "backend" {
  name                = "tasktidy-backend-gumutoni"
  location            = azurerm_resource_group.tasktidy.location
  resource_group_name = azurerm_resource_group.tasktidy.name
  app_service_plan_id = azurerm_app_service_plan.tasktidy.id

  site_config {
    linux_fx_version = "DOCKER|umuton/tasktidy-backend:latest"
  }

  app_settings = {
    WEBSITES_PORT = "5000"
    MONGO_URI     = "mongodb+srv://gumutoni002:so7kLxdEuXdRaPMy@cluster0.cywyldh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    PORT          = "5000"
    FRONTEND_URL  = "https://tasktidy-frontend-gumutoni.azurewebsites.net"
    NODE_ENV      = "production"
  }
}

resource "azurerm_app_service" "frontend" {
  name                = "tasktidy-frontend-gumutoni"
  location            = azurerm_resource_group.tasktidy.location
  resource_group_name = azurerm_resource_group.tasktidy.name
  app_service_plan_id = azurerm_app_service_plan.tasktidy.id

  site_config {
    linux_fx_version = "DOCKER|umuton/tasktidy-frontend:latest"
  }

  app_settings = {
    WEBSITES_PORT = "80"
    VITE_API_URL  = "https://tasktidy-backend-gumutoni.azurewebsites.net/api/tasks"
    NODE_ENV      = "production"
  }
}