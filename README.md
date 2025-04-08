# 📝 Feedback Collector App

A modern, single-page feedback collection application built with React, Tailwind CSS, and a backend API. Users can submit their feedback, and view all submissions through an admin toggle.

---

## 📌 Objective

To develop a fully functional micro-application that collects user feedback (name, email, message) and displays it on an admin interface, demonstrating clean UI/UX, robust backend integration, and deployability.

---

## 🚀 Live Demo

🔗 [View Deployed App on Netlify](https://your-netlify-url.netlify.app)

---

## 🛠️ Tech Stack

| Layer        | Tech Used                    |
|--------------|------------------------------|
| Frontend     | React + Vite + Tailwind CSS  |
| Backend      | Netlify Functions (Node.js)  |
| Deployment   | Netlify                      |
| Styling      | TailwindCSS (responsive)     |
| State Mgmt   | React useState/useEffect     |

---

## ✨ Features

### 👨‍💻 User Interface
- Full Name input
- Email input (with validation)
- Feedback textarea
- Submit button with loading state
- Clean, responsive design
- Footer watermark with developer credit

### 🧑‍🏫 Admin Panel
- “View Submitted Feedback” toggle
- Display all submissions in card layout
- Feedback list styled, no raw JSON

### ⚙️ Backend API
- `POST /submit-feedback` → Accepts and stores feedback
- `GET /feedbacks` → Returns all submitted entries
- Data stored using JSON files via Netlify Functions

### 🎁 Bonus Features
- ✅ Mobile responsiveness
- ✅ Timestamps for each submission
- ✅ Dark/light mode toggle
- ✅ Smooth transitions and micro animations
- ✅ Friendly form validation with inline messages

---

# Clone the repo
git clone https://github.com/yourusername/feedback-collector.git
cd feedback-collector

# Install dependencies
npm install

# Start dev server
npm run dev

# To test Netlify Functions locally
netlify dev

🧑‍🎓 Credits
Made with ❤️ by Mayank

Submitted as part of the Unity Feedback Collector Internship Task
Deployed on Netlify • React • TailwindCSS

📄 License
This project is open-source and free to use under the MIT License.
