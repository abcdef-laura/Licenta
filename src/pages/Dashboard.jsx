// src/pages/Dashboard.jsx
import React from "react";
import { auth } from "../firebase";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>You are logged in as: {auth.currentUser?.email}</p>
      <button onClick={() => auth.signOut()}>Log Out</button>
    </div>
  );
}

export default Dashboard;
