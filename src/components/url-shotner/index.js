import { useState } from "react";
import { nanoid } from "nanoid";
export default function UrlShortner({ longUrl }) {
  const [shortUrl, setShortUrl] = useState("");

  const [userInput, setUserInput] = useState('')

  function handleGenerateShortUrl(){

    nanoid()
  }

  

  return (
    <div>
      <h1>Url Shotner</h1>
      <div className="url-shortner">
        <input onChange={(e)=>{setUserInput(e.target.value)}} value={userInput} type="text" placeholder="input url here" />
        
        <button onClick={handleGenerateShortUrl} >Submit</button>
      </div>
    </div>
  );
}
