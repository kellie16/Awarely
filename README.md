# Awarely 🌍🛡️

**Safety when it matters.**

Awarely is a modern, mobile-first web application designed to empower travelers and locals with real-time safety awareness. By combining community-driven data, geolocation services, and AI-powered insights, Awarely helps you make informed decisions about your surroundings.

## ✨ Key Features

- **🗺️ Interactive Safety Map**: visualize safety zones (Safe, Caution, Danger) directly on a Google Map.
- **📍 Real-Time Geofencing**: Receive immediate alerts when you enter or exit potential danger zones.
- **🤖 AI Safety Summaries**: Leveraging Google Gemini to provide instant, context-aware safety summaries and travel advice for your current location.
- **🗣️ Community Feedback**: a "Waze for Safety" approach where users can report incidents and rate the safety of areas, contributing to a shared safety database.
- **👤 User Dashboard**: Manage your profile, view your trusted contacts, and review your past activity.
- **🤝 Trusted Contacts**: (Coming Soon) Quickly notify friends and family if you feel unsafe.
- **🔒 Secure Authentication**: Robust login and signup flows powered by Firebase Auth.

## 🛠️ Tech Stack

Built with modern web technologies for performance and reliability:

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps**: [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) (`@react-google-maps/api`)
- **Backend & Auth**: [Firebase](https://firebase.google.com/) (Firestore, Authentication, Hosting)
- **AI**: [Google Gemini API](https://deepmind.google/technologies/gemini/) (`@google/generative-ai`)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Cloud Project with Maps JavaScript API and Gemini API enabled.
- A Firebase project.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kellie16/Awarely.git
    cd Awarely
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add your API keys:
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    
    VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    VITE_GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Build for production**
    ```bash
    npm run build
    ```

## 📱 Usage

1.  **Log In**: Sign in with your email to access personalized features.
2.  **Explore**: Use the map to check the safety rating of different zones.
3.  **Stay Alert**: Watch for pop-up alerts if you navigate into a "Caution" or "Danger" zone.
4.  **Contribute**: Use the feedback form to report safety issues in your area.
5.  **Get Insights**: Click the "Analyze Safety" button to get an AI-generated report for your current view.

## 📄 License

This project is licensed under the MIT License.
