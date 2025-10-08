import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    return () => unsubscribe();
  }, []);

 
  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

 
  const handleIncrease = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const handleDecrease = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1); 
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="main-profile-page">
      <div className="profile-page">
      {user ? (
        <>
          <section className="user-display">
            <h2>
              <strong>Name:</strong> {user.displayName || "Foodie"}
            </h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>User ID:</strong> {user.uid}
            </p>
           
          </section>

          <section className="your-cart">
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>
                Your cart is empty. <Link to="/menu">Add something....</Link>
              </p>
            ) : (
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.img} alt={item.name} className="cart-img" />
                    <div>
                      <h4>{item.name}</h4>
                      <p className="cart-item-p">₦{(Number(item.price) * (item.quantity || 1)).toLocaleString()}</p>
                    </div>

                    <div className="quantity-control">
                      <button onClick={() => handleDecrease(index)}>-</button>
                      <p>{item.quantity || 1}</p>
                      <button onClick={() => handleIncrease(index)}>+</button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="cart-total">
                <h3>Total: ₦{totalAmount.toLocaleString()}</h3>
              </div>
            )}
          </section>
        </>
      ) : (
        <div className="not-logged">
          <h2>You’re not logged in 😢</h2>
          <button className="login-btn" onClick={() => navigate("/signin")}>
            Sign In
          </button>
        </div>
      )}
      </div>
       <div>
              <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
            </div>
    </div>
  );
};

export default Profile;