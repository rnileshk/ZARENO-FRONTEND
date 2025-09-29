# MERN Frontend (Vite + Tailwind + Framer Motion)

This frontend maps to your backend endpoints:

- `POST /login`
- `POST /register`
- `GET /user` (User profile/protected)
- `GET /admin` (Admin profile/protected)

## Setup
1. Create `.env` at project root:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_TOKEN_STORAGE_KEY=mern_token
   ```
2. Install & run:
   ```bash
   npm install
   npm run dev
   ```

## Notes
- JWT saved in `localStorage` under `VITE_TOKEN_STORAGE_KEY`.
- `axios` interceptors attach `Authorization: Bearer <token>`.
- `ProtectedRoute` ensures only authorized roles access pages.
- Animations handled by `framer-motion` for pages, navbar, and cards.
