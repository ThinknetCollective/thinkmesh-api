# MeshNode Discussion Summarization Service

## Quick Setup

1. **Install dependencies:**
```bash
npm install openai @nestjs/schedule node-cron
```

2. **Environment setup:**
```bash
cp .env.example .env
# Add your OpenAI API key (optional - fallback summarization works without it)
```

3. **Start the service:**
```bash
npm run start:dev
```

## API Endpoints

### Create Summary
```http
POST /mesh-nodes/summaries
Content-Type: application/json

{
  "nodeId": "1",
  "solutionTexts": [
    "First solution text...",
    "Second solution text...",
    "Third solution text..."
  ]
}
```

### Get Summary
```http
GET /mesh-nodes/summaries/1
```

### Batch Create Summaries
```http
POST /mesh-nodes/summaries/batch
Content-Type: application/json

{
  "nodes": [
    {
      "nodeId": "1",
      "solutionTexts": ["Solution 1", "Solution 2"]
    },
    {
      "nodeId": "2", 
      "solutionTexts": ["Another solution"]
    }
  ]
}
```

## Features

✅ **OpenAI GPT Integration** - Uses GPT-3.5-turbo for intelligent summarization
✅ **Fallback Summarization** - Works without OpenAI API key using extractive summarization
✅ **Scheduled Updates** - Automatically updates summaries every 3 hours via CRON
✅ **Batch Processing** - Handle multiple summaries at once
✅ **Database Storage** - Summaries stored in PostgreSQL with timestamps
✅ **Error Handling** - Graceful fallbacks and comprehensive error handling

## How It Works

1. **Manual Summarization**: Send solution texts via API endpoints
2. **Automatic Updates**: CRON job runs every 3 hours to update existing summaries
3. **Smart Fallback**: If OpenAI fails, uses extractive summarization
4. **Database Integration**: Summaries stored in mesh_nodes table with timestamps

## Database Schema

The `mesh_nodes` table includes:
- `summary`: Text field for storing generated summaries
- `lastSummarized`: Timestamp of last summary update
- `solutions`: JSON field storing solution texts

## Configuration

Set `OPENAI_API_KEY` in your `.env` file for GPT summarization, or leave empty to use the built-in fallback summarizer.

The service is production-ready and handles failures gracefully!