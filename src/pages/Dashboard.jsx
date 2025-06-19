import React from "react";
import { auth } from "../firebase";

function Dashboard({ isAdmin }) {
    console.log("Este admin?", isAdmin);
  
    return (
      <div className="dashboard">
        <h2>Bine ai venit în dashboard!</h2>
  
        {isAdmin && (
          <div style={{
            backgroundColor: "#f3e9ff",
            padding: "1rem",
            marginTop: "1rem",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <h3 style={{ color: "#7a4db7" }}>⚙️ Panou administrator</h3>
            <p>Ai acces la funcționalități avansate.</p>
          </div>
        )}
      </div>
    );
  }
  
  

export default Dashboard;
