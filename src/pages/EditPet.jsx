// src/pages/EditPet.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", type: "", location: "", description: "", animalStatus: ""
  });

  useEffect(() => {
    const fetchPet = async () => {
      const docRef = doc(db, "pets", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setForm(snap.data());
      } else {
        alert("Anunțul nu a fost găsit.");
        navigate("/");
      }
    };
    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "pets", id), form);
    alert("Anunțul a fost actualizat!");
    navigate("/my-pets");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Editează anunțul</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} required />
        <input name="type" value={form.type} onChange={handleChange} />
        <input name="location" value={form.location} onChange={handleChange} />
        <textarea name="description" value={form.description} onChange={handleChange} />
        <select name="animalStatus" value={form.animalStatus} onChange={handleChange}>
          <option value="pierdut">Pierdut</option>
          <option value="gasit">Găsit</option>
        </select>
        <button type="submit">Salvează modificările</button>
      </form>
    </div>
  );
}

export default EditPet;
