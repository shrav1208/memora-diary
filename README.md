# Memora Diary

## Project Overview
Memora Diary is an AI-driven, full-stack web application architected to provide a highly secure and intelligent digital journaling experience. The platform facilitates the creation, immutable storage, and programmatic analysis of user entries. By leveraging advanced artificial intelligence models and natural language processing techniques, the application performs automated sentiment analysis, generates contextual insights, and produces comprehensive data visualizations mapping longitudinal emotional trends.

## System Architecture
The application employs a decoupled, service-oriented architecture divided into two primary subsystems:
- **Client Application (`memora-frontend`)**: A high-performance, React-based single-page application (SPA) responsible for state management, client-side routing, rich text processing, and data presentation.
- **API Gateway & Core Services (`memora-backend`)**: A highly concurrent Node.js/Express server that exposes RESTful API endpoints. It manages persistent data storage, enforces business logic, and orchestrates communication with external machine learning models and media processing services.

## Core Capabilities
- **Rich Text Processing**: Seamless integration of TinyMCE to support complex, formatted text input alongside strict sanitization protocols.
- **Data Visualization & Analytics**: Programmatic rendering of statistical data, offering granular insights into user journaling habits and temporal sentiment shifts.
- **Algorithmic Sentiment Analysis**: Automated parsing of unstructured text to derive and quantify the underlying psychological sentiment of individual entries.
- **AI-Powered Insights**: Integration with Google Generative AI and OpenAI to synthesize vast amounts of text into actionable summaries and reflective insights.
- **Media Lifecycle Management**: Robust handling of media uploads, transformations, and secure delivery via Cloudinary pipelines.
- **Identity & Access Management**: Secure, session-based authentication leveraging MongoDB stores and cryptographic hashing via `bcrypt`.
- **Security Posture**: Enforcement of stringent security policies, including strict CORS configurations, HTTP header hardening via Helmet, and aggressive rate-limiting protocols.

## Technology Stack

### Client Environment
- **Core Framework**: React 19 / Vite
- **Text Processing**: TinyMCE / DOMPurify
- **Animation Engine**: Framer Motion
- **Routing**: React Router

### Server Environment
- **Runtime & Framework**: Node.js / Express 5
- **Data Persistence**: MongoDB / Mongoose
- **AI & Machine Learning**: Google Generative AI / Sentiment Engine
- **Media Processing**: Cloudinary / Multer
- **Security & Authentication**: Bcrypt / Helmet / Express Rate Limit / Express Session

## Environment Provisioning & Setup

### Prerequisites
- Node.js (v18.x or subsequent releases)
- MongoDB Database (Local instance or DBaaS provider such as MongoDB Atlas)
- Provisioned API Keys: Google Generative AI, Cloudinary

### Backend Initialization

1. Navigate to the core services directory and resolve dependencies:
   ```bash
   cd memora-backend
   npm install
   ```
2. Provision the environment configuration file (`.env`) in the root of the backend directory with the appropriate credentials:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   SESSION_SECRET=<your_cryptographic_session_secret>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   GEMINI_API_KEY=<your_google_genai_key>
   ```
3. Initialize the backend development server:
   ```bash
   node Server.js
   ```

### Frontend Initialization

1. Navigate to the client directory and resolve dependencies:
   ```bash
   cd memora-frontend
   npm install
   ```
2. Initialize the Vite development build:
   ```bash
   npm run dev
   ```

## Repository Structure

```text
memora-diary/
├── memora-backend/
│   ├── src/
│   │   ├── Config/        # Infrastructure and 3rd-party service configurations
│   │   ├── Controllers/   # Route handlers and core business logic
│   │   ├── Middleware/    # Interceptors for authentication and security validation
│   │   ├── Models/        # Mongoose Object Data Modeling (ODM) schemas
│   │   ├── Routes/        # RESTful API endpoint definitions
│   │   └── Server.js      # Application bootstrapping and server instantiation
│   └── package.json
└── memora-frontend/
    ├── src/
    │   ├── assets/        # Static assets and design resources
    │   ├── components/    # Reusable, atomic React UI components
    │   ├── context/       # Global state management context providers
    │   ├── pages/         # High-level application views
    │   ├── routes/        # Client-side router configuration
    │   └── utils/         # Helper modules and API transport clients
    └── package.json
```

## License
Distributed under the ISC License.
