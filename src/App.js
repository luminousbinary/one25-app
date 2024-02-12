import './App.css';
import Accordian from './components/accordian';
import RandomColor from './components/random-color';
import StarRating from './components/star-rating';

function App() {
  return (
    <div className="App">
     {/* accordian components */}
     {/* <Accordian/> */}
     {/* random color components */}
     {/* <RandomColor/> */}
     {/* Star ratng component*/}
     <StarRating noOfStars={10}/>
    </div>
  );
}

export default App;
