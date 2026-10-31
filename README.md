# NOVA 2.0 — AI Revolution Studio

An upgraded full-stack web project built from the existing NOVA 2.0 starter. It keeps the original learning, creativity, planning and notes tools, and adds AI Revolution modules for robotics, industry applications, automation and responsible AI.

## Included modules

### Existing NOVA 2.0 tools preserved
- AI App Designer
- Image Prompt Studio (prompt writing only; does not render image files)
- Poster Maker
- AI Study Assistant
- Quiz Center
- Knowledge Booster
- Innovation Lab
- Code Generator
- Study Planner (browser-local tasks)
- AI Flashcards
- Project Pitch Builder
- IoT & Circuit Lab
- UI Wireframe Planner
- Notes Vault (browser-local notes with JSON export)
- Focus Timer

### New AI Revolution modules
- AI Robotics Lab (planning and educational simulation guidance; not direct robot control)
- AI Revolution Explorer
- AI in Healthcare (educational information only, not diagnosis)
- AI in Agriculture
- Smart City Lab
- Automation Studio
- Responsible AI (privacy, fairness, safety and misinformation)
- Voice Assistant Planner
- AI Research Brief

## Requirements
- Node.js 18 or later
- OpenAI API key with access to the configured model
- Internet connection for live AI generation

## Run locally (Windows)
1. Extract this ZIP.
2. Open the extracted `NOVA_AI_Revolution` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run `npm install`.
5. Copy `.env.example` to a file named `.env`.
6. Put your API key in `.env` as `OPENAI_API_KEY=your_key_here`.
7. Run `npm start`.
8. Open `http://localhost:3000` in your browser.

Never share your API key, commit `.env` to GitHub, or place the key in browser JavaScript. `.env` is ignored by Git.

## Environment configuration
- `OPENAI_API_KEY` — required for live AI
- `OPENAI_MODEL` — optional; defaults to `gpt-4.1-mini`
- `PORT` — optional; defaults to `3000`

## Deployment notes
GitHub Pages alone cannot run this Express backend and must not be used to host the API key. Deploy the Node server to a Node-compatible hosting provider, set the environment variables in that provider's secret settings, and use HTTPS. For a public demo, add authentication, rate limiting, quotas/cost controls, abuse monitoring, and a privacy notice before sharing it widely.

## Limitations and safety
- AI modules generate text plans, code and educational content; verify important output.
- The robotics/circuit modules do not directly control physical hardware. Connect hardware only through a separately designed, secured controller and test safely with adult supervision.
- Image Prompt Studio creates prompts, not image files. Image rendering needs a separate image-generation integration.
- Notes and study tasks are stored in the current browser's local storage; they are not synced to an account or server.
- No user authentication or database is included in this educational starter.

## Project structure
```
NOVA_AI_Revolution/
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── public/
    ├── index.html
    ├── styles.css
    └── app.js
```
