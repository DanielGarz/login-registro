terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

# Crear una red Docker para la aplicación
resource "docker_network" "app_network" {
  name = "app-network"
}

# Crear un volumen para la base de datos SQLite
resource "docker_volume" "db_volume" {
  name = "app-db-volume"
}

# Construir y ejecutar el contenedor de la aplicación
resource "docker_image" "app_image" {
  name = "login-registro-app"
  build {
    context = ".."
    dockerfile = "Dockerfile"
  }
}

resource "docker_container" "app_container" {
  name  = "login-registro-container"
  image = docker_image.app_image.image_id
  ports {
    internal = 3000
    external = 3000
  }
  volumes {
    volume_name    = docker_volume.db_volume.name
    container_path = "/usr/src/app/data"
  }
  networks_advanced {
    name = docker_network.app_network.name
  }
  env = [
    "PORT=3000",
    "NODE_ENV=production"
  ]
}