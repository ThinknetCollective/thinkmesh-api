# 🚀 Contributor Quick Start Checklist

## Prerequisites ✅
- [ ] Node.js v18+ installed
- [ ] Docker installed and running
- [ ] Git configured

## Setup Steps ⚙️
- [ ] Clone repository: `git clone https://github.com/ThinknetCollective/thinkmesh-api.git`
- [ ] Navigate to project: `cd thinkmesh-api`
- [ ] Run setup script: `npm run setup` (or follow manual steps below)

## Manual Setup (Alternative) 🛠
- [ ] Install dependencies: `npm install`
- [ ] Copy environment: `cp .env.example .env.development`
- [ ] Start database: `docker-compose up -d`
- [ ] Start app: `npm run start:dev`

## Verification ✅
- [ ] API responds at: http://localhost:3000
- [ ] Swagger docs at: http://localhost:3000/api
- [ ] Database container running: `docker ps`
- [ ] No error messages in terminal

## Development Workflow 🔄
- [ ] Create feature branch: `git checkout -b feature/your-feature`
- [ ] Make changes and add tests
- [ ] Run tests: `npm run test`
- [ ] Check linting: `npm run lint`
- [ ] Commit with conventional format: `feat: description`
- [ ] Push and create PR

## Need Help? 🆘
- Check CONTRIBUTING.md for detailed guide
- Review README.md for project overview
- Open GitHub issue for bugs/questions
- Join community Discord for real-time help

## Useful Commands 📋
```bash
npm run start:dev     # Development server
npm run test         # Run all tests
npm run lint         # Check code style
npm run db:up        # Start database
npm run db:down      # Stop database
```
