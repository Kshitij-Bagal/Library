import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/booksSlice";
import { useNavigate } from "react-router-dom";

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
  const [bookCount, setBookCount] = useState(0); // Store the total number of books
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview URL

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fetch the total number of books on component mount
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

      // Set image preview URL when an image is selected
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result); // Set the preview URL
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
    const newBookId = bookCount + 1; // Assign a unique ID

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

      const text = await response.text(); // Read response as text
      console.log("Raw server response:", text);

      let data;
      try {
        data = JSON.parse(text); // Try to parse as JSON
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        alert("Invalid response from the server.");
        return;
      }

      if (data?.success && data.metadata?.pdfUrl && data.metadata?.imageUrl) {
        dispatch(
          addBook({
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
        alert(data.message || "Book uploaded successfully!"); // ✅ Use correct message
        navigate("/browse-books");
      } else {
        console.error("Upload failed, response data:", data);
        alert(`Upload failed: ${data?.message || "Unknown error from server"}`);
        console.log("Raw server response:", text);
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

          {/* File Uploader for PDF */}
          <label className="file-upload">
            <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, "pdf")} required />
            <span>{pdfName}</span>
          </label>

          {/* File Uploader for Image */}
          <label className="file-upload">
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} required />
            <span>{imageName}</span>
          </label>

          <button type="submit">Upload</button>
        </form>

        {/* Preview Section */}
        <div className="preview-section">
          <h2>Preview</h2>
          <p><strong>Title:</strong> {form.title || "N/A"}</p>
          <p><strong>Author:</strong> {form.author || "N/A"}</p>
          <p><strong>Description:</strong> {form.description || "N/A"}</p>
          <p><strong>PDF:</strong> {pdfName}</p>
          <p><strong>Image:</strong> {imageName}</p>

          {/* Display Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <h3>Cover Image Preview:</h3>
              <img src={imagePreview} alt="Book Cover" style={{ width: "200px", height: "auto" }} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddBook;
