
<div align="center">
  <img src="public/images/logo_transparent.png" alt="WellMeds Logo" width="200"/>
  <h1 align="center">WellMeds</h1>
  <p align="center">
    An intelligent, AI-powered medicine search PWA to instantly find information on 900+ medicines.
  </p>
  
  <!-- Badges -->
  <p align="center">
    <a href="https://wellmed.vercel.app/" target="_blank">
      <img alt="Live Site" src="https://img.shields.io/website?label=wellmed.vercel.app&style=for-the-badge&up_message=online&url=https%3A%2F%2Fwellmed.vercel.app%2F">
    </a>
    <a href="https://github.com/MrTG1B/WellMed" target="_blank">
      <img alt="GitHub Repository" src="https://img.shields.io/github/stars/MrTG1B/WellMed?style=for-the-badge&logo=github&label=Stars">
    </a>
    <img alt="License" src="https://img.shields.io/github/license/MrTG1B/WellMed?style=for-the-badge&label=License">
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js">
  </p>
</div>

---

## 🔹 Overview

**WellMeds** is a modern Progressive Web App (PWA) designed to provide fast and accurate information about over 900 medicines. Powered by Gemini AI, it offers an enhanced search experience that understands user queries, corrects misspellings, and delivers detailed information in multiple languages. Whether you're searching by name, composition, barcode, or HSN code, WellMeds is your reliable medicine information hub.

## ✨ Key Features

*   🚀 **AI-Powered Smart Search:** Leverages Google's Gemini model to understand and correct user queries, providing more accurate and relevant results.
*   🔍 **Multi-Faceted Search:** Find medicines by:
    *   **Name:** (e.g., "Paracetamol")
    *   **Salt Composition:** (e.g., "Ibuprofen 400mg")
    *   **Drug Code:** Unique identifier from the database.
    *   **HSN Code:** Standardized tax code for products.
*   🌐 **Multilingual Support:** Fully available in **English**, **Hindi**, and **Bengali** for broader accessibility.
*   📱 **Progressive Web App (PWA):** Installable on any device (mobile or desktop) with offline capabilities for a native-app-like experience.
*   📋 **Detailed Information:** Get AI-enhanced details on usage, dosage, manufacturers, and side effects.
*   🔐 **Admin Dashboard:** A secure, login-protected dashboard for managing and updating the medicine database.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) 15 (React) with App Router
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) components
*   **Generative AI:** [Google's Gemini API](https://ai.google.dev/) via [Genkit](https://firebase.google.com/docs/genkit)
*   **Database:** [Firebase Realtime Database](https://firebase.google.com/docs/database)
*   **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth)
*   **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

Follow these steps to get a local copy of WellMeds up and running.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/MrTG1B/WellMed.git
cd WellMed
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

You need to create a `.env.local` file in the root of the project and add your Firebase and Gemini API credentials.

```env
# Firebase Public Config
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=1:...:web:...
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com

# Gemini API Key (for AI features)
GEMINI_API_KEY=AIza...

# Admin Login (for the /admin dashboard)
NEXT_PUBLIC_ADMIN_EMAIL=your-admin-email@example.com
```
*   **Important:** Ensure your Firebase Realtime Database is created and the `databaseURL` is correctly set.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/MrTG1B" target="_blank">MrTG1B</a></p>
</div>
