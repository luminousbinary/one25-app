import { useEffect, useState } from "react";
import "./rand-color.css";

// #123456
// rgb(12,34,56)

export default function RandomColor() {
  // create a variable to store the current type (rgb or hex) and aother to store the current ccolor
  const [colorType, setColorType] = useState("hex");
  const [currentColor, setCurrentColor] = useState("#000000");

  function randColorUtil(length) {
    return Math.floor(Math.random() * length);
  }

  //   function to handle Generating a random color
  function handleGenerateRandomHexColor() {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randColorUtil(hex.length)];
    }
    // console.log(hexColor);

    setCurrentColor(hexColor);
  }

  function handleGenerateRandomRgbColor() {
    const r = randColorUtil(256);
    const g = randColorUtil(256);
    const b = randColorUtil(256);

    setCurrentColor(`rgb(${r},${g},${b})`);
  }

  useEffect(() => {
    if (colorType === "rgb") {
      handleGenerateRandomRgbColor();
    } else {
      handleGenerateRandomHexColor();
    }
  }, [colorType]);

  return (
    <div className="wrapper-contaner" style={{ background: currentColor }}>
      <div>Random Color Generator</div>

      <button onClick={() => setColorType("rgb")}>Create RGB Colors</button>
      <button onClick={() => setColorType("hex")}>Create Hex Colors</button>
      <button
        onClick={
          colorType === "hex"
            ? handleGenerateRandomHexColor
            : handleGenerateRandomRgbColor
        }
      >
        Generate Random Color
      </button>

      <div className="current-color">
        <h3>{colorType === "rgb" ? "RGB Color " : " HEX Color"}</h3>
        <p>{currentColor}</p>
      </div>
    </div>
  );
}
