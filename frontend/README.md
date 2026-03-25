<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
  <polyline points="14 2 14 8 20 8"/>
  <line x1="16" y1="13" x2="8" y2="13"/>
  <line x1="16" y1="17" x2="8" y2="17"/>
  <polyline points="10 9 9 9 8 9"/>
</svg>

# SummarAI

**AI-powered document summarization. Upload a file. Get the point.**

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](LICENSE)

</div>

---

## Overview

SummarAI is a full-stack web application that extracts text from uploaded PDF or DOCX documents and generates concise, bullet-point summaries using Google Gemini AI. It features a glassmorphism-styled React frontend with drag-and-drop support, animated backgrounds, and real-time status feedback, backed by a lightweight Express.js API that handles file parsing and AI integration.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Reference](#api-reference)
- [Supported File Types](#supported-file-types)
- [Environment Variables](#environment-variables)
- [Known Limitations](#known-limitations)
- [License](#license)

---

## Features

- **Drag-and-Drop Upload** — Select files by dragging them onto the upload zone or clicking to browse.
- **PDF Parsing** — Extracts raw text from PDF documents using `pdf-parse`.
- **DOCX Parsing** — Extracts text from Word documents using `mammoth`.
- **Gemini AI Summarization** — Sends extracted text to `gemini-3-flash-preview` with a structured bullet-point prompt.
- **Typing Animation** — Summary results are rendered with an animated character-reveal effect.
- **Toast Notifications** — Real-time success and error feedback displayed as status messages.
- **Dark and Light Mode** — Theme support via CSS custom properties.
- **Animated Background Orbs** — Decorative layered orb elements for visual depth.
- **Graceful Error Handling** — Rate limits, unsupported formats, and parsing failures are caught and surfaced clearly in the UI.

---

## Architecture

```
Client (React + Vite)
        |
        |  POST /api/summarize  (multipart/form-data)
        v
Server (Express.js)
        |
        |-- multer         -->  Save file to /uploads/
        |-- pdf-parse      -->  Extract text from .pdf
        |-- mammoth        -->  Extract text from .docx
        |
        |  Extracted text
        v
Google Gemini API (gemini-3-flash-preview)
        |
        |  Bullet-point summary
        v
Server  -->  JSON response  -->  Client renders summary
```

The backend acts as a proxy between the client and the Gemini API. Files are temporarily written to disk by `multer`, parsed into plain text, forwarded to Gemini, and the result is returned to the frontend as JSON. Uploaded files are not persisted beyond the duration of the request.

---

## Project Structure

```
summar-ai/
├── backend/
│   ├── server.js           # Express app, routes, Multer config, Gemini integration
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables (not committed)
│   └── uploads/            # Temporary file storage (auto-created)
│
└── frontend/
    ├── src/
    │   ├── App.jsx                     # Root component, state management
    │   ├── api/
    │   │   └── summarize.js            # Fetch helper for /api/summarize
    │   ├── components/
    │   │   ├── Header.jsx              # App title and branding
    │   │   ├── UploadZone.jsx          # Drag-and-drop file input
    │   │   ├── FilePreviewBadge.jsx    # Pill badge for selected file name
    │   │   ├── SummaryResult.jsx       # Summary display with typing effect
    │   │   ├── StatusMessage.jsx       # Toast-style success/error messages
    │   │   └── BackgroundOrbs.jsx      # Animated decorative background
    │   └── index.css                   # Global styles, CSS variables, glassmorphism
    ├── index.html
    ├── vite.config.js
    └── package.json                    # Frontend dependencies
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI framework |
| Vite | Build tool and dev server |
| Lucide React | Icon library |
| Vanilla CSS | Styling with glassmorphism and CSS variables |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | HTTP server and routing |
| Multer | Multipart file upload handling |
| pdf-parse | PDF text extraction |
| mammoth | DOCX text extraction |
| @google/genai | Google Gemini AI SDK |
| dotenv | Environment variable management |

---

## Prerequisites

Before setting up SummarAI, ensure you have the following installed:

- **Node.js** v18 or higher
- **npm** v9 or higher
- A valid **Google Gemini API key** (obtainable from [Google AI Studio](https://aistudio.google.com))

---

## Installation

Clone the repository and install dependencies for both workspaces.

```bash
git clone https://github.com/your-username/summar-ai.git
cd summar-ai
```

**Install backend dependencies:**

```bash
cd backend
npm install
```

**Install frontend dependencies:**

```bash
cd ../frontend
npm install
```

---

## Configuration

### Backend Environment Variables

Inside the `backend/` directory, create a `.env` file:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace `your_gemini_api_key_here` with your actual Gemini API key. This file is excluded from version control via `.gitignore` and must never be committed.

### Frontend API Base URL

The frontend uses a helper in `src/api/summarize.js` to communicate with the backend. Ensure the base URL matches your running backend instance:

```js
// src/api/summarize.js
const BASE_URL = "http://localhost:5000";
```

If you deploy the backend to a remote server, update this value accordingly or configure it via a Vite environment variable (`import.meta.env.VITE_API_URL`).

---

## Running the Application

Both the backend and frontend must be running simultaneously in separate terminal sessions.

### Start the Backend

```bash
cd backend
node server.js
```

The server will start on `http://localhost:5000` by default (or whichever port is set in `.env`).

### Start the Frontend

```bash
cd frontend
npm run dev
```

Vite will serve the frontend at `http://localhost:5173` by default. Open this URL in your browser to use the application.

---

## API Reference

### `POST /api/summarize`

Accepts a multipart form upload, extracts text from the document, and returns an AI-generated summary.

**Request**

| Field | Type | Description |
|---|---|---|
| `file` | `File` (form-data) | A `.pdf` or `.docx` file |

**Content-Type:** `multipart/form-data`

**Success Response**

```json
{
  "summary": "- Point one extracted from the document\n- Point two...\n- Point three..."
}
```

**Error Response**

```json
{
  "error": "Unsupported file type. Please upload a PDF or DOCX."
}
```

| Status Code | Meaning |
|---|---|
| `200` | Summary generated successfully |
| `400` | No file provided or unsupported file type |
| `429` | Gemini API rate limit exceeded |
| `500` | Internal server error during parsing or AI call |

---

## Supported File Types

| Format | Extension | Parser |
|---|---|---|
| Portable Document Format | `.pdf` | `pdf-parse` |
| Word Open XML Document | `.docx` | `mammoth` |

Files with other extensions (`.doc`, `.txt`, `.pptx`, etc.) are explicitly rejected with a `400` error and a user-facing message.

---

## Environment Variables

| Variable | Location | Required | Description |
|---|---|---|---|
| `GEMINI_API_KEY` | `backend/.env` | Yes | API key for Google Gemini |
| `PORT` | `backend/.env` | No | Port for the Express server (default: `5000`) |

---

## Known Limitations

- **Scanned PDFs** — `pdf-parse` cannot extract text from image-based or scanned PDFs that lack an embedded text layer. OCR is not supported.
- **File Size** — There is no explicit file size cap configured in Multer by default. Very large documents may result in slow Gemini API responses or token limit errors.
- **Temporary Storage** — Uploaded files are stored in `backend/uploads/` during processing. Cleanup of this directory is not automated; consider adding a cleanup routine for production deployments.
- **Rate Limiting** — Free-tier Gemini API keys are subject to request rate limits. The application surfaces these errors to the user but does not implement retry logic.
- **Single File per Request** — Only one document can be summarized per upload. Batch processing is not supported.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built with React, Express, and Google Gemini AI.

</div>