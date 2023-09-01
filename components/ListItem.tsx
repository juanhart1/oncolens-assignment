import clsx from "clsx";
import { ListItemProps } from "../interfaces";

const ListItem = ({ index, item, onClick }: ListItemProps) => {
  const listItemBaseStyles = "border capitalize p-2 rounded-lg";

  return (
    <li
      className={clsx(
        listItemBaseStyles,
        item.selected ? "border-indigo-600" : "",
      )}
      key={`${item.identifier} ${index}`}
      onClick={onClick}
    >
      {item.label}
    </li>
  );
};

export default ListItem;
