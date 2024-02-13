import "./App.css";
import Accordian from "./components/accordian";
import ImageSlider from "./components/image-slider";
import LoadMoreData from "./components/load-more-data";
import QrCodeGenerator from "./components/qr-code-generator";
import RandomColor from "./components/random-color";
import StarRating from "./components/star-rating";
import TreeView from "./components/tree-view";
import menus from "./components/tree-view/data";

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
      {/* <ImageSlider url={"https://picsum.photos/v2/list"} limit={8} page={2}/> */}

      {/* load more data component */}
      {/* <LoadMoreData url={'https://dummyjson.com/products'}/> */}

      {/* a tree view list menu item // tree view componemnt // navigation menu*/}
      {/* <TreeView menus={menus} /> */}

      {/* QR code generator component */}
      <QrCodeGenerator/>
    </div>
  );
}

export default App;
