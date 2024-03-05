import MenuItem from "./menu-item";

export default function MenuList({ list = [] }) {
  return (
    <ul className="menu-list-wrapper">
      {list && list.length
        ? list.map((listItem) => <MenuItem item={listItem} />)
        : null}
    </ul>
  );
}
