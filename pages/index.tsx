import { useReducer, useState, Dispatch } from "react";
import clsx from "clsx";

// constants
const items = [
  { label: "apple", identifier: "Apple1", added: false, selected: false },
  { label: "apricot", identifier: "Apricot1", added: false, selected: false },
  { label: "avocado", identifier: "Avocado1", added: true, selected: false },
  { label: "banana", identifier: "Banana1", added: true, selected: false },
  { label: "grape", identifier: "Grape1", added: true, selected: false },
  { label: "melon", identifier: "Melon1", added: false, selected: false },
  { label: "peach", identifier: "Peach1", added: false, selected: false },
  { label: "pear", identifier: "Pear1", added: false, selected: false },
  { label: "plum", identifier: "Plum1", added: true, selected: false },
  {
    label: "pineapple",
    identifier: "Pineapple1",
    added: true,
    selected: false,
  },
];

// types
// State-related types
type Item = {
  added: boolean;
  identifier: string;
  label: string;
  selected?: boolean;
};
type Items = Item[];
type State = { allItems: Items };
type Action = { type: string; payload?: string };
// UI component types
type ButtonProps = React.PropsWithChildren<OnClick>;
type InputProps = {
  name: string;
  onChange: (arg: any) => void;
  value: string;
};
type ListItemProps = { index: number; item: Item; onClick: () => void };
type ListProps = { items: Items; dispatch: Dispatch<Action> };
type OnClick = { onClick: () => void };
// types

// initial state
const initialState: State = {
  allItems: items,
};
// reducer business logic
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "Select Item": {
      // map over all items and update the selectedItem's selected field
      const updatedAllItems = state.allItems.map((item) => {
        if (item.identifier === action.payload) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });

      return {
        allItems: updatedAllItems,
      };
    }
    case "Add Item": {
      // map over all items and update the selectedItem's selected field
      const updatedAllItems = state.allItems.map((item) => {
        if (item.selected) {
          return { ...item, added: true, selected: !item.selected };
        }
        return item;
      });

      return {
        allItems: updatedAllItems,
      };
    }
    case "Remove Item": {
      // map over all items and update the selectedItem's selected field
      const updatedAllItems = state.allItems.map((item) => {
        if (item.added && item.selected) {
          return { ...item, added: false, selected: !item.selected };
        }
        return item;
      });

      return {
        allItems: updatedAllItems,
      };
    }
    case "Add All Not Added Items": {
      // map over all items and update the selectedItem's selected field
      const updatedAllItems = state.allItems.map((item) => {
        if (!item.added) {
          return { ...item, added: true };
        }
        return item;
      });

      return {
        allItems: updatedAllItems,
      };
    }
    case "Remove All Added Items": {
      // map over all items and update the selectedItem's selected field
      const updatedAllItems = state.allItems.map((item) => {
        if (item.added) {
          return { ...item, added: false };
        }
        return item;
      });

      return {
        allItems: updatedAllItems,
      };
    }
    default:
      return state;
  }
};

// sub-components
const Button = ({ children, onClick }: ButtonProps) => (
  <button className="border p-1 rounded-lg" onClick={onClick}>
    {children}
  </button>
);
const Input = ({ name, onChange, value }: InputProps) => (
  <input
    className="border rounded-lg p-1"
    name={name}
    onChange={(event) => onChange(event.target.value)}
    placeholder="Filtered non-added items here..."
    type="search"
    value={value}
  />
);
const Empty = () => (
  <div className="flex items-center justify-center border h-40 rounded-lg gap-y-1">
    <p>There are no items left to select</p>
  </div>
);
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
const ListHeader = ({ title }: {title: string}) => (
  <header className="text-center">
    <h1 className="text-center">{title}</h1>
  </header>
);
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

// The page/component responsible for rendering app
const IndexPage = () => {
  // state/dispatcher associated with the items living in state
  const [items, dispatch] = useReducer(reducer, initialState);

  // separated added and not added items
  const itemsThatHaveBeenAdded = items.allItems.filter((item) => item.added);
  const itemsThatHaveNotBeenAdded = items.allItems.filter(
    (item) => !item.added,
  );

  // local state for both filtering inputs
  const [notAddedInputValue, setnotAddedInputValue] = useState("");
  const [addedInputValue, setaddedInputValue] = useState("");

  // filtered items based on their corresponding input
  const filteredAddedItems = itemsThatHaveBeenAdded.filter((item) =>
    item.label.toLowerCase().startsWith(addedInputValue.toLowerCase()),
  );
  const filteredNonAddedItems = itemsThatHaveNotBeenAdded.filter((item) =>
    item.label.toLowerCase().startsWith(notAddedInputValue.toLowerCase()),
  );

  // action handlers
  const handleAddingItems = () => dispatch({ type: "Add Item" });
  const handleAddingAllNotAddedItems = () =>
    dispatch({ type: "Add All Not Added Items" });
  const handleRemovingItems = () => dispatch({ type: "Remove Item" });
  const handleAddingAllAddedItems = () =>
    dispatch({ type: "Remove All Added Items" });

  return (
    <div className="flex justify-center gap-x-8 p-4">
      <section className="border flex flex-col p-4 rounded-lg w-96">
        <ListHeader title="Not Added" />
        {!itemsThatHaveNotBeenAdded.length ? (
          <Empty />
        ) : (
          <List items={filteredNonAddedItems} dispatch={dispatch} />
        )}
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex flex-col">
            <label htmlFor="non-added items">Filter Items:</label>
            <Input
              name="non-added items"
              onChange={setnotAddedInputValue}
              value={notAddedInputValue}
            />
          </div>
          <Button onClick={handleAddingItems}>
            Move Selected Item(s) To Added
          </Button>
          <Button onClick={handleAddingAllNotAddedItems}>
            Move All Item(s) To Added
          </Button>
        </div>
      </section>
      <section className="border flex flex-col p-4 rounded-lg w-96">
      <ListHeader title="Added" />
        {!itemsThatHaveBeenAdded.length ? (
          <Empty />
        ) : (
          <List items={filteredAddedItems} dispatch={dispatch} />
        )}
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex flex-col">
            <label htmlFor="added items">Filter Items:</label>
            <Input
              name="added items"
              onChange={setaddedInputValue}
              value={addedInputValue}
            />
          </div>
          <Button onClick={handleRemovingItems}>
            Move Selected Item(s) To Not Added
          </Button>
          <Button onClick={handleAddingAllAddedItems}>
            Move All Item(s) To Not Added
          </Button>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
