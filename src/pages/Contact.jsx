import React, { useState } from "react";
import emailjs from "emailjs-com";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const db = getFirestore();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //EmailJS send
    emailjs
      .send(
        "service_x2tncca",
        "template_tig2g2u",
        formData,
        "YIq1yN6vOipxS3Qki"
      )
      .then(() => {
        console.log("Email trimis cu succes!");
      })
      .catch((err) => {
        console.error("Eroare la trimiterea emailului:", err);
      });

    //Firestore save
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      alert("Mesajul a fost trimis!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Eroare la salvarea mesajului:", err);
      alert("A apărut o eroare la salvare.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contactează-ne</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Nume:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Subiect:</label>
        <input name="subject" value={formData.subject} onChange={handleChange} />

        <label>Mesaj:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required />

        <button type="submit">Trimite</button>
      </form>
    </div>
  );
}

export default Contact;
