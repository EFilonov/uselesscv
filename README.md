# Useless CV - Professional Portfolio Builder

A modern, full-stack web application built with Next.js for creating and managing professional CVs and portfolios. Features user authentication, content management with Contentful CMS, and automated email functionality.

## 🚀 Features

- **User Authentication**: Secure login/register with NextAuth.js
- **Content Management**: Dynamic content powered by Contentful CMS
- **Email Services**: Automated password reset and notifications via Gmail API
- **Responsive Design**: Mobile-first design with Material-UI components
- **Database Integration**: MongoDB for user data management
- **Security**: reCAPTCHA integration and secure token handling

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Material-UI** - Component library and styling
- **CSS Modules** - Scoped styling

### Backend
- **Next.js API Routes** - Serverless backend functions
- **MongoDB** - Database for user management
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **NextAuth.js** - Authentication framework
- **bcryptjs** - Password hashing
- **Google reCAPTCHA** - Bot protection

### Content Management
- **Contentful** - Headless CMS for dynamic content
- **Contentful Management API** - Content operations

### Email Services
- **Gmail API** - Email sending via OAuth2
- **Nodemailer** - Email transport layer

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Google Cloud Platform account
- Contentful account
- Domain or localhost for development

## ⚙️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/useless-cv.git
cd useless-cv
npm install

2. Environment Setup:
Create .env.local file in root directory:

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# Google OAuth (for authentication)
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Email Service
EMAIL_FROM=your-email@gmail.com
MAIL_REFRESH_TOKEN=your-gmail-refresh-token

# Contentful CMS
CONTENTFUL_SPACE_ID=your-contentful-space-id
CONTENTFUL_ACCESS_TOKEN=your-contentful-access-token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your-contentful-preview-token
CONTENTFUL_MANAGEMENT_TOKEN=your-contentful-management-token

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# Application
NEXT_PUBLIC_URL=http://localhost:3000

    3. Google Cloud Setup

- OAuth2 Configuration
- Go to Google Cloud Console
- Create new project or select existing
- Enable Gmail API and Google+ API
- Create OAuth 2.0 Client ID credentials
- Add authorized redirect URIs:

http://localhost:3000/api/auth/callback/google
http://localhost:3000
https://your-domain.com/api/auth/callback/google

    Gmail API Setup

- Configure OAuth consent screen
- Add scopes: https://mail.google.com/
- Generate refresh token using provided script

    4. Generate Gmail Refresh Token

# Run the refresh token generator
npx tsx src/app/lib/getRefreshToken.ts

# Follow the prompts to authorize and get your refresh token
# Add the token to your .env.local file 

    5. Contentful Setup

- Create account at Contentful
- Create new space
- Set up content models for your CV data
- Generate API keys in Settings > API keys
- Add keys to environment variables

    6. MongoDB Setup

- Create account at MongoDB Atlas
- Create new cluster
- Configure network access and database user
- Get connection string and add to environment variables

🚀 Development

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check

# Run linting
npm run lint

📁 Project Structure

src/
├── app/
│   ├── (pages)/           # Route groups
│   │   ├── auth/          # Authentication pages
│   │   ├── profile/       # User profile pages
│   │   └── ...
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── contentful/    # CMS endpoints
│   │   └── ...
│   ├── components/        # Reusable components
│   │   ├── Profile/       # Profile components
│   │   ├── BackButton/    # Navigation components
│   │   └── ...
│   ├── lib/               # Utility functions
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── mail.ts        # Email services
│   │   ├── contentful.ts  # CMS integration
│   │   └── ...
│   ├── dbSchemas/         # Database schemas
│   ├── services/          # External service integrations
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets
└── types/                 # TypeScript type definitions

🔧 Configuration Files

    next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.ctfassets.net', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig

    tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

🧪 Testing

Test Email Service

# Test Gmail API configuration
npx tsx src/app/lib/testRefreshToken.ts

# Test email sending functionality
curl -X POST http://localhost:3000/api/test-email

Test Authentication

- Start development server
- Navigate to /auth/signin
- Test Google OAuth flow
- Verify user creation in MongoDB

    🔒 Security Considerations

- Environment Variables: Never commit .env.local to version control
- API Keys: Rotate tokens regularly
- CORS: Configure proper origins for production
- Rate Limiting: Implement for API endpoints in production
- Input Validation: Validate all user inputs
- SQL Injection: Use parameterized queries with Mongoose

    📦 Deployment

Vercel (Recommended)

- Connect GitHub repository to Vercel
- Add environment variables in Vercel dashboard
- Configure custom domain if needed
- Deploy automatically on push to main branch

Environment Variables for Production

 # Update these for production
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_URL=https://your-domain.com

# Add production database URI
MONGODB_URI=mongodb+srv://production-credentials

# Update OAuth redirect URIs in Google Cloud Console

    🐛 Troubleshooting

Common Issues:

Gmail API "invalid_grant" Error
# Regenerate refresh token
npx tsx src/app/lib/getRefreshToken.ts

Contentful Connection Issues:

Verify space ID and API tokens
Check network access and API rate limits

MongoDB Connection Failed:

Verify connection string format
Check network access settings in MongoDB Atlas

NextAuth Configuration Issues:

Ensure NEXTAUTH_SECRET is set
Verify OAuth callback URLs

Debug Mode:

# Enable debug logging
DEBUG=* npm run dev

# NextAuth debug
NEXTAUTH_DEBUG=true npm run dev

    🤝 Contributing

- Fork the repository
- Create feature branch (git checkout -b feature/amazing-feature)
- Commit changes (git commit -m 'Add amazing feature')
- Push to branch (git push origin feature/amazing-feature)
- Open Pull Request

    📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

    🆘 Support

Documentation: Check this README and inline code comments
Issues: Open GitHub issue for bugs or feature requests
Email: Contact support at evgeniyfilonov@gmail.com

    🔄 Changelog

v1.0.0 (2025-08-13)
Initial release
User authentication with NextAuth.js
Gmail API integration for email services
Contentful CMS integration
MongoDB user management
Responsive Material-UI design

________________________________________________________________________________

Built with ❤️ using Next.js and TypeScript