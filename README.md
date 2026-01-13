# PromptGPT 🤖

PromptGPT is an AI powered chatbot web application built to help users interact with large language models (LLMs) like **LLaMA 3.1 8B Instruct** in a structured and user friendly way. The platform allows users to chat, view model responses in an organized format and manage their conversation history seamlessly.  

PromptGPT is built as a full stack web application using React.js, Node.js, Express and JWT based authentication, following industry level practices for security, state management and API integration.

**Live Demo:** [Click here to view PromptGPT](https://promptgpt-frontend.onrender.com/#/chat)  

## 🚀 Features

### 🔐 Authentication and Authorization
    - User Sign Up and Login using secure authentication
    - JWT based token authentication

### 💬 Chat Interface
    - Structured display of AI generated responses.
    - Uses ReactMarkdown with remarkGfm and rehypeHighlight to render responses with Markdown formatting and code highlighting.
    - Supports multiple prompts and conversation history.
    - Clear differentiation between user input and AI output.

### 🛠️ Tech Stack

#### Frontend
    - React.js
    - CSS3
#### Backend
    - Node.js
    - Express.js
    - REST APIs
#### Authentication and Security
    - JWT tokens
    - Password hashing

### ⚙️ Installation and Setup
    - Prerequisites
       - Node.js (v16+ recommended)
       - Git
       - API key for OpenRouter to access **LLaMA 3.1 8B Instruct**

### Steps to Run Locally
    1. Clone the repository
    git clone https://github.com/Yashrane25/PromptGPT.git
    cd PromptGPT

    2. Install dependencies
    npm install

    3. Run the application
    node server.js

    4. Open in browser
    http://localhost:8080

### 🔒 Security Practices
    - Passwords stored using hashing
    - JWT authentication for secure API access
    - Users can only access their own chat history
    - Protected routes to prevent unauthorized access

### 👨‍💻 Author
Yash Rane<br>
Computer Science and Engineering Student<br>
Aspiring Software Developer

<br>
<br>
<br>
This project is for educational and learning purposes.
