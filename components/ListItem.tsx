import clsx from "clsx";
import { ListItemProps } from "../interfaces";

const ListItem = ({ index, item, onClick }: ListItemProps) => {
  const listItemBaseStyles = "border capitalize p-2 rounded-lg";

  return (
    <li
      className={clsx(
        listItemBaseStyles,
        item.selected ? "bg-indigo-600 text-white" : "",
      )}
      key={`${item.identifier} ${index}`}
      onClick={onClick}
    >
      {item.label} {String.fromCodePoint(item.emoji)}
    </li>
  );
};

export default ListItem;
