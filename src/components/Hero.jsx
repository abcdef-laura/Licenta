import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import AnimalCard from "./AnimalCard";
import "../styles/Hero.css";
import Map from "./Map";


function Hero() {
  const db = getFirestore();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  function parseLocation(locationStr) {
    // exemplu: "44.4268,26.1025"
    const [lat, lng] = locationStr.split(",").map(Number);
    return { lat, lng };
  }

  const markers = pets
  .filter((pet) => pet.coordinates)
  .map((pet) => ({
    ...pet, // toate datele: name, type, image, etc.
    position: pet.coordinates,
  }));


  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const q = query(collection(db, "pets"), orderBy("createdAt", "desc"), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPets(data);
      } catch (err) {
        console.error("Eroare la încărcarea anunțurilor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);


  return (
    <section className="hero-section">
      <h1 className="hero-title">Ajută-ne să găsim animalele pierdute 🐶</h1>

      <div className="hero-button">
        <Link to="/add-pet">+ Adaugă un animal</Link>
      </div>

      <div className="map-container">
      <Map
        markers={markers}
        selectedPet={selectedPet}
        onMarkerClick={(pet) => setSelectedPet(pet)}
      />
      </div>


      <h2 className="sub-title">Ultimele anunțuri</h2>

      {loading ? (
        <p>Se încarcă anunțurile...</p>
      ) : (
<div className="animal-list">
  {pets.map((pet) => (
    <div key={pet.id} onClick={() => setSelectedPet({
      ...pet,
      position: pet.coordinates, // 👈 esențial pentru hartă
    })}>
      <AnimalCard
        name={pet.name}
        type={pet.type}
        location={pet.location}
        description={pet.description}
        image={pet.imageUrl}
      />
    </div>
  ))}
</div>


      )}
    </section>
  );
}

export default Hero;
