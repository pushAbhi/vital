# Vital - AI powered Healthcare Coach Platform + Dashboard
Real-time conversation analysis, intelligent client insights, and professional dashboards for coaches.

**MVP Live:** [Live](https://vital-two-amber.vercel.app/)

## What is Vital?

Vital is a **scalable AI Dashboard** that turns raw client-coach conversations into structured, actionable intelligence. minimal hallucination from the AI. Coaches get clean, evidence-backed insights. Clients self-update their activity data.

Built for real healthcare professionals.

## Core Features

- **Conversation to AI powered Dashboard**: Paste client-coach dialogue → get structured JSON output with custom schema + strict instructions.
- **Hallucination Control**: Lowered temperature + optional fields + proper JSON schema enforcement. Arithmetic (steps, sleep, water intake) will be moved to deterministic functions soon.
- **Dual Dashboard**:
  - **Client View**: Simple table to log daily activity.
  - **Coach View**: Clean, trackable overview with attached evidence blocks. No more chasing clients.
- **Security Layer**: Explicit isolation between backend and frontend to prevent direct backend exposure/interception.
- **Multi-AI Fallback**: Horizontal scaling via multiple free AI providers. One dies or runs out of tokens? Auto-switch. Also lets us route to the best model for medical-grade accuracy.

## Tech Stack

- **Frontend**: Next.js (TypeScript)
- **Backend**: FastAPI (Python)
- **AI Layer**: Structured output with strict JSON schemas + system prompts
- **Architecture**: Decoupled frontend + backend with dedicated security boundary

## Project Structure

```
vital/
├── backend/          # FastAPI service
├── frontend/         # Next.js application
└── README.md
```

## Current Status

**Test phase ready.**  
MVP is fully functional and ready for real healthcare professionals to hammer on it. Several fields still need refinement - we're not pretending it's perfect.

**Next Moves (no fluff):**
- Move all arithmetic calculations out of AI into pure functions (saves tokens + kills hallucinations)
- Polish remaining dashboard fields
- Production hardening
- Expand multi-AI routing intelligence

## Why This Matters

Most AI health tools are fancy wrappers that hallucinate and waste everyone's time. 
Vital is engineered to be different: strict schemas, evidence attachment to allow coaches easily verify AI data, client self-reporting, and coach efficiency first.

## Setup & Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Contributing

This is early but serious. If you're a dev who can ship clean code, open a PR.
