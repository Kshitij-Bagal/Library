import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavBar from "./components/NavBar";
import "./App.css";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const AddBook = lazy(() => import("./pages/AddBook"));
const BrowseBook = lazy(() => import("./pages/BrowseBook"));
const Inquire = lazy(() => import("./pages/Inquire"));
const Favorites = lazy(() => import("./pages/Favorites"));

// Loading component
const Loading = () => (
  <div className="loading-screen">
    <h2>Loading...</h2>
  </div>
);

const NotFound = () => (
  <div className="not-found">
    <h2>404 - Page Not Found</h2>
    <p>Oops! The page you are looking for does not exist.</p>
  </div>
);


// Layout component (for navbar + content)
const Layout = () => (
  <>
    <NavBar />
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </>
);

// Router configuration
const router = createBrowserRouter([
  {
    path: "/Library/",
    element: <Layout />, // Wrap everything with the layout
    children: [
      { path: "", element: <Home /> }, // Home page
      { path: "about", element: <About /> },
      { path: "book/:name", element: <BookDetails /> },
      { path: "add-book", element: <AddBook /> },
      { path: "browse-books", element: <BrowseBook /> },
      { path: "browse-books/:genre", element: <BrowseBook /> },
      { path: "inquire", element: <Inquire /> },
      { path: "favorites", element: <Favorites /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
