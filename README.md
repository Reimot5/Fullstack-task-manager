# Fullstack-task-manager
Fullstack Challenge: “Gestor de Tareas con Autenticación”

## 📌 Resumen
Este proyecto es un **Gestor de Tareas** con autenticación robusta usando **JWT + Refresh Token**, desarrollado con **React (SPA) + Zustand + TanStack Query + Tailwind v4 + shadcn/ui** en el frontend y **Node.js + Express + TypeORM + PostgreSQL** en el backend, corriendo todo en local mediante **Docker Compose**.

## 🚀 Guía de uso
Para ejecutar este codigo necesitas tener Docker Desktop instalado si usas Windows.

1️⃣ Clona el repositorio:
```bash
git clone https://github.com/Reimot5/Fullstack-task-manager
cd Fullstack_task_manager
```

2️⃣ Copia el archivo de entorno:
Crea una copia del archivo .env.example y ponle el nombre .env

En Linux o gitbash puedes usar:
```bash
cp backend/.env.example backend/.env
```

3️⃣ Construye e inicia los servicios:

Coloca en la terminal el siguiente comando.
```bash
docker compose up --build -d
```

4️⃣ Accede al frontend de la aplicación colocando esta url en el navegador:
- Frontend: http://localhost:5173

Esta es la url del backend:
- Backend API: http://localhost:4000

5️⃣ Para correr tests en el backend:
```bash
docker compose exec backend npm run test
```

## 📋 Scripts útiles
| Acción                 | Comando                                    |
| ---------------------- | ------------------------------------------ |
| Construir contenedores | `docker-compose up --build -d`             |
| Parar contenedores     | `docker-compose down`                      |
| Correr tests backend   | `docker-compose exec backend npm run test` |

Creado por Tomas Rubiño