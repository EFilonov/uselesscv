<div align="center">

# 🎯 Useless CV
### Professional Portfolio Builder

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material-UI" />
</p>

<p align="center">
A modern, full-stack web application for creating and managing professional CVs and portfolios with seamless user authentication, dynamic content management, and automated email services.
</p>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/useless-cv)

---

</div>

## ✨ Key Features

<div align="center">

| 🔐 Authentication | 📧 Email Services | 📱 Responsive Design | 📊 Content Management |
|:-----------------:|:----------------:|:---------------------:|:----------------------:|
| NextAuth.js       | Gmail API        | Mobile-First          | Contentful CMS         |
| Google OAuth      | OAuth2 Auth      | Material-UI           | Real-time Updates      |
| bcryptjs Hashing  | Password Reset   |                       | Media Management       |
| JWT Tokens        | Custom Templates | Accessibility         | Preview Mode           |

</div>

---

## 🛠 Technology Stack

<div align="center">

### Frontend Technologies
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=flat-square&logo=material-ui&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)

### Backend & Database
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)

### Cloud Services
![Google Cloud](https://img.shields.io/badge/Google%20Cloud-4285F4?style=flat-square&logo=google-cloud&logoColor=white)
![Contentful](https://img.shields.io/badge/Contentful-2478CC?style=flat-square&logo=contentful&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![reCAPTCHA](https://img.shields.io/badge/reCAPTCHA-4285F4?style=flat-square&logo=google&logoColor=white)

</div>

---

## 🚀 Quick Start Guide

### 🔧 Prerequisites

<div align="center">

| Requirement      | Version | Purpose             |
|:----------------:|:-------:|:-------------------:|
| **Node.js**      | 18+     | Runtime Environment |
| **npm/yarn**     | Latest  | Package Management  |
| **MongoDB**      | 5.0+    | Database            |
| **Google Cloud** | -       | OAuth & Gmail API   |
| **Contentful**   | -       | Content Management  |

</div>

### 📦 Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/useless-cv.git
cd useless-cv

# 2️⃣ Install dependencies
npm install

# 3️⃣ Copy environment template
cp .env.example .env.local
```

### ⚙️ Environment Configuration

Create `.env.local` file with the following variables:

<details>
<summary>🗄️ Database Configuration</summary>

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

</details>

<details>
<summary>🔐 Authentication Setup</summary>

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth Credentials
AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-google-client-secret
```

</details>

<details>
<summary>📧 Email Service Configuration</summary>

```bash
# Gmail API Settings
EMAIL_FROM=your-email@gmail.com
MAIL_REFRESH_TOKEN=your-gmail-refresh-token
```

</details>

<details>
<summary>📄 Content Management System</summary>

```bash
# Contentful CMS
CONTENTFUL_SPACE_ID=your-contentful-space-id
CONTENTFUL_ACCESS_TOKEN=your-contentful-access-token
CONTENTFUL_MANAGEMENT_TOKEN=your-contentful-management-token
```

</details>

<details>
<summary>🛡️ Security & Validation</summary>

```bash
# reCAPTCHA Protection
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# Application URL
NEXT_PUBLIC_URL=http://localhost:3000
```

</details>

### 🔑 Google Cloud Platform Setup

<details>
<summary>1️⃣ OAuth2 Client Configuration</summary>

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing one
3. Enable **Gmail API** and **Google+ API**
4. Create **OAuth 2.0 Client ID** credentials
5. Configure authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   http://localhost:3000
   https://your-domain.com/api/auth/callback/google
   ```

</details>

<details>
<summary>2️⃣ Gmail API Authorization</summary>

1. Configure OAuth consent screen
2. Add required scopes: `https://mail.google.com/`
3. Generate refresh token:
   ```bash
   npx tsx src/app/lib/getRefreshToken.ts
   ```
4. Follow the prompts and add token to `.env.local`

</details>

### 🏃‍♂️ Development Server

```bash
# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

<div align="center">

🎉 **Your application is now running!**

</div>

---

## 📁 Project Architecture

```
📂 src/
├── 🏠 app/
│   ├── 📱 (pages)/              # App Router pages
│   │   ├── 🔐 auth/             # Authentication flows
│   │   │   ├── signin/          # Login page
│   │   │   ├── signup/          # Registration page
│   │   │   ├── forgot-password/ # Password reset
│   │   │   └── reset-password/  # New password form
│   │   ├── 👤 profile/          # User dashboard
│   │   └── 📄 dashboard/        # Admin panel
│   ├── 🔌 api/                  # Backend API routes
│   │   ├── 🔐 auth/             # Authentication endpoints
│   │   ├── 📧 email/            # Email services
│   │   ├── 📄 contentful/       # CMS operations
│   │   └── 👤 users/            # User management
│   ├── 🧩 components/           # Reusable UI components
│   │   ├── 🎨 Layout/           # Page layouts
│   │   ├── 📝 Forms/            # Form components
│   │   ├── 🔘 Buttons/          # Button variants
│   │   └── 🏷️ Cards/            # Card components
│   ├── 🛠️ lib/                  # Utility libraries
│   │   ├── 🔐 auth.ts           # NextAuth config
│   │   ├── 📧 mail.ts           # Email utilities
│   │   ├── 📄 contentful.ts     # CMS client
│   │   └── 🔧 utils.ts          # Helper functions
│   ├── 🗄️ dbSchemas/            # Database models
│   ├── 🔗 services/             # External integrations
│   └── 🎨 styles/               # Global stylesheets
├── 📸 public/                   # Static assets
├── 📋 types/                    # TypeScript definitions
└── 🔧 config/                   # Configuration files
```

---

## 🧪 Testing & Validation

### 📧 Email Service Testing

```bash
# Test Gmail API connection
npx tsx src/app/lib/testRefreshToken.ts

# Test password reset flow
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","token":"recaptcha-token"}'
```

### 🔐 Authentication Testing

```bash
# Test user registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securePassword123"}'

# Test login endpoint
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securePassword123"}'
```

### 📊 Development Scripts

```bash
npm run dev          # 🚀 Start development server
npm run build        # 🏗️ Build production bundle
npm run start        # ▶️ Start production server
npm run lint         # 🔍 Run ESLint checks
npm run type-check   # 📝 TypeScript validation
npm run test         # 🧪 Run test suite
```

---

## 🚀 Production Deployment

### 🌐 Vercel Deployment (Recommended)

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/useless-cv)

</div>

#### Step-by-step deployment:

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Configure automatic deployments

2. **Environment Variables**
   - Add all `.env.local` variables to Vercel dashboard
   - Update URLs for production:
     ```bash
     NEXTAUTH_URL=https://your-domain.com
     NEXT_PUBLIC_URL=https://your-domain.com
     ```

3. **Domain Configuration**
   - Add custom domain (optional)
   - Configure DNS settings

4. **OAuth Redirect URIs**
   - Update Google Cloud Console with production URLs
   - Add production callback URLs

### 🔧 Alternative Deployments

<details>
<summary>🐳 Docker Deployment</summary>

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

</details>

<details>
<summary>☁️ Railway Deployment</summary>

1. Connect GitHub repository to Railway
2. Add environment variables
3. Deploy automatically on push

</details>

---

## 🔒 Security Best Practices

<div align="center">

| Security Layer       | Implementation     | Status |
|:---------------------:|:-----------------:|:------:|
| **Input Validation**  | React Hook Form   | ✅    |
| **Authentication**    | NextAuth.js + JWT | ✅    |
| **Password Security** | bcryptjs + Salt   | ✅    |
| **Bot Protection**    | reCAPTCHA v3      | ✅    |
| **API Security**      | Rate Limiting     | ⚠️    |
| **HTTPS**             | SSL/TLS           | ✅    |

</div>

### 🛡️ Security Checklist

- ✅ Environment variables secured
- ✅ Password hashing with bcryptjs
- ✅ JWT token validation
- ✅ reCAPTCHA bot protection
- ✅ Input sanitization
- ✅ CORS configuration
- ⚠️ Rate limiting (recommended for production)
- ⚠️ Content Security Policy (recommended)

---

## 🐛 Troubleshooting Guide

<details>
<summary>❌ Gmail API "invalid_grant" Error</summary>

**Solution:**
```bash
# Regenerate refresh token
npx tsx src/app/lib/getRefreshToken.ts

# Ensure redirect URIs match in Google Cloud Console
# Check that EMAIL_FROM matches the Google account used
```

</details>

<details>
<summary>❌ MongoDB Connection Issues</summary>

**Common causes:**
- Incorrect connection string format
- Network access restrictions in MongoDB Atlas
- Database user permissions

**Solution:**
```bash
# Test connection
node -e "console.log(process.env.MONGODB_URI)"

# Verify Atlas IP whitelist includes your server
# Check database user has proper permissions
```

</details>

<details>
<summary>❌ NextAuth Configuration Problems</summary>

**Solution:**
```bash
# Ensure environment variables are set
echo $NEXTAUTH_SECRET
echo $NEXTAUTH_URL

# Enable debug mode
NEXTAUTH_DEBUG=true npm run dev

# Check OAuth provider configuration
```

</details>

<details>
<summary>❌ Build or Runtime Errors</summary>

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

</details>

---

## 🤝 Contributing

<div align="center">

We welcome contributions from the community! 

[![Contributors](https://img.shields.io/github/contributors/your-username/useless-cv?style=flat-square)](https://github.com/your-username/useless-cv/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/your-username/useless-cv?style=flat-square)](https://github.com/your-username/useless-cv/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/your-username/useless-cv?style=flat-square)](https://github.com/your-username/useless-cv/pulls)

</div>

### 🛠️ Development Workflow

1. **🍴 Fork** the repository
2. **🌿 Create** feature branch: `git checkout -b feature/amazing-feature`
3. **💫 Commit** changes: `git commit -m 'Add amazing feature'`
4. **🚀 Push** to branch: `git push origin feature/amazing-feature`
5. **🔄 Open** Pull Request with detailed description

### 📋 Contribution Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure CI/CD checks pass
- Use conventional commit messages

---

## 📄 License & Legal

<div align="center">

This project is licensed under the **MIT License**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**Free to use, modify, and distribute**

</div>

---
## 🔄 Version History

<div align="center">

### 🎉 Latest Release

</div>

<details>
<summary>📋 v1.0.0 (August 14, 2025)</summary>

#### ✨ **New Features**
- 🔐 Complete user authentication system with NextAuth.js
- 📧 Gmail API integration for automated email services
- 📄 Contentful CMS integration for dynamic content
- 🗄️ MongoDB user management and data persistence
- 📱 Fully responsive Material-UI design system
- 🛡️ reCAPTCHA bot protection integration
- 🔑 Secure password reset functionality

#### 🐛 **Bug Fixes**
- Fixed OAuth2 token refresh issues
- Resolved email template rendering problems
- Corrected responsive layout inconsistencies

#### 🏗️ **Technical Improvements**
- TypeScript strict mode implementation
- Enhanced error handling and logging
- Optimized build performance
- Improved SEO meta tags

</details>

<details>
<summary>🚧 Upcoming in v1.1.0</summary>

#### 🎯 **Planned Features**
- 📊 Analytics dashboard
- 🌙 Dark mode toggle
- 📱 Progressive Web App (PWA) support
- 🔄 Real-time collaboration
- 📤 PDF export functionality
- 🎨 Custom theme builder

</details>

---

<div align="center">

### 🌟 Built with passion using Next.js and TypeScript

<br>

<img src="https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge" alt="Made with love" />

<br><br>

**[⭐ Star this repository](https://github.com/your-username/useless-cv)** if you found it helpful!

<br>

---

*© 2025 Useless CV. All rights reserved.*

</div>