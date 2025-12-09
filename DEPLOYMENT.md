# 🚀 GitHub Pages Deployment Guide

This document explains how the GitHub Pages deployment is configured for this project and how to deploy manually if needed.

## 📋 Overview

This is a **Create React App (CRA)** project configured to deploy to GitHub Pages at:
**https://theQuarky.github.io/chess-frontend**

### Key Configuration Points

1. **Homepage URL**: Set in `package.json` to `https://theQuarky.github.io/chess-frontend`
2. **Build Output**: React builds to the `/build` folder (not `/dist`)
3. **Deployment Source**: Only the `/build` folder is deployed (no README.md or source files)
4. **Base Path**: The app uses `/chess-frontend/` as the base path for all assets

## ✅ What Gets Deployed

The deployment **ONLY** includes:
- `/build` folder contents:
  - `index.html`
  - `favicon.ico` and logo files
  - `/static` folder (JS, CSS bundles)
  - `manifest.json`
  - `robots.txt`
  - `.nojekyll` (prevents GitHub Pages from using Jekyll)

The deployment **DOES NOT** include:
- ❌ `README.md`
- ❌ Source code (`.js`, `.jsx`, `.ts`, `.tsx` from `/src`)
- ❌ `package.json`
- ❌ `node_modules`
- ❌ Any configuration files
- ❌ Any other project files

## 🔄 Automatic Deployment (GitHub Actions)

The project uses GitHub Actions for automatic deployment.

### How It Works

1. **Trigger**: Automatically runs when you push to `main` or `master` branch
2. **Workflow**: `.github/workflows/deploy.yml`
3. **Process**:
   - Checks out the repository
   - Installs Node.js 18
   - Runs `npm ci --legacy-peer-deps` to install dependencies
   - Runs `npm run build` to create production build
   - Uploads **only** the `./build` folder as an artifact
   - Deploys the artifact to GitHub Pages

### Manual Trigger

You can manually trigger the workflow:
1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. Select **"Build and Deploy to GitHub Pages"** workflow
4. Click **"Run workflow"** button
5. Select the branch and click **"Run workflow"**

### Workflow Configuration

```yaml
# Only the build folder is uploaded and deployed
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./build  # ← Only this folder is deployed
```

## 🛠️ Manual Deployment (Local)

For manual deployments from your local machine, you can use the `gh-pages` package.

### Prerequisites

- Git configured with GitHub credentials
- Node.js and npm installed
- All dependencies installed (`npm install`)

### Deploy Commands

```bash
# One-step deployment (builds and deploys)
npm run deploy

# Or step-by-step:
npm run build    # Build the project
npm run deploy   # Deploy to gh-pages branch
```

### What Happens During Manual Deployment

1. **predeploy**: Automatically runs `npm run build`
2. **deploy**: Uses `gh-pages -d build` to:
   - Create/update a `gh-pages` branch
   - Push **only** the `/build` folder contents to that branch
   - GitHub Pages serves from the `gh-pages` branch

### gh-pages Package Configuration

In `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "gh-pages": "^6.3.0"
  }
}
```

The `-d build` flag tells gh-pages to deploy **only** the `build` directory.

## 🔧 Why README.md Won't Appear

### Previous Issues (If Any)

If README.md was appearing on the live site before, it was likely because:
1. The entire repository was being deployed (not just `/build`)
2. GitHub Pages was set to deploy from a branch that contained all files
3. Or Jekyll was processing files and creating unwanted pages

### Current Solution

1. **Only /build is deployed**: Both GitHub Actions and manual deployment only push the `/build` folder
2. **No source files in /build**: The build process only copies necessary files
3. **.nojekyll file**: Prevents GitHub Pages from processing files with Jekyll
4. **Proper branch setup**: GitHub Pages deploys from artifacts (Actions) or gh-pages branch (manual)

### Verification

After deployment, verify by checking:
- Your live site: https://theQuarky.github.io/chess-frontend
- No README.md should be accessible
- No source code files should be accessible
- Only the built React app should be visible

## 📦 Build Process Details

### Build Command
```bash
npm run build
```

### Build Configuration

- **Framework**: Create React App (react-scripts)
- **Output Directory**: `/build`
- **Base URL**: `/chess-frontend/` (from homepage field)
- **Optimization**: Production build with minification and optimization

### Build Output Structure
```
build/
├── .nojekyll              # Prevents Jekyll processing
├── index.html             # Main HTML file
├── favicon.ico            # Favicon
├── logo192.png           # PWA icons
├── logo512.png
├── manifest.json         # PWA manifest
├── robots.txt            # SEO robots file
└── static/               # Bundled assets
    ├── css/              # Minified CSS
    ├── js/               # Minified JS bundles
    └── media/            # Images and fonts
```

## 🔍 Troubleshooting

### README.md Still Appearing?

1. **Check GitHub Pages source**:
   - Go to Settings → Pages
   - Verify Source is "GitHub Actions" (not "Deploy from a branch")

2. **Clear GitHub Pages cache**:
   - Make a dummy commit and push
   - Wait for the workflow to complete
   - Clear your browser cache
   - Access the site in incognito mode

3. **Verify workflow ran successfully**:
   - Check Actions tab for successful runs
   - Review workflow logs for any errors

### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Try building again
npm run build
```

### Deployment Failures

```bash
# For manual deployment:
# Ensure you're on the right branch
git branch

# Ensure working directory is clean
git status

# Try deploying with verbose output
npx gh-pages -d build --verbose
```

## 📝 Setup Checklist for New Deployments

- [x] `homepage` field in `package.json` set to `https://theQuarky.github.io/chess-frontend`
- [x] GitHub Actions workflow (`.github/workflows/deploy.yml`) configured
- [x] Workflow uploads only `/build` folder
- [x] `.nojekyll` file in `/public` folder (copied to `/build` during build)
- [x] `gh-pages` package installed as dev dependency
- [x] Deploy scripts added to `package.json`
- [x] GitHub Pages source set to "GitHub Actions" in repository settings

## 🎯 Summary

### Automatic Deployment (Recommended)
- Push to `main`/`master` branch → Automatic deployment
- Uses GitHub Actions
- No local configuration needed

### Manual Deployment
```bash
npm run deploy
```
- Builds the project
- Deploys only `/build` folder
- Requires local Git/GitHub authentication

### Security
✅ **Only production files are deployed**
✅ **No source code exposed**
✅ **No configuration files exposed**
✅ **No README.md on live site**

---

**Live URL**: https://theQuarky.github.io/chess-frontend

**Repository**: https://github.com/theQuarky/chess-frontend
