# TaskTidy

TaskTidy is a full-stack task management application built with a React frontend, Node.js/Express backend, MongoDB Atlas for data storage, and deployed using Docker containers on Azure App Service. Infrastructure as code is managed with Terraform. 

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Terraform Usage](#terraform-usage)
- [Docker Usage](#docker-usage)
- [Troubleshooting](#troubleshooting)


---

## Features

- User registration and authentication (JWT)
- Create, update, delete, and filter tasks
- Responsive React frontend (Vite)
- RESTful API backend (Express + TypeScript)
- MongoDB Atlas cloud database
- Dockerized for local and cloud deployment
- Infrastructure as Code with Terraform
- Azure App Service deployment

---

## Architecture

```mermaid
graph TD
  A[Frontend (React/Vite)] --API Calls--> B[Backend (Express/Node.js)]
  B --MongoDB Driver--> C[MongoDB Atlas]
  A --Docker--> D[Azure App Service]
  B --Docker--> D
  D --Terraform--> E[Azure Infrastructure]
```

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/)
- [Terraform](https://www.terraform.io/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/tasktidy.git
cd tasktidy
```

### 2. Set up environment variables

Create `.env` files in both `backend/` and `frontend/` directories.

**backend/.env**
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://tasktidy-frontend-gumutoni.azurewebsites.net
```

**frontend/.env**
```
VITE_API_URL=https://tasktidy-backend-gumutoni.azurewebsites.net
NODE_ENV=development
```

### 3. Run locally with Docker Compose

```bash
docker-compose up --build
```
```bash
# for production
- Frontend: [http://localhost:5713](http://localhost:5713)
- Backend: [http://localhost:5000/api](http://localhost:5000/api)
```

## Environment Variables

**Backend**
- `MONGO_URI`: MongoDB Atlas connection string
- `PORT`: Port for Express server (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `JWT_SECRET`: Secret for JWT authentication
- `FRONTEND_URL`: URL of the frontend (for CORS)

**Frontend**
- `VITE_API_URL`: URL of the backend API 
- `NODE_ENV`: Environment (development/production)

> **Note:** In Azure App Service, set these variables in the App Service Configuration, not in `.env` files.

---

## Deployment

### 1. Build and Push Docker Images

```bash
# Backend
cd backend
docker build -t yourdockerhub/tasktidy-backend:latest .
docker push yourdockerhub/tasktidy-backend:latest

# Frontend
cd ../frontend
docker build -t yourdockerhub/tasktidy-frontend:latest .
docker push yourdockerhub/tasktidy-frontend:latest
```

### 2. Provision Azure Infrastructure with Terraform

```bash
cd terraform
terraform init
terraform apply -auto-approve
```

### 3. Restart Azure App Services (if needed)

```bash
az webapp restart --name tasktidy-backend-gumutoni --resource-group tasktidy-devops
az webapp restart --name tasktidy-frontend-gumutoni --resource-group tasktidy-devops
```

---

## Terraform Usage

- All Terraform state and sensitive files are excluded via `.gitignore`.
- Update environment variables in `main.tf` as needed.
- Outputs will provide the deployed URLs for frontend and backend.

---

## Docker Usage

- Both frontend and backend are multi-stage Docker builds.
- The frontend is served via Nginx on port 80 (required for Azure).
- The backend exposes port 5000.

---

## Troubleshooting

- **Frontend "Application Error"**: Ensure the Dockerfile exposes port 80 and the Nginx config does not proxy to a Docker network host.
- **Backend MongoDB Timeout**: Make sure your MongoDB Atlas cluster allows connections from Azure App Service IPs or `0.0.0.0/0` for testing.
- **CORS Issues**: Ensure `FRONTEND_URL` is set correctly in backend environment variables.
- **Environment Variables Not Working**: In Azure, set them in the App Service Configuration, not in `.env` files.
- **Container Not Updating**: Restart the App Service after pushing a new Docker image.


