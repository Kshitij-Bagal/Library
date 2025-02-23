# 📚 **MyLibrary - Online Book Management System**

Welcome to **MyLibrary**, a modern online library system where users can browse, add, and inquire about books! This project is designed to provide a smooth book management experience with dynamic data handling and seamless routing.

## 🚀 **Mission Statement**

Our mission is to make books more accessible through a simple, interactive web interface. Whether you're an avid reader, a student, or a book collector, **MyLibrary** aims to offer a user-friendly platform to manage and explore your library anytime, anywhere.

---

## 🛠️ **Features**

- Dynamic Book Browsing:** Search and explore books by genre or title.
- Book Details View:** See detailed information about a book.
- Add New Books:** Contribute by adding books with metadata.
- Favorites Section:** Save your favorite books.
- Inquiries & Support:** Reach out for any book-related inquiries.

---

## 🏗️ **Project Structure**
```
/Library
│── /public           # Static files (404.html, favicon, etc.)
│── /src
│   ├── /components   # Reusable components (Navbar, BookCard, etc.)
│   ├── /pages        # Individual pages (Home, BrowseBook, AddBook, etc.)
│   ├── /redux        # Redux store setup for managing book data
│   ├── /utils        # Utility functions
│   ├── App.js        # Main App component
│   ├── main.jsx      # React entry point
│── /backend          # Express backend (deployed separately)
│── vite.config.js    # Vite configuration (GitHub Pages setup)
│── package.json      # Dependencies & scripts
│── README.md         # Project documentation (You're here!)
```
---

## 🛠️ Tech Stack
### Frontend:
- Vite + React.js → Fast and modern frontend framework
- React Router → Handles client-side routing
- Tailwind CSS / Vanilla CSS → For styling
- Redux Toolkit → State management for book data
- Lazy Loading → Faster load times with React.lazy()
### Backend:
- Node.js + Express.js → API handling
- Google Drive API → Fetches book data dynamically
- Firebase Storage → Stores PDFs, images, and metadata
### Deployment:
- Frontend → Hosted on GitHub Pages
- Backend → Hosted on Render.com

---
## 🔧 Installation & Setup
### 📌 Prerequisites
Make sure you have:

- **Node.js (v16+ recommended)
- **NPM (comes with Node.js)
### 🚀 Steps to Run Locally

1️⃣ Clone the repository

```
git clone https://github.com/Kshitij-Bagal/Library.git
cd Library
```
2️⃣ Install dependencies
```
npm install
```
3️⃣ Start the development server

```
npm run dev
```
The app will be available at http://localhost:5173/Library/.

---

### 📝 How to Use
- Home Page: See an overview of the library.
- Browse Books: Search books by genre or explore the entire collection.
- Add a Book: Fill out the form to add new books to the library.
- Book Details: Click on a book to view detailed information.
- Favorites: Save and view your favorite books.
- Inquire: Reach out to the library admins for queries or book requests.

---

## 🛠️ Known Issues & Future Improvements
### 🟢 Current Issues
- Page refresh on GitHub Pages gives 404 error (fixed with 404.html).
- Firebase authentication not yet integrated.
### 🔮 Upcoming Features
- 🔐 User Authentication → Secure login & signup.
- 📊 Admin Dashboard → Manage books, users, and reviews.
- 📑 Book Reviews & Ratings → Users can leave reviews.

---

## 🤝 Contributing
We welcome contributions! Here’s how you can contribute:

- Fork the Repository
- Create a New Branch
```
git checkout -b feature-name
```
- Commit Your Changes
```
git commit -m "Add feature: XYZ"
```
- Push to the Branch
```
git push origin feature-name
```
- Create a Pull Request
---

## 📝 License
This project is open-source under the MIT License. Feel free to use, modify, and distribute it.

## 💡 Contact & Support
If you have any issues, feel free to create an Issue in the repository.

📩 Contact Developer:

👤 Kshitij Baban Bagal

🔗 [GitHub Profile](https://github.com/Kshitij-Bagal)

