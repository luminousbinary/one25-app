import Tabs from "./tabs";
import './tab.css'

export default function TabTest() {
  const tabs = [
    {
      label: "Tab 1",
      content: <div>This is content tab 1</div>,
    },
    {
      label: "Tab 2",
      content: (
        <div>
          <h1>This is content tab2 </h1>{" "}
        </div>
      ),
    },
    {
      label: "Tab 3",
      content: (
        <div>
          <h1>This is content tab3 </h1>
          <div> this too is okay right</div>
        </div>
      ),
    },
  ];

  // this function is not needed
  //   function handleChange(currentTabIndex) {
  //     console.log(currentTabIndex);
  //   }

  return <Tabs tabsContent={tabs} />;
}
