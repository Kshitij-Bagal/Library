import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; 
import Home from "./pages/Home";
import About from "./pages/About";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import BrowseBook from "./pages/BrowseBook";
import Inquire from "./pages/Inquire";
import "./App.css";

function App() {
  return (
    <Router basename="/Library/">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book/:name" element={<BookDetails />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/browse-books" element={<BrowseBook />} />
        <Route path="/browse-books/:genre" element={<BrowseBook />} />
        <Route path="/inquire" element={<Inquire />} />
      </Routes>
    </Router>
  );
}

export default App;
