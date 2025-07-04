import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import AnimalCard from "../components/AnimalCard";
import "../styles/MyPets.css";

function MyPets() {
  const [user] = useAuthState(auth);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyPets = async () => {
      const q = query(collection(db, "pets"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPets(data);
    };

    fetchMyPets();
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Anunțurile mele</h2>
      {pets.length === 0 ? (
        <p>Nu ai adăugat niciun animal.</p>
      ) : (
        <div className="animal-list">
            {pets.map((pet) => (
          <AnimalCard key={pet.id} image={pet.imageUrl} {...pet} editable />
          
        ))}
        </div>
      )}
    </div>
  );
}

export default MyPets;
