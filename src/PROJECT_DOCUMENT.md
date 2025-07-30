# ThinkMesh API - Project Overview

## What is ThinkMesh?

ThinkMesh is a collaborative problem-solving platform where users create "discussion nodes" to explore problems and propose solutions. Each mesh node represents a focused discussion space where communities can brainstorm, debate, and develop solutions collectively.

## Core Features

### Discussion Node Management
- Create focused discussion nodes with titles, descriptions, and categories
- Organize discussions with tags for easy discovery
- Track node status (open, in-progress, resolved, archived)
- Structured problem-solving workflow

### User Authentication & Authorization
- Secure user registration and login
- JWT-based authentication for API access
- User ownership and permissions for discussion nodes

### Collaborative Problem-Solving
- Users can create and participate in multiple discussion nodes
- Categorized discussions for better organization
- Tagging system for cross-referencing related topics

## Architecture

The API is built with:
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT tokens
- **Real-time Communication**: WebSockets (planned)

## Use Cases

- **Team Problem-Solving**: Collaborate on technical challenges or business problems
- **Community Support**: Create help nodes where users can get assistance
- **Innovation Hubs**: Brainstorm new ideas and solutions in structured discussions
- **Project Planning**: Break down complex projects into focused discussion nodes
- **Knowledge Sharing**: Document problems and their solutions for future reference

## Project Status

🚧 **In Development** - Core MeshNode entity, DTOs, REST endpoints, and JWT authentication are implemented.

## Getting Started

See the main README.md for installation and setup instructions.