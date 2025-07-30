#!/bin/bash

# TaskTidy Project Setup Script
echo "🚀 Setting up TaskTidy project structure..."

# Create necessary directories
mkdir -p terraform screenshots docs backend frontend

# Create Terraform directory structure
cd terraform
mkdir -p modules

# Go back to root
cd ..

# Create environment files from templates
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend environment file..."
    cp backend/.env.example backend/.env
    echo "✏️  Please edit backend/.env with your configuration"
fi

if [ ! -f frontend/.env ]; then
    echo "📝 Creating frontend environment file..."
    cp frontend/.env.example frontend/.env
    echo "✏️  Please edit frontend/.env with your configuration"
fi

# Create Terraform variables file
if [ ! -f terraform/terraform.tfvars ]; then
    echo "📝 Creating Terraform variables file..."
    cp terraform/terraform.tfvars.example terraform/terraform.tfvars
    echo "✏️  Please edit terraform/terraform.tfvars with your values"
fi

# Make scripts executable
chmod +x deploy.sh
chmod +x setup-tasktidy.sh

echo "✅ TaskTidy project setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your MongoDB and API configuration"
echo "2. Edit frontend/.env with your API endpoint"
echo "3. Edit terraform/terraform.tfvars with your AWS configuration"
echo "4. Test locally with: docker-compose up --build"
echo "5. Deploy infrastructure with: cd terraform && terraform apply"
echo "6. Deploy application with: ./deploy.sh"
echo ""
echo "📋 MongoDB Notes:"
echo "- Local development uses MongoDB container"
echo "- Production uses AWS DocumentDB (MongoDB-compatible)"
echo "- Mongo Express available at http://localhost:8081 in dev mode"