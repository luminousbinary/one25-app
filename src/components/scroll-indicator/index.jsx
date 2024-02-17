import { useEffect, useState } from "react";

export default function ScrollIndcator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);

      const res = await fetch(getUrl);

      const data = await res.json();
      //   console.log(data.products);

      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);

      setErrMessage(err);
    }
  }

  function handleScrollPercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((howMuchScrolled / height) * 100);
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (errMessage) {
    return <div>There was ana error {errMessage}</div>;
  }

  if (loading) {
    return <div>Data loading... Please wat</div>;
  }

  console.log(data, scrollPercentage);

  return (
    <div className="scroll-indicator">
      <div className="other-wrapper">
        <h1>The Scroll indicator</h1>
        <div className="scroll-progress-tracker">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div>
        {data && data.length ? (
          data.map((dataItems) => <p key={dataItems.id}>{dataItems.title}</p>)
        ) : (
          <div> no data</div>
        )}
      </div>
    </div>
  );
}
