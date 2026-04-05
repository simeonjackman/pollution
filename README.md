# Pollution Monitoring Education App

Interactive Vue application for classroom use around environmental monitoring.
The project combines:

- educational content about measurement concepts (CO2, particulate matter, EMF, noise)
- field data collection and upload to openSenseMap
- time-series data analysis for a project group

## Features

- Intro and measurement theory pages in German
- Measurement chapter selector with one chapter visible at a time
- Data collection form by location and sensor
- Upload flow to openSenseMap through a backend proxy
- Data analysis view with selectable time ranges and chart aggregation
- Export/download support for analyzed datasets

## Tech Stack

- Frontend: Vue 3, Vue Router, Vite, Tailwind CSS v4
- Backend: Node.js, Express, CORS, dotenv
- External APIs: openSenseMap

## Repository Structure

- src: Vue app (views, components, routing, styles)
- public: static files and static-hosting fallback
- backend: Express API proxy for submitting measurements

## Prerequisites

- Node.js 18+ (recommended: current LTS)
- npm

## Local Development

### 1) Install frontend dependencies

Run from project root:

npm install

### 2) Install backend dependencies

Run from backend folder:

cd backend
npm install

### 3) Configure backend environment variables

Create backend/.env with tokens for each senseBox:

WALDTOKEN=your_token_here
STRASSETOKEN=your_token_here
SIEDLUNGTOKEN=your_token_here

Notes:

- Token selection is mapped by senseBox ID in backend/server.js.
- If you add new senseBoxes, extend the SENSEBOX_TOKEN_MAP accordingly.

### 4) Start backend

From backend folder:

npm run dev

Backend runs by default on http://localhost:3001.

### 5) Start frontend

From project root:

npm run dev

Frontend runs on Vite default port and proxies /api to http://localhost:3001.

## Available Scripts

From project root:

- npm run dev: start frontend dev server
- npm run build: create production frontend build
- npm run preview: preview frontend production build

From backend:

- npm start: start backend
- npm run dev: start backend with watch mode

## Routing Overview

- /introduction: project introduction
- /measurement: measurement concepts and limits
- /data-uploader: measurement submission form
- /data-analysis: chart-based analysis view

## Data Upload Flow

1. User selects location (senseBox) and sensor.
2. User enters measurement value.
3. Frontend sends POST request with senseBoxId, sensorId, and value.
4. Backend injects token based on senseBoxId and forwards to openSenseMap.

### Important endpoint note

The current uploader implementation points to a deployed API URL:

https://pollution-sigma.vercel.app/api/measurement

If you want purely local development, switch that request in src/views/DataUploaderView.vue to /api/measurement so Vite proxy is used.

## Deployment Notes

- Frontend can be deployed as static assets (Vite build output).
- Backend can be deployed separately (for example on Vercel or any Node host).
- Ensure backend environment variables are set in deployment.
- Ensure CORS policy allows your frontend origin.

## Educational Scope

The app content focuses on understanding:

- what is measured
- how sensors work
- units and guideline values
- measurement validity and limitations

This is important for interpreting environmental data responsibly in school projects.

## Troubleshooting

- Upload returns 500: check missing token env vars in backend/.env.
- Upload returns 400: check senseBoxId/sensorId/value and token mapping.
- No analysis data: verify openSenseMap group tag and sensor availability.
- UI width shifts on chapter switch: global scrollbar is stabilized in src/style.css.

## License

No license file is currently included in this repository.
