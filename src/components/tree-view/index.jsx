import MenuList from "./menu-list";
import "./tree.css";

export default function TreeView({menus = []}) {
  return (
    <div className="tree-view-wrapper">
        tree view
      <MenuList list={menus} />
    </div>
  );
}
