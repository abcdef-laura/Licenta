// src/pages/AddPet.jsx
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import "../styles/AddPet.css";

function AddPet() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();

  const [name, setName] = useState("");
  const [type, setType] = useState("Câine");
  const [location, setLocation] = useState("");
  const [animalStatus, setAnimalStatus] = useState("pierdut");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const geocodeLocation = async (location) => {
    const apiKey = "AIzaSyBWhTiqScPBXqN9p-KsZtb_D5nBfcCPk-A"; // înlocuiește cu cheia ta
    const encodedLocation = encodeURIComponent(location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error("Locația nu a putut fi geocodificată.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
  
    console.log("Formular trimis!");
  
    // 1. Geocodificăm locația (indiferent dacă există imagine sau nu)
    let coordinates = null;
    try {
      coordinates = await geocodeLocation(location);
    } catch (err) {
      alert("Locația este invalidă sau nu poate fi convertită.");
      return;
    }

    let imageUrl = "";

    if (imageFile) {
      try {
        const imageRef = ref(storage, `pets/${Date.now()}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      } catch (err) {
        console.error("🔥 Upload error:", err); // 👈 vezi eroarea exactă în consolă
        alert("Imaginea nu a putut fi încărcată.");
        return;
      }
    }

    try {
      await addDoc(collection(db, "pets"), {
        name,
        type,
        location,
        animalStatus,
        description,
        imageUrl,
        createdAt: serverTimestamp(),
        userId: user.uid,
        coordinates,
      });
      alert("Animalul a fost adăugat cu succes!");
      navigate("/");
    } catch (err) {
      console.error("Eroare la salvare:", err);
      alert("Ceva nu a mers. Încearcă din nou.");
    }
  };

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Trebuie să fii autentificat pentru a adăuga un animal.</h2>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  }

  return (
    <div className="add-pet-container">
      <h2>Adaugă un animal pierdut/găsit</h2>
      <form onSubmit={handleSubmit} className="add-pet-form">
        <label>Nume:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Tip:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Câine">Câine</option>
          <option value="Pisică">Pisică</option>
        </select>

        <label>Locație aproximativă:</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} required />

        <label>Status:</label>
        <select value={animalStatus} onChange={(e) => setAnimalStatus(e.target.value)}>
          <option value="pierdut">Pierdut</option>
          <option value="gasit">Găsit</option>
        </select>

        <label>Descriere (opțional):</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          placeholder="Detalii despre animal, comportament, rasă etc."
        />

        <label>Imagine (opțional):</label>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit">Adaugă</button>
      </form>
    </div>
  );
}

export default AddPet;
