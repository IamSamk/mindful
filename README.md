# Mindful McApp - Police Well-being Assistant

A React Native application designed to support Bengaluru police officers' mental and physical well-being through an immersive avatar-based chatbot, emergency support features, and wellness tracking.

## Features

- 🤖 Avatar-based Chatbot with multilingual support (English, Kannada, Hindi)
- 🚨 Emergency support and quick-access contact features
- 📊 Periodic wellness reports and tracking
- 🔒 Privacy-focused design with local LLM integration
- 📱 Mobile-first, responsive interface
- 🌐 Offline-first capabilities

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Local LLM server running (see [LLM Setup](#llm-setup))

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/mindful-mcapp.git
cd mindful-mcapp
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up the database:

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## LLM Setup

The application requires a local LLM server running on port 8000. The server should expose the following endpoints:

- POST `/chat` - For chatbot interactions
- POST `/emergency` - For emergency protocol handling
- GET `/user-report` - For fetching user wellness reports

Refer to the LLM server documentation for setup instructions.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:8000
DATABASE_URL=postgresql://username:password@localhost:5432/mindful_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Project Structure

```
src/
├── components/         # React components
│   ├── ChatBot/       # Chatbot related components
│   ├── Emergency/     # Emergency features
│   └── UserReport/    # Reporting components
├── hooks/             # Custom React hooks
├── services/          # API and external services
├── contexts/          # React contexts
└── pages/            # Application pages
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact the development team or raise an issue in the GitHub repository.
