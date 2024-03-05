import { useState } from "react";
import MenuList from "./menu-list";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function MenuItem({ item }) {
  const [displayCurrentChilderen, setDisplayCurrentChildren] = useState({});

  function handleToggleChildren(getCurrentLabel) {
    setDisplayCurrentChildren({
      ...displayCurrentChilderen,
      [getCurrentLabel]: !displayCurrentChilderen[getCurrentLabel],
    });
  }

  console.log(displayCurrentChilderen);
  return (
    <li>
      <div className="menu-item-label">
        <p> {item.label}</p>
        {item && item.children && item.children.length ? (
          <span onClick={() => handleToggleChildren(item.label)}>
            {
                displayCurrentChilderen[item.label] ? <FaMinus/> : <FaPlus/>
            }
          </span>
        ) : null}
      </div>
      {item &&
      item.children &&
      item.children.length &&
      displayCurrentChilderen[item.label] ? (
        <MenuList list={item.children} />
      ) : null}
    </li>
  );
}
