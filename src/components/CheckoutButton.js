import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const CheckoutButton = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Load cart
  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  // Listen for cart changes and user login status
  useEffect(() => {
    loadCart();
    window.addEventListener("storage", loadCart);

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener("storage", loadCart);
      unsubscribeAuth();
    };
  }, []);


  if (!user || cart.length === 0) return null;

  const randomTop = Math.floor(Math.random() * 80);
  const randomLeft = Math.floor(Math.random() * 80);

  return (
    <button
      onClick={() => navigate("/checkout")}
      style={{
        position: "fixed",
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        backgroundColor: "#28a745",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "8px",
        zIndex: 1000,
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
    >
      Pay Now 💳
    </button>
  );
};

export default CheckoutButton;