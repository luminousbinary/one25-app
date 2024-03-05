import { useEffect, useState } from "react";
import "./load-more.css";

export default function LoadMoreData({ url }) {
  // this is a state to display current data and set new data to display
  const [currentData, setCurrentData] = useState([]);

  // loading when data is being fetched
  const [loading, setLoading] = useState(false);

  //   this is a state to handle the next incominf data
  const [nextData, setNextData] = useState(0);

  // this is to handle error
  const [errMessage, setErrMessage] = useState(null);

  // a dunction to fetch url while other parts of the app load/render
  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const res = await fetch(`${getUrl}?skip=${nextData===0? 0: nextData }&limit=10`);
      let data = await res.json();

      // return data
      if (data) {
        setCurrentData(data.products);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setErrMessage(err.errMessage);
    }
  }

  function handleGetMoreData() {
    setNextData(nextData === 90 ? 0 : nextData +10);
    console.log(nextData);
  }

//   use effect will check f the balue of nwxt data changesd then execute 
  useEffect(() => {
    if (currentData !== "") fetchData(url);
  }, [nextData]);


  if(errMessage){
    return <div>There was ana error {errMessage}</div>
  }

  if (loading){
    return <div>Data loading... Please wat</div>
  }

  return (
    <div className="loaded-data-wrapper">
      <div>Load More Data</div>

      <div className="loaded-data" >
        {currentData && currentData.length
          ? currentData.map((productItem) => (
              <div className="product-item" key={productItem.id}>
                <div className="product-image">
                  <img
                    src={productItem.images[0]}
                    alt={productItem.thumbnail}
                    width={"100px"}
                    height={"100px"}
                  />
                </div>
                <div className="product-title">{productItem.title}</div>
              </div>
            ))
          : null}

        
      </div><button className="load-more-btn" onClick={() => handleGetMoreData()}>Get more data</button>
    </div>
  );
}


// // // 
// //
// try anohter but instaad fo just koadnf new screen let t load all the next data on the same screen