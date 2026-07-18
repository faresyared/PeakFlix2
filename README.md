# CineVault

A premium bilingual streaming front-end built with React, Vite and TypeScript.

## Features
- English and Arabic with automatic RTL layout
- Movies, series, anime, Turkish series and Turkish drama categories
- Search, title details and video player pages
- Local demo authentication: `admin / admin`
- Local watch progress for signed-in users
- Automatic deployment to GitHub Pages through GitHub Actions

## Important security note
The current login and watch history use `localStorage` for demonstration only. Never store real passwords this way. Replace it with a backend and a database before production.

## Run locally
```bash
npm install
npm run dev
```

## Deploy with GitHub only
1. Create a new empty GitHub repository.
2. Upload all files from this project, keeping `.github/workflows/deploy.yml`.
3. Commit to the `main` branch.
4. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
5. Open the **Actions** tab and wait for the deployment workflow to finish.

GitHub automatically installs dependencies with `npm ci`; you do not upload `node_modules`.

## Add your licensed media
Edit `src/data/media.ts`. Replace `poster`, `backdrop`, `video`, and `trailer` URLs with your own legal assets.
