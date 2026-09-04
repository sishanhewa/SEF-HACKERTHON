# 🇱🇰 FloodAid Sri Lanka — Disaster Relief Coordination Platform

**FloodAid** is a real-time coordination platform designed to bridge the gap between disaster victims requesting aid, donors offering resources, and volunteers providing labor during Sri Lankan floods.

Built during the **SE3090 Mini Hackathon (4-Hour Sprint)**.

## ⚠️ The Problem

Sri Lanka faces recurring floods and natural disasters that displace communities and create urgent demand for food, water, medicine, clothing, and shelter. Currently, aid distribution is chaotic:
- **Victims** don't know where to ask for help or their requests get lost in social media feeds.
- **Donors** want to help but don't know exactly what is needed or where to send it.
- **Volunteers** want to assist but lack central coordination for safe deployment.

## 💡 The Solution

FloodAid provides a centralized, real-time dashboard that:
1. Allows victims/coordinators to **request specific aid** (categorized by need).
2. Uses a **priority algorithm** to highlight critical, life-saving needs (like medicine/water) over less urgent items.
3. Provides a **live interactive map** of Sri Lanka showing where aid is requested.
4. Allows donors to **pledge donations** to specific requests, dynamically updating the "Resource Gap".
5. Allows **volunteers to register** their skills and availability by district.

---

## 🚀 Key Features

- **Aid Request Submission:** Victims can log requests with specific quantities, categories, and locations.
- **Live Operations Dashboard:** View all requests in a responsive grid, with real-time stats on total vs fulfilled requests.
- **Dynamic Map Integration:** Visualizes requests across Sri Lanka using Leaflet and OpenStreetMap.
- **Resource Gap Calculation:** As donations are pledged, the system calculates remaining units needed and updates the status (Unfulfilled → Partial → Fulfilled).
- **Advanced Filtering:** Filter requests by District, Category, Priority, and Status.
- **Donor & Volunteer Portals:** Dedicated forms for users to contribute items or time.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphism design)
- **Backend & Database:** Supabase (PostgreSQL, Auto-generated APIs)
- **Mapping:** React-Leaflet (OpenStreetMap)
- **Routing:** React Router v6

---

## 👥 Team & Contributions

| Role | Name | GitHub | Key Contributions |
|---|---|---|---|
| **Role 1: Problem & Solution Design** | Vihara Rosa | `vihara-rosa` | Defined MVP, created sample Sri Lankan data, developed priority & resource gap logic (`helpers.js`). |
| **Role 2: UI Development** | Chenu | `chenu222` | Built responsive UI, design system (`index.css`), Dashboard, Maps, Donation & Volunteer forms. |
| **Role 3: Functional Implementation** | Sishan | `sishanhewa` | Set up Supabase DB, connected React to backend, implemented form validation, and integrated live map. |
| **Role 4: Git, Testing & Deployment** | Gaveesha | `gaveeshamadhushan` | Managed Git workflow, tested features, prepared production build, wrote README, and handled final deployment. |

---

## ⚙️ How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/sishanhewa/SEF-HACKERTHON.git
   cd SEF-HACKERTHON
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🤖 AI Usage Declaration

This project was built with the assistance of AI tools (Google Gemini) acting as an agentic coding assistant to accelerate scaffolding, boilerplate generation, and CSS styling within the strict 4-hour hackathon time limit. All core logic, architecture decisions, and database schemas were directed by the human team members according to the SE3090 marking rubric.
