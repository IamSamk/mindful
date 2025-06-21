# Setup Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mindful_db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# API URL
VITE_API_URL="http://localhost:8000"
```

## Database Setup

1. Install PostgreSQL on your system
2. Create a database named `mindful_db`
3. Update the `DATABASE_URL` in your `.env` file with your actual database credentials
4. Run the following commands:

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

## Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`
