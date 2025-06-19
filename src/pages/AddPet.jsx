// import React, { useState, useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import {
//   getStorage,
//   ref,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";
// import MapWithMarker from "../components/MapWithMarker";
// import "../styles/AddPet.css";

// function AddPet() {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();
//   const db = getFirestore();
//   const storage = getStorage();

//   const [name, setName] = useState("");
//   const [type, setType] = useState("câine");
//   const [location, setLocation] = useState("");
//   const [city, setCity] = useState("");
//   const [animalStatus, setAnimalStatus] = useState("pierdut");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [coordinates, setCoordinates] = useState({ lat: 45.9432, lng: 24.9668 });
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const geocodeLocation = async (location) => {
//     const apiKey = "AIzaSyBWhTiqScPBXqN9p-KsZtb_D5nBfcCPk-A";
//     const encodedLocation = encodeURIComponent(location);
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status === "OK") {
//       const { lat, lng } = data.results[0].geometry.location;
//       setCoordinates({ lat, lng });
//       return { lat, lng };
//     } else {
//       throw new Error("Locația nu a putut fi geocodificată.");
//     }
//   };

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (location.length > 3) {
//         geocodeLocation(location).catch(() => {
//           console.warn("Locația nu a putut fi convertită în coordonate.");
//         });
//               }
//     }, 600);
//     return () => clearTimeout(delayDebounce);
//   }, [location]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return;

//     if (!coordinates) {
//       alert("Locația nu este validă. Nu putem seta coordonatele.");
//       return;
//     }

//     let imageUrl = "";
//     if (imageFile) {
//       try {
//         const imageRef = ref(storage, `pets/${Date.now()}-${imageFile.name}`);
//         await uploadBytes(imageRef, imageFile);
//         imageUrl = await getDownloadURL(imageRef);
//       } catch (err) {
//         console.error("Upload error:", err);
//         alert("Imaginea nu a putut fi încărcată.");
//         return;
//       }
//     }

//     try {
//       await addDoc(collection(db, "pets"), {
//         name,
//         type,
//         location,
//         city,
//         animalStatus,
//         description,
//         phoneNumber,
//         imageUrl,
//         createdAt: serverTimestamp(),
//         userId: user.uid,
//         coordinates,
//       });
//       alert("Animalul a fost adăugat cu succes!");
//       navigate("/");
//     } catch (err) {
//       console.error("Eroare la salvare:", err);
//       alert("Ceva nu a mers. Încearcă din nou.");
//     }
//   };

//   if (!user) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center" }}>
//         <h2>Trebuie să fii autentificat pentru a adăuga un animal.</h2>
//         <button onClick={() => navigate("/login")}>Login</button>
//       </div>
//     );
//   }

//   return (
//     <div className="add-pet-container">
//       <h2>Adaugă un animal pierdut/găsit</h2>
     
//       <form onSubmit={handleSubmit} className="add-pet-form">
//         <label>Nume:</label>
//         <input value={name} onChange={(e) => setName(e.target.value)} required />

//         <label>Tip:</label>
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="câine">Câine</option>
//           <option value="pisică">Pisică</option>
//         </select>

//         <label>Oraș:</label>
//         <input value={city} onChange={(e) => setCity(e.target.value)} required />

//         <label>Locație aproximativă:</label>
//         <input value={location} onChange={(e) => setLocation(e.target.value)} required />

//         {coordinates && coordinates.lat && coordinates.lng && (
//           <div className="map-container-wrapper">
//             <MapWithMarker
//               position={coordinates}
//               onMapClick={(coords) => setCoordinates(coords)}
//               onLocationResolved={(addr) => setLocation(addr)}
//             />
//           </div>
//         )}
        

//         <label>Status:</label>
//         <select value={animalStatus} onChange={(e) => setAnimalStatus(e.target.value)}>
//           <option value="pierdut">Pierdut</option>
//           <option value="găsit">Găsit</option>
//         </select>

//         <label>Descriere (opțional):</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           rows="3"
//           placeholder="Detalii despre animal, comportament, rasă etc."
//         />
//         <label>Număr de telefon</label>
//       <input
//         type="tel"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//         placeholder="07xxxxxxxx"
//         required
//       />


//         <label>Imagine (opțional):</label>
//         <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

//         <button type="submit">Adaugă</button>
//       </form>
//     </div>
//   );
// }

// export default AddPet;
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import ReCAPTCHA from "react-google-recaptcha";
import MapWithMarker from "../components/MapWithMarker";
import "../styles/AddPet.css";

function AddPet() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();

  const [name, setName] = useState("");
  const [type, setType] = useState("câine");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [animalStatus, setAnimalStatus] = useState("pierdut");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const geocodeLocation = async (location) => {
    const apiKey = "AIzaSyBWhTiqScPBXqN9p-KsZtb_D5nBfcCPk-A";
    const encodedLocation = encodeURIComponent(location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      setCoordinates({ lat, lng });
      return { lat, lng };
    } else {
      throw new Error("Locația nu a putut fi geocodificată.");
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (location.length > 3) {
        geocodeLocation(location).catch(() => setCoordinates(null));
      }
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!coordinates) return alert("Coordonatele nu sunt definite.");
    if (!phone || !email) return alert("Telefonul și emailul sunt obligatorii.");
    if (!agreed) return alert("Trebuie să fii de acord cu afișarea datelor de contact.");
    if (!captchaVerified) return alert("Confirmă că nu ești robot.");

    let imageUrl = "";
    if (imageFile) {
      try {
        const imageRef = ref(storage, `pets/${Date.now()}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      } catch (err) {
        console.error("Upload error:", err);
        return alert("Imaginea nu a putut fi încărcată.");
      }
    }

    try {
      await addDoc(collection(db, "pets"), {
        name,
        type,
        location,
        city,
        animalStatus,
        description,
        phone,
        email,
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
          <option value="câine">Câine</option>
          <option value="pisică">Pisică</option>
        </select>

        <label>Oraș:</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} required />

        <label>Locație aproximativă:</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} required />

        {coordinates && (
  <div style={{ height: "300px", marginTop: "1rem" }}>
    <MapWithMarker
      position={coordinates}
      onMapClick={(coords) => setCoordinates(coords)}
      onLocationResolved={(addr) => setLocation(addr)}
    />
  </div>
)}


        <label>Status:</label>
        <select value={animalStatus} onChange={(e) => setAnimalStatus(e.target.value)}>
          <option value="pierdut">Pierdut</option>
          <option value="găsit">Găsit</option>
        </select>

        <label>Telefon:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Descriere (opțional):</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          placeholder="Detalii despre animal, comportament, rasă etc."
        />

        <label>Imagine (opțional):</label>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

        <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "1rem" }}>
          <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} required />
          Sunt de acord ca datele mele de contact să fie afișate public pe site
        </label>

        <div style={{ marginTop: "1rem" }}>
          <ReCAPTCHA
            sitekey="6LdymWErAAAAAFyAmieitbPXhMuMXD0AeH63Yjyg"
            onChange={() => setCaptchaVerified(true)}
          />
        </div>

        <button type="submit" style={{ marginTop: "1.5rem" }}>Adaugă</button>
      </form>
    </div>
  );
}

export default AddPet;
