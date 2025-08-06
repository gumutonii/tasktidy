# TaskTidy

TaskTidy is a full-stack task management application built with a React frontend, Node.js/Express backend, MongoDB Atlas for data storage, and deployed using Docker containers on Azure App Service. The application features a comprehensive CI/CD pipeline with automated security scanning, monitoring, and deployment capabilities.

## 🚀 CI/CD Pipeline Features

- **Automated Deployment**: Full CI/CD pipeline with automated deployment to Azure App Service
- **Security Integration**: DevSecOps practices with vulnerability scanning and security gates
- **Monitoring & Observability**: Comprehensive monitoring dashboard with health checks and alerting
- **Release Management**: Automated releases with changelog generation and version management
- **Infrastructure as Code**: Terraform-managed infrastructure with automated provisioning 

---

## Table of Contents

- [Features](#features)
- [CI/CD Pipeline](#cicd-pipeline)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Monitoring & Operations](#monitoring--operations)
- [Security](#security)
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

## CI/CD Pipeline

### Automated Deployment Process

The CI/CD pipeline automatically triggers on every push to the main branch and includes:

1. **Security Scanning**
   - Trivy vulnerability scanner for code and containers
   - npm audit for dependency vulnerabilities
   - Security gates to prevent deployment of vulnerable code

2. **Build & Test**
   - Automated testing with Jest and Vitest
   - Code linting with ESLint
   - Multi-stage Docker builds
   - Container image security scanning

3. **Infrastructure Deployment**
   - Terraform-managed Azure infrastructure
   - Automated resource provisioning
   - Environment configuration management

4. **Application Deployment**
   - Automated deployment to Azure App Service
   - Container image updates
   - Service restart and health verification

5. **Monitoring & Health Checks**
   - Automated health check validation
   - Performance monitoring setup
   - Alert system configuration

6. **Release Management**
   - Automated GitHub releases
   - Changelog generation
   - Version tagging and documentation

### Pipeline Configuration

The pipeline is configured in `.github/workflows/main.yml` and includes:

- **Security Jobs**: Vulnerability scanning and dependency auditing
- **Build Jobs**: Application building and testing
- **Deploy Jobs**: Infrastructure and application deployment
- **Monitor Jobs**: Health checks and monitoring setup
- **Release Jobs**: Automated release creation

For detailed pipeline documentation, see [CI/CD Pipeline Documentation](docs/CI-CD-PIPELINE.md).

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/)
- [Terraform](https://www.terraform.io/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### 1. Clone the repository

```bash
git clone https://github.com/gumutonii/tasktidy.git
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

## Monitoring & Operations

### Health Monitoring

The application includes comprehensive health monitoring:

- **Backend Health Endpoint**: `https://tasktidy-backend-gumutoni.azurewebsites.net/api/health`
- **Frontend Health Check**: `https://tasktidy-frontend-gumutoni.azurewebsites.net`
- **Automated Health Checks**: 30-second intervals
- **Performance Monitoring**: Real-time metrics and alerting

### Monitoring Dashboard

A comprehensive monitoring dashboard is configured with:

- Application health status
- Performance metrics (response time, throughput, error rates)
- Infrastructure status (Azure App Service, database, containers)
- Security alerts and vulnerability tracking

For detailed monitoring documentation, see [Monitoring Documentation](docs/MONITORING.md).

## Security

### DevSecOps Integration

The application implements comprehensive security practices:

- **Automated Security Scanning**: Trivy vulnerability scanner for code and containers
- **Dependency Auditing**: npm audit for vulnerability detection
- **Security Gates**: Automated blocking of vulnerable deployments
- **Container Security**: Multi-layer security scanning
- **Compliance**: OWASP Top 10 compliance and security best practices

### Security Features

- JWT-based authentication with secure token management
- Input validation and sanitization
- CORS configuration for secure cross-origin requests
- HTTPS enforcement in production
- Regular security updates and vulnerability patching

For detailed security documentation, see [Security Documentation](docs/SECURITY.md).

## Troubleshooting

### Common Issues

- **Frontend "Application Error"**: Ensure the Dockerfile exposes port 80 and the Nginx config does not proxy to a Docker network host.
- **Backend MongoDB Timeout**: Make sure your MongoDB Atlas cluster allows connections from Azure App Service IPs or `0.0.0.0/0` for testing.
- **CORS Issues**: Ensure `FRONTEND_URL` is set correctly in backend environment variables.
- **Environment Variables Not Working**: In Azure, set them in the App Service Configuration, not in `.env` files.
- **Container Not Updating**: Restart the App Service after pushing a new Docker image.

### CI/CD Pipeline Issues

- **Security Scan Failures**: Check Trivy scan results in GitHub Security tab and update vulnerable dependencies
- **Build Failures**: Verify Node.js version compatibility and dependency installation
- **Deployment Failures**: Check Azure credentials and App Service configuration
- **Health Check Failures**: Verify application startup and database connectivity

### Monitoring and Alerting

- **High Error Rates**: Check application logs and database connectivity
- **Performance Issues**: Monitor resource utilization and optimize queries
- **Security Alerts**: Review vulnerability reports and update dependencies
- **Service Outages**: Check Azure App Service status and container health


#Live URLs: https://tasktidy-frontend-gumutoni.azurewebsites.net

            https://tasktidy-backend-gumutoni.azurewebsites.net/api/tasks
            
# Demo video:  https://youtu.be/g7rkldwNZY0





