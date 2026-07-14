# ContextFlow - AI Conversation Platform

<div align="center">

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-LLaMA_3.1-6E56CF?style=flat-square)](https://openrouter.ai/)

**A structured, user-friendly chatbot interface for interacting with large language models.**

Markdown-rendered responses · Code syntax highlighting · JWT authentication · Persistent chat history

**🔗 Live Demo:** [ContextFlow-frontend.onrender.com/#/chat](https://promptgpt-frontend.onrender.com/#/chat)

</div>

---

ContextFlow is a full-stack AI conversation platform that enables users to interact with large language models through secure authentication, persistent conversation history and a rich Markdown based interface. Supports OpenRouter compatible LLMs (currently configured with Meta LLaMA 3.1 8B Instruct).

This project was built to demonstrate industry standard engineering practices including JWT-based stateless authentication, secure password hashing, LLM API integration via OpenRouter and clean rendering of AI-generated Markdown and code responses on the frontend.

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

## Architecture

```text
                        +---------------------------+
                        |        React UI           |
                        |---------------------------|
                        | • Authentication          |
                        | • Chat Interface          |
                        | • Markdown Rendering      |
                        | • Syntax Highlighting     |
                        +------------+--------------+
                                     |
                                     | HTTPS / REST API
                                     |
                                     ▼
                    +--------------------------------------+
                    |        Express.js Backend            |
                    |--------------------------------------|
                    | • JWT Authentication                 |
                    | • Route Protection                   |
                    | • Request Validation                 |
                    | • Conversation Management            |
                    | • OpenRouter Integration             |
                    +-----------+--------------+-----------+
                                |              |
                                |              |
                 Stores Users & Chats      Generates AI Responses
                                |              |
                                ▼              ▼
                  +------------------+   +----------------------+
                  |     MongoDB      |   |     OpenRouter API   |
                  |------------------|   |----------------------|
                  | • Users          |   | • LLaMA 3.1 8B       |
                  | • Conversations  |   | • Chat Completion    |
                  +------------------+   +----------+-----------+
                                                    |
                                                    ▼
                                         Meta LLaMA 3.1 8B Instruct
```

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
git clone https://github.com/Yashrane25/ContextFlow.git
cd ContextFlow
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

## Contact

**Yash Rane**
- GitHub: [yashrane25](https://github.com/Yashrane25)
- LinkedIn: [yashrane25](https://www.linkedin.com/in/yashrane25/)

---

<div align="center">

⭐ Star this repository if you found it helpful

</div>
