import { useState } from "react";
import data from "./data";
import "./acord.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let myMult = [...multiple];
    const findItemId = myMult.indexOf(getCurrentId);

    console.log(findItemId);

    findItemId === -1 ? myMult.push(getCurrentId) : myMult.splice(findItemId);

    setMultiple(myMult);
  }

  console.log(multiple);

  return (
    <div className="wrapper-container">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi-Selection Accordian
      </button>
      {/* question */}
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {(!enableMultiSelection && selected === dataItem.id) ||( enableMultiSelection &&
              multiple.indexOf(dataItem.id) !== -1) ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div> Data not found</div>
        )}
      </div>
    </div>
  );
}
