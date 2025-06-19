import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [eroare, setEroare] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMesaj("");
    setEroare("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMesaj("Email de resetare trimis cu succes!");
    } catch (err) {
      setEroare("Eroare: " + err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Resetare parolă</h2>
      <form onSubmit={handleReset} className="signup-form">
        <label>Adresa ta de email:</label>
        <input
          type="email"
          value={email}
          placeholder="exemplu@email.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Trimite link de resetare</button>
        {mesaj && <p style={{ color: "green" }}>{mesaj}</p>}
        {eroare && <p className="signup-error">{eroare}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
