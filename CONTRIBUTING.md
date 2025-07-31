# Contributing to ThinkMesh API

Thank you for your interest in contributing to ThinkMesh! This guide will help you get started.

## 🚀 Quick Start

### 1. Fork and Clone
```bash
git clone https://github.com/YOUR_USERNAME/thinkmesh-api.git
cd thinkmesh-api
```

### 2. Environment Setup

**Option A: Automated Setup (Recommended)**
```bash
npm run setup
```

**Option B: Manual Setup**
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.development

# Start PostgreSQL database
docker-compose up -d

# Start development server
npm run start:dev
```

### 3. Verify Setup
- API: http://localhost:3000
- Database: PostgreSQL running on localhost:5432

## 🛠 Development Workflow

### Project Structure
```
src/
├── auth/           # Authentication (JWT, guards)
├── mesh-nodes/     # Core problem/solution entities
├── users/          # User management
├── main.ts         # Application entry point
└── app.module.ts   # Main app configuration
```

### Key Commands
```bash
# Setup
npm run setup          # Automated first-time setup
npm run db:up          # Start PostgreSQL database
npm run db:down        # Stop database

# Development
npm run start:dev       # Start with hot reload
npm run start:debug     # Start with debug mode

# Testing
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Coverage report

# Code Quality
npm run lint           # ESLint
npm run format         # Prettier formatting

# Database
docker-compose up -d   # Start PostgreSQL
docker-compose down    # Stop database
```

### Environment Variables
The application uses these key environment variables:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=thinkmesh_dev

# JWT Authentication
JWT_SECRET=your-secure-secret
JWT_EXPIRES_IN=24h

# Application
NODE_ENV=development
PORT=3000
```

## 📝 Making Changes

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Follow Code Standards
- Use TypeScript strict mode
- Follow existing code formatting (Prettier)
- Add proper type definitions
- Include unit tests for new features

### 3. Database Changes
- Entities are auto-synchronized in development
- For production, consider using migrations
- Test database changes thoroughly

### 4. Commit Guidelines
Use conventional commits:
```bash
feat: add mesh node search functionality
fix: resolve JWT token expiration issue
docs: update API documentation
test: add unit tests for auth service
```

## 🧪 Testing

### Running Tests
```bash
# All tests
npm run test

# Specific test file
npm run test auth.service.spec.ts

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e
```

### Writing Tests
- Place unit tests next to source files (`.spec.ts`)
- Use Jest testing framework
- Mock external dependencies
- Test both success and error cases

## 🔍 API Documentation

The API uses Swagger for documentation. After starting the server:
- Visit: http://localhost:3000/api
- Interactive API docs with request/response examples

## 📋 Pull Request Process

1. **Ensure tests pass**: `npm run test`
2. **Check linting**: `npm run lint`
3. **Update documentation** if needed
4. **Create descriptive PR title and description**
5. **Reference related issues**

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## 🐛 Reporting Issues

### Bug Reports
Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Error logs if applicable

### Feature Requests
Include:
- Problem statement
- Proposed solution
- Alternative solutions considered
- Implementation suggestions

## 🤝 Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers get started
- Focus on the best solution for the project
- Ask questions when unclear

## 📞 Getting Help

- **GitHub Issues**: Technical questions and bug reports
- **GitHub Discussions**: General questions and ideas
- **Discord**: Real-time chat and community support

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes for significant contributions
- Given credit in documentation they help improve

Thank you for contributing to ThinkMesh! 🧠✨
