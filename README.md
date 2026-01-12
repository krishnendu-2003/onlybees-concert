# OnlyBees Concert - Event Ticket Booking Platform

A modern React-based web application for booking concert tickets, built with Vite. Features ticket selection, cart management, and checkout functionality.


## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/krishnendu-2003/onlybees-concert.git
cd onlybees-concert
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required dependencies listed in `package.json`.

### 3. Environment Setup

#### Local Development (.env file)

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Or create `.env` manually with the following variables:

```env
VITE_API_BASE_URL=https://concertsapi.onlybees.in
VITE_API_ENDPOINT=/api/sections/availability
```

**For Local Development:**
- `VITE_API_BASE_URL` - **Required** for Vite proxy to forward API requests
- `VITE_API_ENDPOINT` - Optional (defaults to `/api/sections/availability`)

**How it works:**
- **Development**: Uses Vite proxy (`/api` → `VITE_API_BASE_URL`)
- **Production**: Uses full URL (`VITE_API_BASE_URL` + `VITE_API_ENDPOINT`)

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

If you don't create a `.env` file, the application will use default values:
- Default API Base URL: `https://concertsapi.onlybees.in`
- Default API Endpoint: `/api/sections/availability`

### 4. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the next available port).

Open your browser and navigate to the URL shown in the terminal.

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot module replacement (HMR)
- `npm run build` - Build the project for production (outputs to `dist/` folder)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
onlybees-concert/
├── public/                 # Static assets
│   ├── Logo.svg
│   ├── mohombi_flyer.jpg
│   └── Stage.jpg
├── src/
│   ├── assets/            # Image assets
│   ├── components/        # React components
│   │   ├── common/        # Reusable components
│   │   ├── events/        # Event-related components
│   │   ├── layout/        # Layout components
│   │   └── pages/         # Page components
│   ├── data/              # Static data (events.js)
│   ├── hooks/             # Custom React hooks
│   ├── theme/             # Theme configuration (colors.js)
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🔌 API Configuration

The application connects to the OnlyBees Concert API:

- **Base URL**: `https://concertsapi.onlybees.in`
- **Endpoints**:
  - `/api/sections/availability` - Fetch available ticket sections

API calls are proxied through Vite's dev server. In production, ensure your API endpoints are correctly configured.

## 🛠️ Troubleshooting

### MIME Type Error

If you encounter a MIME type error, try:

```bash
# Clear Vite cache
rm -rf node_modules/.vite
rm -rf dist

# Restart the dev server
npm run dev
```

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the actual port number.

### Module Not Found Errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## 📦 Building for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory. You can preview it locally with:

```bash
npm run preview
```

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- Project connected to Git repository

### Deployment Steps

1. **Push your code to Git** (if not already done)

2. **Import project to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository

3. **Configure Environment Variables** (IMPORTANT):
   - In Vercel project settings, go to "Environment Variables"
   - Add the following:
     - `VITE_API_BASE_URL` = `https://concertsapi.onlybees.in`
     - `VITE_API_ENDPOINT` = `/api/sections/availability`
   - **Select environments**: Choose **Production** and **Preview** (Development is optional since you develop locally)
   - **Note**: Without these variables, the API calls will fail in production

4. **Build Settings** (usually auto-detected):
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Deploy**: Click "Deploy"

### Important Notes

- The `vercel.json` file is already configured to handle SPA routing
- All routes will redirect to `index.html` for client-side routing
- Make sure your `.env` variables are set in Vercel's environment variables section
- The API proxy only works in development. For production, you may need to configure CORS on your API server or use a different approach

## 🎨 Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **ESLint** - Code linting

## 📝 Notes

- The application uses client-side routing without a router library
- Cart data is stored in localStorage
- GST is calculated at 18% of the subtotal
- Maximum ticket quantity per type is limited to 5


---

For questions or support, please contact [your contact information].
