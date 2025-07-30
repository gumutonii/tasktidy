variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "tasktidy-devops"
}

variable "location" {
  description = "Azure region to deploy to"
  type        = string
  default     = "eastus"
}

variable "frontend_image" {
  description = "Frontend container image"
  type        = string
  default     = "umuton/tasktidy-frontend:latest"
}

variable "backend_image" {
  description = "Backend container image"
  type        = string
  default     = "umuton/tasktidy-backend:latest"
}

variable "mongo_image" {
  description = "MongoDB container image"
  type        = string
  default     = "mongo:latest"
}

variable "dockerhub_username" {
  description = "Docker Hub username for pulling private images or increasing rate limits"
  type        = string
  sensitive   = true
}

variable "dockerhub_password" {
  description = "Docker Hub password or access token"
  type        = string
  sensitive   = true
}