import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [eroare, setEroare] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setEroare(""); // resetare erori

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, parola);
      const user = userCredential.user;

      // Salvăm în Firestore cu rolul de bază
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // Poți schimba în "admin" dacă vrei tu
      });

      navigate("/dashboard");
    } catch (error) {
      setEroare("Eroare: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Înregistrare cont nou</h2>

      <form onSubmit={handleSignUp} className="signup-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplu@email.com"
          required
        />

        <label>Parolă:</label>
        <input
          type="password"
          value={parola}
          onChange={(e) => setParola(e.target.value)}
          placeholder="Parola ta"
          required
        />

        <button type="submit">Creează cont</button>

        {eroare && <p className="signup-error">{eroare}</p>}
      </form>
    </div>
  );
}

export default SignUp;
