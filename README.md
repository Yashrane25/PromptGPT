# PromptGPT - AI-Powered Chatbot Web Application

<div align="center">

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-LLaMA_3.1-6E56CF?style=flat-square)](https://openrouter.ai/)

**A structured, user-friendly chatbot interface for interacting with large language models.**

Markdown-rendered responses · Code syntax highlighting · JWT authentication · Persistent chat history

**🔗 Live Demo:** [promptgpt-frontend.onrender.com/#/chat](https://promptgpt-frontend.onrender.com/#/chat)

</div>

---

PromptGPT is an AI-powered chatbot application built to help users interact with large language models (LLMs) like **LLaMA 3.1 8B Instruct** in a structured and user-friendly way. The platform allows users to chat, view model responses in an organized format and manage their conversation history seamlessly.

This project was built to demonstrate production-relevant engineering practices including JWT-based stateless authentication, secure password hashing, LLM API integration via OpenRouter and clean rendering of AI-generated Markdown and code responses on the frontend.

---

## Features

### Authentication and Authorization

- User sign up and login using secure authentication
- JWT-based token authentication for stateless sessions
- Protected routes to prevent unauthorized API access

### Chat Interface

- Structured display of AI-generated responses
- Markdown rendering via `react-markdown` with `remark-gfm`
- Syntax-highlighted code blocks via `rehype-highlight`
- Support for multiple prompts and full conversation history
- Clear visual differentiation between user input and AI output

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| React Router | Client-side routing |
| react-markdown | Rendering AI responses as Markdown |
| remark-gfm | GitHub-flavored Markdown support (tables, task lists, etc.) |
| rehype-highlight | Syntax highlighting for code blocks |
| CSS3 | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| JSON Web Token (JWT) | Stateless authentication |
| bcrypt | Password hashing |
| REST APIs | Client-server communication |

### AI / LLM Integration
| Service | Purpose |
|---|---|
| OpenRouter API | Access to LLaMA 3.1 8B Instruct model |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v16 or higher - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

You will also need:
- An [OpenRouter](https://openrouter.ai/) API key to access **LLaMA 3.1 8B Instruct**

---

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
# Server
PORT=8080
NODE_ENV=development

# JWT
JWT_SECRET=your_long_random_jwt_secret_here
JWT_EXPIRE=7d

# OpenRouter — get from openrouter.ai → Keys
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct

# Database (if applicable)
MONGO_URI=your_database_connection_string_here
```

---

## Running Locally

### Step 1 - Clone the repository

```bash
git clone https://github.com/Yashrane25/PromptGPT.git
cd PromptGPT
```

### Step 2 - Install dependencies

```bash
npm install
```

### Step 3 - Set up your OpenRouter API key

Create an account at [openrouter.ai](https://openrouter.ai/), generate an API key, and add it to your `.env` file as `OPENROUTER_API_KEY`.

### Step 4 - Start the server

```bash
node server.js
```

### Step 5 - Open in browser

```
http://localhost:8080
```

---

## Security Practices

- Passwords stored using bcrypt hashing (never in plain text)
- JWT-based authentication for secure API access
- Users can only access their own chat history
- Protected routes to prevent unauthorized access to chat/auth endpoints

---

## Project Structure

```
PromptGPT/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Chat UI, message bubbles, etc.
│   │   ├── pages/        # Chat, login, signup pages
│   │   └── App.jsx
├── controllers/          # Route logic (auth, chat)
├── models/               # Mongoose/DB schemas (User, Chat)
├── routes/               # Express route definitions
├── middleware/           # JWT auth middleware
├── server.js             # Application entry point
└── .env                  # Environment variables (not committed)
```

---

## Contact

**Yash Rane**
- GitHub: [yashrane25](https://github.com/Yashrane25)
- LinkedIn: [yashrane25](https://www.linkedin.com/in/yashrane25/)

---

<div align="center">

⭐ Star this repository if you found it helpful

</div>
