import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFavorite } from "../redux/favoritesSlice";
import { useNavigate } from "react-router-dom";
import "../styles/AddBook.css";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    publishDate: "",
    genre: "",
    pdf: null,
    image: null,
  });

  const [pdfName, setPdfName] = useState("No PDF chosen");
  const [imageName, setImageName] = useState("No Image chosen");
  const [bookCount, setBookCount] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://library-backend-vi4b.onrender.com/api/books")
      .then((response) => response.json())
      .then((data) => setBookCount(data.length))
      .catch((error) => console.error("Error fetching book count:", error));
  }, []);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, [fileType]: file }));

    if (fileType === "pdf") setPdfName(file ? file.name : "No PDF chosen");
    if (fileType === "image") {
      setImageName(file ? file.name : "No Image chosen");

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.description || !form.pdf || !form.image) {
      alert("Please fill all fields and upload both the PDF and cover image.");
      return;
    }

    const formData = new FormData();
    const newBookId = bookCount + 1;

    formData.append("id", newBookId);
    formData.append("name", form.title);
    formData.append("price", form.price || "$100");
    formData.append("author", form.author);
    formData.append("description", form.description);
    formData.append("genre", form.genre || "N/A");
    formData.append("publishDate", form.publishDate || "N/A");
    formData.append("pdf", form.pdf);
    formData.append("image", form.image);

    try {
      const response = await fetch("https://library-backend-vi4b.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      console.log("Raw server response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        alert("Invalid response from the server.");
        return;
      }

      if (data?.success && data.metadata?.pdfUrl && data.metadata?.imageUrl) {
        dispatch(
          addFavorite({
            id: newBookId,
            name: form.title,
            author: form.author,
            description: form.description,
            pdfUrl: data.metadata.pdfUrl,
            image: data.metadata.imageUrl,
            genre: form.genre || "N/A",
            publishDate: form.publishDate || "N/A",
            price: form.price || "$100",
          })
        );

        alert(data.message || "Book uploaded and added to favorites!");
        navigate("/browse-books");
      } else {
        console.error("Upload failed, response data:", data);
        alert(`Upload failed: ${data?.message || "Unknown error from server"}`);
      }
    } catch (error) {
      console.error("Error uploading book:", error);
      alert("Failed to upload book. Try again later.");
    }
  };

  return (
    <>
      <h1>Add a New Book</h1>
      <div className="add-book-container">
        <form onSubmit={handleSubmit} className="add-book-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="text"
            name="publishDate"
            placeholder="Publish Date"
            value={form.publishDate}
            onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
            required
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            required
          />
          <div className="upload-btn">
          <label className="file-upload">
            <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, "pdf")} required />
            <span>{pdfName}</span>
          </label>

          <label className="file-upload">
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} required />
            <span>{imageName}</span>
          </label>
          </div>
          <button type="submit">Upload & Add to Favorites</button>
        </form>

        {form.title && (
          <div className="preview-section">
            <h2>Book Preview</h2>
            <p><strong>Title:</strong> {form.title}</p>
            <p><strong>Author:</strong> {form.author}</p>
            <p><strong>Price:</strong> {form.price || "$100"}</p>
            <p><strong>Genre:</strong> {form.genre || "N/A"}</p>
            <p><strong>Publish Date:</strong> {form.publishDate || "N/A"}</p>
            <p><strong>Description:</strong> {form.description}</p>
            <p><strong>PDF:</strong> {pdfName}</p>
            <p><strong>Cover Image:</strong> {imageName}</p>

            {imagePreview && (
              <>
                <h3>Cover Image Preview:</h3>
                <img src={imagePreview} alt="Book Cover" style={{ width: "200px", height: "auto", borderRadius: "10px" }} />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AddBook;
