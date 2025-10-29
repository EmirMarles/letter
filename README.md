# Letter Envelope Project

A beautiful animated letter envelope with vintage styling.

## Local Testing

### Option 1: Python HTTP Server (Recommended)
```powershell
# Navigate to project directory
cd c:\Users\emirm\Desktop\letter

# Start local server
python -m http.server 8000
```

Then open your browser and go to: **http://localhost:8000**

### Option 2: Node.js (if you have it installed)
```powershell
npx http-server -p 8000
```

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Deployment to Render

Your project is already configured for Render deployment with `render.yaml`.

### Steps to Deploy:

1. **Commit and push your changes:**
   ```powershell
   git add .
   git commit -m "Update letter with custom images"
   git push origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com) and sign in
   - Click "New +" and select "Static Site"
   - Connect your GitHub repository: `EmirMarles/letter`
   - Render will automatically detect the `render.yaml` configuration
   - The site will be deployed automatically

3. **Your site will be live at:** `https://letter-envelope.onrender.com` (or a custom domain if configured)

### Manual Render Setup (if needed):
- **Build Command:** (leave empty)
- **Publish Directory:** `.` (current directory)
- **Static Site:** Yes

## Features

- Animated envelope flap
- Vintage paper textures
- Click to open/close the envelope
- Responsive design
- Beautiful typography

