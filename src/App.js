import "./App.css";
import Accordian from "./components/accordian";
import ImageSlider from "./components/image-slider";
import RandomColor from "./components/random-color";
import StarRating from "./components/star-rating";

function App() {
  return (
    <div className="App">
      {/* accordian components */}
      {/* <Accordian/> */}

      {/* random color components */}
      {/* <RandomColor/> */}

      {/* Star ratng components*/}
      {/* <StarRating noOfStars={10}/> */}

      {/* Image Slider Components */}
      <ImageSlider url={"https://picsum.photos/v2/list"} limit={8} page={2}/>
    </div>
  );
}

export default App;
