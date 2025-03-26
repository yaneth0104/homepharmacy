import React, { useEffect, useState } from "react";
import "../styles/title.css";

const AnimatedTitle = () => {
  const [color, setColor] = useState("blue");

  useEffect(() => {
    const colors = ["blue", "red", "green", "purple", "orange"];
    let index = 0;

    const interval = setInterval(() => {
      setColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 1000); // Cambia de color cada segundo

    return () => clearInterval(interval);
  }, []);

  return <h1 className="animated-title" style={{ color }}>HomePharmacy</h1>;
};

export default AnimatedTitle;
