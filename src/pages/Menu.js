import React, { useState } from "react";
import CheckoutButton from "../components/CheckoutButton";



const menuData = {
  
  breakfast: [
    { name: "Pancakes & Syrup", desc: "Lorem ipsum, dolor sit amet ", price: "600", img: "/images/pancake.avif" },
    { name: "Coffee & Donuts", price: "500", img: "/images/coffee.jpg" },
    { name: "Pancakes & Syrup", desc: "Lorem ipsum, dolor sit amet ", price: "600", img: "/images/pancake.avif" },
    { name: "Coffee & Donuts", price: "500", img: "/images/coffee.jpg" },
    { name: "Pancakes & Syrup", desc: "Lorem ipsum, dolor sit amet ", price: "600", img: "/images/pancake.avif" },
    { name: "Coffee & Donuts", price: "500", img: "/images/coffee.jpg" },
  ],
  lunch: [
    { name: "Jollof Rice & Chicken", price: "4000", img: "/images/lunch.jpg" },
    { name: "Fried Rice Special", price: "11000", img: "/images/friedrice.jpg" },
    { name: "Burger & Fries", price: "700", img: "/images/burger.jpg" },
    { name: "Spaghetti Bolognese", price: "45000", img: "/images/spaghetti.jpg" },
    { name: "Beef Shawarma", price: "800", img: "/images/shawarma.jpg" },
    { name: "Grilled Chicken Wrap", price: "4000", img: "/images/wrap.jpg" },
  ],
  soupBowls: [
    { name: "Egusi Soup & Pounded Yam", price: "120000", img: "/images/egusi.jpg" },
    { name: "Afang Soup & Garri", price: "4000", img: "/images/afang.jpg" },
    { name: "Okra Soup & Semovita", price: "4500", img: "/images/okra.jpg" },
    { name: "Oha Soup & Fufu", price: "10000", img: "/images/oha.jpg" },
    { name: "Banga Soup & Starch", price: "120000", img: "/images/banga.jpg" },
    { name: "Efo Riro & Rice", price: "4000", img: "/images/efo.jpg" },
  ],
  freshFood: [
    { name: "Grilled Chicken Salad", price: "4500", img: "/images/salad.jpg" },
    { name: "Fruit Bowl", price: "600", img: "/images/fruitbowl.jpg" },
    { name: "Avocado Toast", price: "700", img: "/images/avocado.jpg" },
    { name: "Vegetable Stir-fry", price: "800", img: "/images/veggies.jpg" },
    { name: "Smoothie Combo", price: "600", img: "/images/smoothie.jpg" },
    { name: "Fresh Juice", price: "4500", img: "/images/tunasalad.jpg" },
  ],
  noodles: [
    { name: "Stir-Fried Noodles & Veggies", price: "2000", img: "/images/noodles1.jpg" },
    { name: "Chicken Noodles Special", price: "7500", img: "/images/noodles2.jpg" },
    { name: "Seafood Noodles", price: "5000", img: "/images/noodles3.jpg" },
    { name: "Egg Noodles", price: "700", img: "/images/noodles4.jpg" },
    { name: "Hot Spicy Noodles", price: "800", img: "/images/noodles5.jpg" },
    { name: "Beef Noodles Deluxe", price: "4000", img: "/images/noodles6.jpg" },
  ],
};

const bubbleImages = [ 
  "/images/soupbowl.png",
  "/images/soupbowl.png",
  "/images/breakfast.avif",
  "/images/fresh.avif",
  "/images/fresh.avif",
  "/images/fresh.avif",
  "/images/fresh.avif",
  "/images/fresh.avif",
  "/images/lunch.jpg",
];

const Menu = () => {
  const [expanded, setExpanded] = useState({});

  const toggleCategory = (category) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

    // Add to cart handler
    const handleAddToCart = (item) => {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      localStorage.setItem("cart", JSON.stringify([...existingCart, item]));
      alert(`${item.name} added to cart!`);
    }

  return (
    <section className="menu">
      <div className="menu-div">

        {bubbleImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="food bubble"
            className={`food-bubble float-${i + 1}`}
          />
        ))}
      </div>

      {Object.keys(menuData).map((categoryKey) => {
        const categoryItems = menuData[categoryKey];
        const isExpanded = expanded[categoryKey];
        const visibleItems = isExpanded ? categoryItems : categoryItems.slice(0, 3);

        const title = categoryKey
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());

        return (
          <div key={categoryKey} className="menu-category">
            <h3>{title}</h3>
            <div className="menu-grid fixed-three">
              {visibleItems.map((item, index) => (
                <div key={index} className="menu-card">
                   <img src={item.img} alt={item.name} className="menu-img" />
                  <h4>{item.name}</h4>
                  <h5>{item.desc }</h5>
                  <p>{item.price}</p>
                  <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
              ))}
            </div>
            {categoryItems.length > 3 && (
              <button
                className="load-more-btn"
                onClick={() => toggleCategory(categoryKey)}
              >
                {isExpanded ? "Show Less...." : "More...."}
              </button>
            )}
          </div>
        );
      })}
      <CheckoutButton />
    </section>
  );
};

export default Menu;