<h1 align="center">Login & Registro con TypeScript + SQLite + Docker + Terraform</h1>

<p align="center">
  Encriptación Contraseñas, RFCs y Tarjetas | Base de Datos | Docker Ready | Infraestructura como Código
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-Strong-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/SQLite-Local-blue?style=for-the-badge&logo=sqlite" />
  <img src="https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/Encriptación-Bcrypt-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Terraform-IaC-5C4EE5?style=for-the-badge&logo=terraform" />
</p>

---

## Descripción

Este proyecto implementa un sistema completo de **login y registro de usuarios** utilizando **TypeScript**, con conexión a una base de datos **SQLite**, preparado para ejecutarse en **Docker** y con infraestructura desplegable mediante **Terraform**. Incluye **validación y encriptación** de:

- Contraseñas
- RFCs
- Tarjetas de crédito/débito

---

## Tecnologías

- **TypeScript**
- **Node.js**
- **SQLite**
- **bcryptjs**
- **Express.js**
- **Docker**
- **Terraform**

---

### Se puede ejecutar de dos formas.

### 1. Ejecutar localmente

**Clona el repositorio**
```bash
git clone https://github.com/DanielGarz/login-registro
cd login-registro
```

```bash
npm install
```
**Crear archivo .env**
```bash
PORT=3000
DATABASE_URL=./database.sqlite
```

```bash
npm run dev
```

### 2. Ejecutar con docker
```bash
git clone https://github.com/DanielGarz/login-registro
cd login-registro
```

**Crear archivo .env**
```bash
PORT=3000
DATABASE_URL=./database.sqlite
```

```bash
docker build -t login-registro
```

```bash
docker run -p 3000:3000 --env-file .env login-registro
```
