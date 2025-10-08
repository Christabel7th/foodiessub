import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import CheckoutButton from "../components/CheckoutButton";
import { auth } from "../firebase"; 
import { onAuthStateChanged } from "firebase/auth";
const Home = () => {
  const foods = [
    { id: 1, name: "Soup Bowls", img: "/images/Soupbowl.png" },
    { id: 2, name: "Breakfast", img: "/images/breakfast.avif" },
    { id: 3, name: "Lunch", img: "/images/lunch.jpg" },
    { id: 4, name: "Fresh", img: "/images/fresh.avif" },
  ];

  const [current, setCurrent] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const nextFood = () => {
    setCurrent((prev) => (prev + 1) % foods.length);
  };

  const prevFood = () => {
    setCurrent((prev) => (prev - 1 + foods.length) % foods.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % foods.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [foods.length]);

  return (
    <div className="hero-page">
      <section className="hero">
        <div className="hero-content">
          <Logo />
          <p>Fresh Meals, Delivered Fast</p>
          {user ? (
            <button onClick={() => navigate("/menu")}>ORDER NOW</button>
          ) : (
            <Link to="/signin">
              <button>ORDER NOW</button>
            </Link>
          )}
        </div>
        <div className="hero-content2">
  <div className="hero-content2-inner">
    <img
      src={foods[current].img}
      alt={foods[current].name}
      className="food-img"
    />
    <h3>{foods[current].name}</h3>

    <div className="nav-buttons">
      <button onClick={prevFood}>◀</button>
      <button onClick={nextFood}>▶</button>
    </div>
  </div>

  {user ? (
    <div className="order-now-div">
      <button  onClick={() => navigate("/menu")}>ORDER NOW</button>
    </div>
  ) : (
    <div className="signs">
      <Link to="/signin">
        <button>SIGN IN</button>
      </Link>
      <p className="signs-p">
        Don't have an account???...... <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )}
</div>
      </section>

      <section className="about-us">
        <div className="about">
          <h2>About Us</h2>
          <p>
            Order food online in Nigeria using <Logo /> we serve freshly cooked meals
            with love. Whether you’re craving authentic local dishes or exploring flavorful continental favorites, we’ve got something to delight your taste bud. Our goal is simple — to serve delicious dishes made from quality ingredients, cooked fresh, prepared with care and passion, served with creativity, and delivered with love.
          </p>
        </div>
        <div className="why-us">
          <h2>Why Choose Us?</h2>
          <div className="why-us-div">
          <div>
            <img src="/images/time.jpg" alt="" />
              <div>
              <h3>Fast & Reliable</h3>
            <p>
            Whether delivery or pickup, we make sure your order arrives hot, fresh, and on time.
            </p>
            </div>
            </div>
            <div>
            <img src="/images/customers.jpg" alt="" />
              <div>
              <h3>Customers Satisfaction</h3>
            <p>
            Whether delivery or pickup, we make sure your order arrives hot, fresh, and on time.
            </p>
            </div>
            </div>
            <div>
            <img src="/images/time.jpg" alt="" />
              <div>
              <h3>Hygiene & Safety First</h3>
            <p>
            Whether delivery or pickup, we make sure your order arrives hot, fresh, and on time.
            </p>
            </div>
            </div>
            <div>
            <img src="/images/time.jpg" alt="" />
           <div> <h3>Affordable & Worth It</h3>
            <p>
            Whether delivery or pickup, we make sure your order arrives hot, fresh, and on time.
            </p></div>
          </div>
          <div>
            <img src="/images/freshfood.avif" alt="" />
              <div>
              <h3>
            Fresh Ingredients, Always
            </h3>
            <p>
            We use only the freshest produce, meats, and spices — every meal is packed with natural flavor
            </p>
            </div>
          </div>
          </div>
        </div>
      </section>
      <CheckoutButton />
    </div>
  );
};

export default Home;