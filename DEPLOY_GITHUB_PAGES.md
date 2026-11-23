# Deploying College OLX to GitHub Pages

The project has been configured for static export and automated deployment to **GitHub Pages** using **GitHub Actions**.

---

## ⚡ Step 1: Create a New Repository on GitHub

1. Go to [github.com/new](https://github.com/new).
2. Enter a repository name (e.g., `college-olx`).
3. Set the repository visibility to **Public** (GitHub Pages is free for public repositories).
4. Do **not** initialize with a README, .gitignore, or license (the project already has them).
5. Click **Create repository**.

---

## 🚀 Step 2: Push Your Code to GitHub

Open a terminal or command prompt, navigate to the project directory, and run:

```bash
cd C:\Users\jashan\.gemini\antigravity\scratch\college-olx

# Initialize Git
git init
git branch -M main

# Add all files and commit
git add .
git commit -m "Initial commit: College OLX with edu login and dark mode"

# Link to your new GitHub repository (replace with your actual GitHub URL)
git remote add origin https://github.com/<YOUR-USERNAME>/college-olx.git

# Push to GitHub
git push -u origin main
```

*(If you use **VS Code** or **GitHub Desktop**, you can simply open the folder `C:\Users\jashan\.gemini\antigravity\scratch\college-olx` and click **Publish to GitHub**.)*

---

## ⚙️ Step 3: Enable GitHub Pages in Repository Settings

1. In your GitHub repository, click on **Settings** (top right tab).
2. In the left sidebar, click on **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   * Change **Source** from *"Deploy from a branch"* to **"GitHub Actions"**.
4. That's it! GitHub will now use the automated workflow located in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## 🎉 Step 4: Access Your Live Site

1. Click on the **Actions** tab in your repository to watch the deployment run.
2. In about 1–2 minutes, your site will be live at:
   ```
   https://<YOUR-USERNAME>.github.io/college-olx/
   ```

---

## 🛠️ How the Configuration Works

* **Static Export**: Next.js compiles the entire app into pure HTML/CSS/JS in the `out/` folder (`output: 'export'` in `next.config.js`).
* **Dynamic Base Path**: `next.config.js` automatically detects your GitHub repository name via GitHub Actions and configures the correct asset path (`/<repo-name>/`), so you don't need to hardcode URLs.
* **`.nojekyll`**: A `.nojekyll` file in `public/` ensures GitHub Pages does not filter out Next.js's `_next/` static chunk directories.
* **Responsive & Self-Contained**: The live site includes full dark/light mode, campus filtering, edu domain verification, and local persistence on GitHub Pages without requiring a backend server.
