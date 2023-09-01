import { ListProps } from "../interfaces";
import ListItem from "./ListItem";

const List = ({ items, dispatch }: ListProps) => {
  const listStyles =
    "flex flex-col border p-2 h-40 overflow-scroll rounded-lg gap-y-1";

  return (
    <ul className={listStyles}>
      {items.map((item, index) => (
        <ListItem
          index={index}
          item={item}
          onClick={() =>
            dispatch({
              payload: item.identifier,
              type: "Select Item",
            })
          }
        />
      ))}
    </ul>
  );
};

export default List;
