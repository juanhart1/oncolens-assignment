import { useReducer, useState } from "react";
import clsx from "clsx";

// constants
const items = [
  { label: "bananas", identifier: "Bananas1", added: true, selected: false },
  { label: "pears", identifier: "Pear1", added: false, selected: false },
  { label: "melons", identifier: "Melons1", added: false, selected: false },
  { label: "apple", identifier: "Apple1", added: false, selected: true },
  { label: "grape", identifier: "Grape1", added: true, selected: false },
];

// types
type Item = {
  added: boolean;
  identifier: string;
  label: string;
  selected?: boolean;
};
type Items = Item[];
type State = { addedItems: Items; allItems: Items; nonAddedItems: Items };
type Action = { type: string; payload: string };

// initial state & reducer logic
const initialState: State = {
  addedItems: items.filter((item) => item.added),
  allItems: items,
  nonAddedItems: items.filter((item) => !item.added),
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "Select Item": {
      // find the matching item
      const [selectedItem] = state.allItems.filter(
        (item) => item.identifier === action.payload,
      );

      // ask whether selected item is added or not
      if (selectedItem.added) {
        // iterate over added state
        const mappedAddedItems = state.addedItems.map((addedItem) => {
          if (selectedItem.identifier === addedItem.identifier) {
            return { ...addedItem, selected: !addedItem.selected };
          }
          return addedItem;
        });

        return {
          addedItems: mappedAddedItems,
          allItems: state.allItems,
          nonAddedItems: [...state.nonAddedItems],
        };
      } else {
        // iterate over not added state
        const mappedNotAddedItems = state.nonAddedItems.map((notAddedItem) => {
          if (selectedItem.identifier === notAddedItem.identifier) {
            return { ...notAddedItem, selected: !notAddedItem.selected };
          }
          return notAddedItem;
        });

        return {
          addedItems: [...state.addedItems],
          allItems: state.allItems,
          nonAddedItems: mappedNotAddedItems,
        };
      }
    }
    case "Add Item": {
      console.log("Item would be added...");
      return {
        addedItems: [...state.addedItems],
        allItems: [...state.allItems],
        nonAddedItems: [...state.nonAddedItems],
      };
    }
    case "Remove Item": {
      console.log("Item would be removed...");
      return {
        addedItems: [...state.addedItems],
        allItems: [...state.allItems],
        nonAddedItems: [...state.nonAddedItems],
      };
    }
    default:
      return state;
  }
};

const IndexPage = () => {
  // state/dispatcher associated with the items living in state
  const [items, dispatch] = useReducer(reducer, initialState);

  // local state for both filtering inputs
  const [selectedItemsValue, setSelectedItemsValue] = useState("");
  const [nonSelectedItemsValue, setnonSelectedItemsValue] = useState("");

  // filtered items based on their corresponding input
  const filteredSelectedItems = items.addedItems.filter((item) =>
    item.label.toLowerCase().startsWith(selectedItemsValue),
  );
  const filteredNonSelectedItems = items.nonAddedItems.filter((item) =>
    item.label.toLowerCase().startsWith(nonSelectedItemsValue),
  );

  return (
    <div className="flex row gap-x-8">
      <section className="w-96 bg-amber-900">
        <header className="text-center">Not Added</header>
        <ul>
          {filteredNonSelectedItems.map((item) => (
            <li
              className={clsx("capitalize", item.selected ? "border" : "")}
              key={item.identifier}
              onClick={() => {
                dispatch({ payload: item.identifier, type: "Select Item" });
              }}
            >
              {item.label}
            </li>
          ))}
          <input
            type="text"
            value={nonSelectedItemsValue}
            onChange={(e) => setnonSelectedItemsValue(e.target.value)}
          />
        </ul>
      </section>
      <section className="w-96 bg-green-900">
        <header className="text-center">Added</header>
        <ul>
          {filteredSelectedItems.map((item) => (
            <li
              className={clsx("capitalize", item.selected ? "border" : "")}
              key={item.identifier}
              onClick={() => {
                dispatch({ payload: item.identifier, type: "Select Item" });
              }}
            >
              {item.label}
            </li>
          ))}
          <input
            type="text"
            value={selectedItemsValue}
            onChange={(e) => setSelectedItemsValue(e.target.value)}
          />
        </ul>
      </section>
    </div>
  );
};

export default IndexPage;
