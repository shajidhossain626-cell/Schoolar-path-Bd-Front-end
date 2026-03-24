# ScholarPath BD — React Project Setup Guide

## Prerequisites
- Node.js 18+ installed → https://nodejs.org
- A code editor (VS Code recommended)

## 1. Install dependencies
```bash
cd scholarpath
npm install
```

## 2. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and add:
- `VITE_ANTHROPIC_API_KEY` → Get from console.anthropic.com (for AI advisor)
- `VITE_API_URL` → Your backend URL (use http://localhost:5000/api for now)

## 3. Run the development server
```bash
npm run dev
```
Opens at http://localhost:3000

## 4. Build for production
```bash
npm run build
```
Creates `dist/` folder — deploy this to Vercel.

## Project Structure
```
src/
├── App.jsx                    # Routes & providers
├── main.jsx                   # Entry point
├── index.css                  # Global styles + Tailwind
├── components/
│   ├── auth/
│   │   ├── AuthModal.jsx      # Login/signup modal
│   │   └── ProtectedRoute.jsx # Route guard
│   ├── common/
│   │   ├── ScholarshipCard.jsx  # Reusable card
│   │   ├── AISearchBar.jsx      # AI search component
│   │   └── FilterSidebar.jsx    # Filter panel
│   └── layout/
│       ├── Layout.jsx           # Page shell
│       ├── Navbar.jsx           # Navigation
│       └── Footer.jsx           # Footer
├── context/
│   ├── AuthContext.jsx          # User auth state
│   └── ScholarshipContext.jsx   # Scholarships + saved
├── data/
│   ├── scholarships.js          # 12 scholarship records
│   └── blogs.js                 # 8 blog articles
├── hooks/
│   ├── useAI.js                 # AI advisor hooks
│   └── useFilters.js            # Filter + pagination
├── pages/
│   ├── HomePage.jsx
│   ├── ListingPage.jsx
│   ├── DetailPage.jsx
│   ├── DashboardPage.jsx        # Protected route
│   ├── ServicesPage.jsx
│   ├── BlogPage.jsx
│   ├── BlogDetailPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   └── NotFoundPage.jsx
├── services/
│   ├── api.js                   # All API calls (axios)
│   └── aiService.js             # AI + local fallback
└── utils/
    └── helpers.js               # Date, formatting utils
```

## Next Steps (Phase 2)
1. Build the Node.js backend → ask Claude "Build me the Node.js backend"
2. Set up Supabase database → ask Claude "Build me the database schema"
3. Add SSLCommerz payments → ask Claude "Build me the payment integration"
4. Deploy to Vercel → ask Claude "Help me deploy to Vercel"

## Connecting to Real Backend
When your backend is ready, update `src/services/api.js`:
- Replace mock data with real API calls
- The auth functions in `AuthContext.jsx` are already set up to call `/api/auth/login`
- The scholarship context can switch from local data to API calls

