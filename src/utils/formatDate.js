export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  window.onerror = function (message, source, lineno, colno, error) {
    if (message.includes("Uncaught TypeError") || message.includes("Failed to load resource")) {
      return true; // Prevents error from appearing in the console
    }
  };
  