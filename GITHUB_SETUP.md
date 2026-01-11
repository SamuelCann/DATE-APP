# GitHub Hosting Setup Guide

Follow these steps to host your Date Difference Calculator on GitHub Pages:

## Step 1: Install Git (if not already installed)

1. Download Git from: https://git-scm.com/download/win
2. Install it with default settings
3. Restart your terminal/command prompt

## Step 2: Create a GitHub Account (if you don't have one)

1. Go to https://github.com
2. Sign up for a free account

## Step 3: Initialize Git Repository

Open PowerShell or Command Prompt in your project folder (D:\DATE-APP) and run:

```bash
git init
git add .
git commit -m "Initial commit - Date Difference Calculator"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `date-difference-calculator` (or any name you prefer)
5. Description: "A beautiful date difference calculator with a modern watch design"
6. Make it **Public** (required for free GitHub Pages)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 5: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your project folder:

```bash
git remote add origin https://github.com/YOUR_USERNAME/date-difference-calculator.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

## Step 7: Access Your Live Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/date-difference-calculator/
```

It may take a few minutes for the site to go live after enabling Pages.

## Troubleshooting

- If you get authentication errors, you may need to set up a Personal Access Token
- Make sure your repository is set to Public
- Wait 5-10 minutes after enabling Pages for the site to deploy

## Updating Your Site

To update your site after making changes:

```bash
git add .
git commit -m "Update description of changes"
git push
```

Changes will automatically update on GitHub Pages within a few minutes.
