import "./App.css";
import Accordian from "./components/accordian";
import ModalTest from "./components/custom-modal/modal-test";
import TabTest from "./components/custom-tabs/tab-test";
import DarkLightMode from "./components/dark-light-mode";
import ImageSlider from "./components/image-slider";
import LoadMoreData from "./components/load-more-data";
import QrCodeGenerator from "./components/qr-code-generator";
import RandomColor from "./components/random-color";
import ScrollIndcator from "./components/scroll-indicator";
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
      {/* <QrCodeGenerator/> */}

      {/* light to dark mode component and vice versa */}
      {/* <DarkLightMode /> */}

      {/* scroll indicator component  */}
      {/* <ScrollIndcator url={'https://dummyjson.com/products?limit=99'} /> */}
      
      {/* current tab changes component*/}
      {/* <TabTest /> */}

      {/* show modal compponent  */}
      <ModalTest />

    </div>
  );
}

export default App;
