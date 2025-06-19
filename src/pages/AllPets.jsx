import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import AnimalCard from "../components/AnimalCard";
import MapWithMarker from "../components/MapWithMarker";
import "../styles/AllPets.css";

function parseCoordinates(value) {
  if (typeof value === "string") {
    const [lat, lng] = value.split(",").map(Number);
    return { lat, lng };
  }
  return value;
}

function AllPets() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    animalStatus: "",
  });
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const q = query(collection(db, "pets"), orderBy("createdAt", "desc"));
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

  const mapPosition =
    selectedPet?.coordinates && parseCoordinates(selectedPet.coordinates)
      ? parseCoordinates(selectedPet.coordinates)
      : { lat: 45.9432, lng: 24.9668 }; // fallback România

  return (
    <div className="allpets-container">
      <div className="left-column">
        <div className="filters">
          <h3>Filtrează:</h3>
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
            onChange={(e) =>
              setFilters({ ...filters, animalStatus: e.target.value })
            }
          >
            <option value="">Toate statusurile</option>
            <option value="pierdut">Pierdut</option>
            <option value="găsit">Găsit</option>
          </select>

          <button onClick={applyFilters}>Filtrează</button>
        </div>

        {loading ? (
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
                <AnimalCard  image={pet.imageUrl} {...pet} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="right-column">
        <MapWithMarker
          position={mapPosition}
          onMapClick={() => {}}
          onLocationResolved={() => {}}
        />
      </div>
    </div>
  );
}

export default AllPets;
