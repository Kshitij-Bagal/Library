import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <section className="about-section">
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            Welcome to our Online Library! We aim to provide an easy-to-use platform that gives readers access to a vast collection of books across different genres. Our mission is to foster a love of reading by offering a wide variety of books and resources for users of all ages.
          </p>
        </div>
        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            Our journey started with a simple goal – to make books accessible to everyone. From humble beginnings, we have grown into a platform that not only offers books for reading but also helps authors and publishers reach a global audience.
          </p>
        </div>
        <div className="about-content">
          <h2>Our Team</h2>
          <p>
            We are a passionate group of book lovers, developers, and creatives dedicated to building an intuitive and reliable platform. Our team is driven by a shared vision of making literature accessible to everyone, no matter where they are.
          </p>
        </div>
      </section>
      <section className="about-footer">
        <p>&copy; 2025 Online Library. All rights reserved.</p>
      </section>
    </div>
  );
};

export default About;
