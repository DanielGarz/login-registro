output "app_url" {
  description = "URL de la aplicación"
  value       = "http://localhost:${var.app_port}"
}

output "container_id" {
  description = "ID del contenedor"
  value       = docker_container.app_container.id
}

output "network_id" {
  description = "ID de la red Docker"
  value       = docker_network.app_network.id
}

output "volume_id" {
  description = "ID del volumen de la base de datos"
  value       = docker_volume.db_volume.id
}