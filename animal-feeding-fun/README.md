# 🦁 Animal Feeding Fun

An interactive, kid-friendly Progressive Web Application (PWA) built with React, TypeScript, Tailwind CSS, and Framer Motion. Children can feed cute animals their favorite foods, listen to realistic synth animal sounds, earn reward stickers, and play completely offline!

---

## ✨ Features

- 🦁 **Interactive Animals**: Lion, Bunny, Frog, Cat, Dog, Cow, Sheep, Goat, Horse, Pig, Monkey, and Panda.
- 🍎 **Drag & Drop Feeding**: Kids drag delicious snacks right into the animals' mouths.
- 🎵 **Realistic Web Audio Synthesizers**: Dynamic chew and munch sounds paired with custom-synthesized vocalizations.
- 🌟 **Progress & Sticker Collection**: Unlock cute stickers as animals get full!
- 📱 **Offline PWA Support**: Includes a service worker (`sw.js`) and web app manifest (`manifest.json`) so it can be installed on iPads, tablets, and phones and played without an internet connection.
- 🚀 **One-Click GitHub Pages Deployment**: Pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm or bun

### Setup & Run
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/animal-feeding-fun.git
   cd animal-feeding-fun
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📦 Production Build

To build the application for production:

```bash
npm run build
```

The output will be placed in the `dist/` directory, ready to be served by any static web server.

---

## 🌐 Deploying to GitHub Pages

1. Push your repository to GitHub on the `main` branch.
2. In your GitHub repository settings, navigate to **Pages** under **Code and automation**.
3. Under **Source**, select **GitHub Actions**.
4. Push a commit or trigger the workflow under the **Actions** tab. The automated workflow `.github/workflows/deploy.yml` will automatically build and host your application on GitHub Pages!

---

## 📲 Installing on iPad / Tablet (Offline Usage)

Once deployed to GitHub Pages or hosted on a web domain:
1. Open the website in **Safari** on your iPad or iPhone.
2. Tap the **Share** button (the square with an arrow pointing up).
3. Scroll down and tap **"Add to Home Screen"**.
4. The app icon will appear on your iPad home screen like a native app and will work **100% offline** without needing an internet connection!

---

## 📄 License

MIT License. Open source and free for educational and personal use.
