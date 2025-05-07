variable "app_port" {
  description = "Puerto en el que se ejecutará la aplicación"
  type        = number
  default     = 3000
}

variable "app_name" {
  description = "Nombre de la aplicación"
  type        = string
  default     = "login-registro"
}

variable "container_name" {
  description = "Nombre del contenedor"
  type        = string
  default     = "login-registro-container"
}

variable "network_name" {
  description = "Nombre de la red Docker"
  type        = string
  default     = "app-network"
}

variable "volume_name" {
  description = "Nombre del volumen para la base de datos"
  type        = string
  default     = "app-db-volume"
}