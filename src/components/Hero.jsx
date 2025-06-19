import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import AnimalCard from "./AnimalCard";
import "../styles/Hero.css";
import Map from "./Map";

function Hero() {
  const db = getFirestore();
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);

  const [filters, setFilters] = useState({
    type: "",
    city: "",
    animalStatus: "",
  });

  function parseCoordinates(value) {
    if (typeof value === "string") {
      const [lat, lng] = value.split(",").map(Number);
      return { lat, lng };
    }
    return value;
  }

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const q = query(
          collection(db, "pets"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPets(data);
        setFilteredPets(data);
      } catch (err) {
        console.error("Eroare la încărcarea anunțurilor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const applyFilters = () => {
    const filtered = pets.filter(
      (pet) =>
        (filters.type === "" || pet.type === filters.type) &&
        (filters.city === "" || pet.city === filters.city) &&
        (filters.animalStatus === "" || pet.animalStatus === filters.animalStatus)
    );
    setFilteredPets(filtered);
    setSelectedPet(null);
  };

  const markers = filteredPets
    .filter((pet) => {
      const coords = parseCoordinates(pet.coordinates);
      return coords && typeof coords.lat === "number" && typeof coords.lng === "number";
    })
    .map((pet) => ({
      ...pet,
      position: parseCoordinates(pet.coordinates),
    }));

  return (
    <section className="hero-section">
      <h1 className="hero-title">Ajută-ne să găsim animalele pierdute</h1>

      <div className="hero-button">
        <Link to="/add-pet">+ Adaugă un animal</Link>
      </div>
      
      <div className="filter-container">
        <h3>Filtrează anunțurile:</h3><br></br>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Toate tipurile</option>
            <option value="câine">Câine</option>
            <option value="pisică">Pisică</option>
          </select>

          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            <option value="">Toate orașele</option>
            {Array.from(new Set(pets.map((p) => p.city).filter(Boolean))).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={filters.animalStatus}
            onChange={(e) => setFilters({ ...filters, animalStatus: e.target.value })}
          >
            <option value="">Toate statusurile</option>
            <option value="pierdut">Pierdut</option>
            <option value="găsit">Găsit</option>
          </select>

          <button onClick={applyFilters}>Filtrează</button>
      </div>



      <div className="map-container">
        <Map
          markers={markers}
          selectedPet={selectedPet}
          onMarkerClick={(pet) => setSelectedPet(pet)}
        />
      </div>

      {/* <h2 className="sub-title">Ultimele anunțuri adăugate</h2> */}

      {/* {loading ? (
        <p>Se încarcă anunțurile...</p>
      ) : (
        <div className="animal-list">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              onClick={() =>
                setSelectedPet({
                  ...pet,
                  position: parseCoordinates(pet.coordinates),
                })
              }
            >
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
      )} */}
    </section>
  );
}

export default Hero;