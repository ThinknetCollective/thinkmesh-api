# ThinkMesh 🧠

**The collaborative backend engine for collective problem-solving.**  
ThinkMesh lets developers, researchers, and problem-solvers come together to tackle real-world technical and societal issues — one MeshNode at a time.

---

## 🚀 What is ThinkMesh?

ThinkMesh is a backend-powered open-source platform that:
- Ingests and surfaces trending problems (tech, governance, society)
- Lets users pitch and debate solutions
- Uses AI to summarize discussions
- Exposes APIs for frontend, bots, plugins, or integrations

## 🛠 Tech Stack
- **Backend:** NestJS (Modular, Scalable)
- **Data:** PostgreSQL / MongoDB (selectable)
- **ML/NLP:** Transformers, OpenAI API, T5 (optional, pluggable)
- **Queueing:** BullMQ / Redis
- **Dev Tools:** Swagger, ESLint, Prettier, Husky

---

## 🧩 Core Concepts

- **MeshNode:** A problem or issue being discussed
- **SolutionDrafts:** Proposals contributed by users
- **Insight Summaries:** AI or user-curated takeaways
- **Reputation Engine:** Rewards thoughtful contributions

---

## 🧑‍💻 Getting Started for Contributors

### Prerequisites
- **Node.js** (v18 or higher)
- **Docker** (for database)
- **Git**

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ThinknetCollective/thinkmesh-api.git
   cd thinkmesh-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.development
   # Edit .env.development with your preferred settings (optional)
   ```

4. **Start the database**
   ```bash
   docker-compose up -d
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   ```

6. **Verify setup**
   - API should be running at `http://localhost:3000`
   - Database should be accessible at `localhost:5432`

### What Each Step Does

- **Docker Compose**: Starts a PostgreSQL database with pre-configured credentials
- **Environment Files**: Configures database connection, JWT secrets, and app settings
- **Development Server**: Runs with hot-reload and automatic TypeORM synchronization

### Troubleshooting

- **Database connection issues**: Ensure Docker is running and port 5432 is available
- **Port conflicts**: Change `PORT=3000` in `.env.development` if needed
- **TypeORM errors**: Database tables are auto-created via `synchronize: true` in development

### We Welcome Contributors

- 🧱 NestJS developers
- 🤖 ML/NLP engineers  
- ✍️ Prompt writers
- 📥 Scraper/integration builders
- 🧪 Testers and idea contributors

---

## 📄 License
MIT — Open to all, for the good of all.
