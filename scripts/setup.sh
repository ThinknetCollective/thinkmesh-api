#!/bin/bash

# ThinkMesh API Setup Script
# This script automates the initial setup for contributors

set -e  # Exit on error

echo "🧠 ThinkMesh API - Contributor Setup"
echo "===================================="

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment
echo "⚙️  Setting up environment..."
if [ ! -f .env.development ]; then
    cp .env.example .env.development
    echo "✅ Created .env.development from template"
else
    echo "⚠️  .env.development already exists, skipping"
fi

# Start database
echo "🐘 Starting PostgreSQL database..."
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Check if database is responding
if docker exec thinkmesh-postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ Database is ready"
else
    echo "⚠️  Database might still be starting up. Try running 'npm run start:dev' in a moment."
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Run 'npm run start:dev' to start the development server"
echo "2. Visit http://localhost:3000 to see the API"
echo "3. Visit http://localhost:3000/api for Swagger documentation"
echo ""
echo "🛠  Useful commands:"
echo "- npm run start:dev     # Start development server"
echo "- npm run test          # Run tests"
echo "- npm run lint          # Check code style"
echo "- docker-compose down   # Stop database"
echo ""
echo "📖 For more information, see CONTRIBUTING.md"
echo ""
echo "Happy coding! 🚀"
