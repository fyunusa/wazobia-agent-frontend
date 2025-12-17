# 🇳🇬 Wazobia AI Frontend

Modern React + TypeScript frontend for the Wazobia multilingual AI agent.

## ✨ Features

- **Modern UI**: Clean, professional design with Nigerian-themed colors
- **Responsive**: Works on desktop, tablet, and mobile
- **Real-time Chat**: Seamless conversation with the AI agent
- **Language Detection**: Visual indicators for detected languages
- **TypeScript**: Full type safety for better development experience
- **Tailwind CSS**: Utility-first CSS for rapid UI development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Wazobia API running on `http://localhost:8000`

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Colors

- **Nigeria Green**: `#008751` (primary color)
- **Nigeria Green Dark**: `#006640`
- **Nigeria Green Light**: `#00a862`

### Components

- `Header`: Top navigation with branding
- `Sidebar`: Language info and features
- `ChatInterface`: Main chat area
- `MessageBubble`: Individual message component
- `WelcomeScreen`: Landing screen with examples

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   ├── services/          # API service layer
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
└── vite.config.ts        # Vite config
```

## 🔌 API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000`.

Supported endpoints:
- `POST /chat` - Send chat messages
- `POST /detect-language` - Detect language
- `POST /translate` - Translate text
- `GET /stats` - Get agent statistics
- `GET /health` - Health check

## 🌍 Supported Languages

- 🇳🇬 **Hausa** (ha)
- 🇳🇬 **Yoruba** (yo)
- 🇳🇬 **Nigerian Pidgin** (pcm)
- 🇬🇧 **English** (en)

## 🛠️ Development

```bash
# Run linter
npm run lint

# Format code (if you add prettier)
npm run format
```

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## 🤝 Contributing

1. Make changes in the `frontend/` directory
2. Test locally with `npm run dev`
3. Build for production with `npm run build`
4. Commit your changes

---

Built with ❤️ for Nigeria's multilingual future
