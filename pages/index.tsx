import { useReducer, useState } from "react";
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
type Item = {
  added: boolean;
  identifier: string;
  label: string;
  selected?: boolean;
};
type Items = Item[];
type State = { allItems: Items };
type Action = { type: string; payload?: string };

// initial state & reducer logic
const initialState: State = {
  allItems: items,
};
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

const IndexPage = () => {
  // state/dispatcher associated with the items living in state
  const [items, dispatch] = useReducer(reducer, initialState);

  // separate added and not added items
  const itemsThatHaveBeenAdded = items.allItems.filter((item) => item.added);
  const itemsThatHaveNotBeenAdded = items.allItems.filter(
    (item) => !item.added,
  );

  // local state for both filtering inputs
  const [notAddedInputValue, setnotAddedInputValue] = useState("");
  const [addedInputValue, setaddedInputValue] = useState("");

  // filtered items based on their corresponding input
  const filteredSelectedItems = itemsThatHaveBeenAdded.filter((item) =>
    item.label.toLowerCase().startsWith(notAddedInputValue.toLowerCase()),
  );
  const filteredNonSelectedItems = itemsThatHaveNotBeenAdded.filter((item) =>
    item.label.toLowerCase().startsWith(addedInputValue.toLowerCase()),
  );

  return (
    <div className="flex justify-center gap-x-8 p-4">
      <section className="border flex flex-col p-4 rounded-lg w-96">
        <header className="text-center">Not Added</header>
        {itemsThatHaveNotBeenAdded.length === 0 ? (
          <p>Empty</p>
        ) : (
          <ul className="flex flex-col border p-2 max-h-40 overflow-scroll rounded-lg gap-y-1">
            {filteredNonSelectedItems.map((item, index) => (
              <li
                className={clsx(
                  "border capitalize p-2 rounded-lg",
                  item.selected ? "border-indigo-600" : "",
                )}
                key={`${item.identifier} ${index}`}
                onClick={() => {
                  dispatch({ payload: item.identifier, type: "Select Item" });
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex flex-col">
            <label htmlFor="non-added items">Filter Items:</label>
            <input
              className="border rounded-lg p-1"
              name="non-added items"
              onChange={(e) => setaddedInputValue(e.target.value)}
              placeholder="Filtered non-added items here..."
              type="search"
              value={addedInputValue}
            />
          </div>
          <button
            className="border p-1 rounded-lg"
            onClick={() => dispatch({ type: "Add Item" })}
          >
            Move Selected Item(s) To Added
          </button>
          <button
            className="border p-1 rounded-lg"
            onClick={() => dispatch({ type: "Add All Not Added Items" })}
          >
            Move All Item(s) To Added
          </button>
        </div>
      </section>
      <section className="border flex flex-col p-4 rounded-lg w-96">
        <header className="text-center">Added</header>
        {itemsThatHaveBeenAdded.length === 0 ? (
          <p>Empty</p>
        ) : (
          <ul className="flex flex-col border p-2 max-h-40 overflow-scroll rounded-lg gap-y-1">
            {filteredSelectedItems.map((item, index) => (
              <li
                className={clsx(
                  "border capitalize p-2 rounded-lg",
                  item.selected ? "border-indigo-600" : "",
                )}
                key={`${item.identifier} ${index}`}
                onClick={() => {
                  dispatch({ payload: item.identifier, type: "Select Item" });
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex flex-col">
            <label htmlFor="non-added items">Filter Items:</label>
            <input
              className="border rounded-lg p-1"
              name="non-added items"
              onChange={(e) => setnotAddedInputValue(e.target.value)}
              placeholder="Filtered non-added items here..."
              type="search"
              value={notAddedInputValue}
            />
          </div>
          <button
            className="border p-1 rounded-lg"
            onClick={() => dispatch({ type: "Remove Item" })}
          >
            Move Selected Item(s) To Not Added
          </button>
          <button
            className="border p-1 rounded-lg"
            onClick={() => dispatch({ type: "Remove All Added Items" })}
          >
            Move All Item(s) To Not Added
          </button>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
