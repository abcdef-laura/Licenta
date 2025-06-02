import React from "react";
import "../styles/Hero.css";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


function AnimalCard({ id, name, type, location, image, description, editable = false }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
      const confirm = window.confirm("Ești sigur că vrei să ștergi acest anunț?");
      if (confirm) {
        try {
          await deleteDoc(doc(db, "pets", id));
          alert("Anunț șters cu succes!");
          window.location.reload();
        } catch (err) {
          console.error("Eroare la ștergere:", err);
          alert("A apărut o eroare la ștergere.");
        }
      }
    };
    return (
    <div className="animal-card">
      {image ? (
        <img src={image} alt={name} className="animal-image" />
      ) : (
        <img src="https://place-puppy.com/300x180" alt="placeholder" className="animal-image" />
      )}

      <div className="animal-info">
        <h3>{name} ({type})</h3>
        <p><strong>Locație:</strong> {location}</p>

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
        {editable && (
            <div className="card-buttons">
            <button onClick={() => navigate(`/edit-pet/${id}`)}>Editează</button>
            <button onClick={handleDelete}>🗑️ Șterge</button>
            </div>
        )}
      </div>
    </div>
  );
}

export default AnimalCard;
