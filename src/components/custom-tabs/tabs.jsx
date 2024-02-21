import { useEffect, useState } from "react";

export default function Tabs({ tabsContent }) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  function handleOnClick(clickedLabel) {
    setCurrentTabIndex(clickedLabel);
  }

  useEffect(() => {
    // onChange
    console.log(currentTabIndex);
  }, [currentTabIndex]);

  return (
    <div className="tabs-wrapper">
      <div className="teb-heading">
        {tabsContent.map((tabItem, idx) => (
          <div className={`tab-item ${currentTabIndex===idx ? 'active' : ''}`} key={tabItem.label} onClick={() => handleOnClick(idx)}>
            <span className="label">{tabItem.label}</span>
          </div>
        ))}
      </div>

      <div className="tab-content">
        {tabsContent[currentTabIndex] && tabsContent[currentTabIndex].content}
      </div>
    </div>
  );
}
