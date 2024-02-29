import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import './url-short.css'


export default function UrlShortner() {
  const [shortUrl, setShortUrl] = useState("");

  const [userInput, setUserInput] = useState("");
  const [errMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchUrl(url) {
    try {
      setLoading(true);

      const res = await fetch(
        `https://www.shareaholic.com/v2/share/shorten_link?apikey=8943b7fd64cd8b1770ff5affa9a9437b&url=${url}`
      );

      const data = await res.json();

      if (data) {
        setShortUrl(data.data);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorMessage(error);
    }
  }

  if (loading) {
    return <div>Loading ... </div>;
  }

  if (errMessage !== null) {
    return <div> an error has uccured {errMessage}</div>;
  }

  function handleGenerateShortUrl() {
    fetchUrl(userInput);
  }

  console.log(shortUrl, userInput);
  return (
    <div className="url-shortner-container">
      <h1>Url Shotner</h1>
      <div className="url-shortner-input">
        <input shortner-input
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
          value={userInput}
          type="text"
          placeholder="input url here"
        />

        <button onClick={handleGenerateShortUrl}>Submit</button>

        <div className="short-url-result">
          <input value={shortUrl} disabled />
          <CopyToClipboard
            text={shortUrl}
            onCopy={(shortUrl, result) => console.log(result)}
          >
            <button>Copy Url</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
