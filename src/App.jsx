import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import AdoptADog from './pages/AdoptADog';
import AdoptACat from './pages/AdoptACat'; 
import Hero from './components/Hero';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import AddPet from './pages/AddPet';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [user, setUser] = useState(null);
useEffect(() => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
}, []);
  return (
    <Router>
      <Navbar  user={user} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/adopt-a-dog" element={<AdoptADog />} />
        <Route path="/adopt-a-cat" element={<AdoptACat />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/add-pet"
          element={
            <PrivateRoute user={user}>
              <AddPet user={user}/>
            </PrivateRoute>
          }
        />
        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
