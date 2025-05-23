// src/pages/About.jsx
import React from "react";
import "../styles/About.css"; // stiluri personalizate (opțional)

function About() {
  return (
    <div className="about-container">
      <h1>Despre FindMyPet</h1>
      <p>
        FindMyPet este o platformă dedicată ajutorării persoanelor care și-au pierdut animalul de companie
        sau care au găsit un animal și doresc să-i găsească stăpânul.
      </p>
      
      <h2>Misiunea noastră</h2>
      <p>
        Misiunea noastră este să conectăm rapid și eficient oamenii cu animalele pierdute sau găsite,
        printr-o platformă simplă, accesibilă și centrată pe comunitate.
      </p>

      <h2>Ce poți face pe FindMyPet?</h2>
      <ul>
        <li>📌 Postezi un animal pierdut sau găsit</li>
        <li>🔍 Cauți înregistrări din zona ta</li>
        <li>📷 Încarci imagini și descrieri utile</li>
        <li>📞 Contactezi rapid utilizatorii pentru a oferi ajutor</li>
      </ul>

      <h2>Cum funcționează?</h2>
      <p>
        Aplicația permite utilizatorilor autentificați să adauge anunțuri cu detalii despre animale.
        Toate informațiile sunt stocate în Firebase Firestore, iar imaginile sunt salvate în Firebase Storage.
      </p>

      <h2>Contact</h2>
      <p>
        Pentru sugestii, întrebări sau feedback, ne poți scrie la: <br />
        <strong>contact@findmypet.ro</strong>
      </p>
    </div>
  );
}

export default About;
