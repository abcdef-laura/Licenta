import React from "react";
import "../styles/Hero.css"; // dacă ai stiluri aici

function AnimalCard({ name, type, location, image, description }) {
  return (
    <div className="animal-card">
      {/* Imaginea animalului */}
      {image ? (
        <img src={image} alt={name} className="animal-image" />
      ) : (
        <img src="https://place-puppy.com/300x180" alt="placeholder" className="animal-image" />
      )}

      {/* Informații despre animal */}
      <div className="animal-info">
        <h3>{name} ({type})</h3>
        <p><strong>Locație:</strong> {location}</p>

        {/* Descrierea apare doar dacă există */}
        {description && (
          <p className="animal-description">{description}</p>
        )}

        {/* {pets.map((pet) => (
        <div key={pet.id} onClick={() => setSelectedPet(pet)}>
            <AnimalCard
            name={pet.name}
            type={pet.type}
            location={pet.location}
            description={pet.description}
            image={pet.imageUrl}
            />
        </div>
        ))} */}


        <button>Vezi detalii</button>
      </div>
    </div>
  );
}

export default AnimalCard;
