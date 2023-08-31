import { useReducer, useState } from "react";
import clsx from "clsx";

// constants
const items = [
  { label: "bananas", identifier: "Bananas1", added: true, selected: false },
  { label: "pears", identifier: "Pear1", added: false, selected: false },
  { label: "melons", identifier: "Melons1", added: false, selected: false },
  { label: "apple", identifier: "Apple1", added: false, selected: false },
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
type Action = { type: string; payload?: string };

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
          allItems: [...state.addedItems, ...mappedAddedItems],
          nonAddedItems: [...state.nonAddedItems],
        };
      } else {
        // otherwise, iterate over not added state
        const mappedNotAddedItems = state.nonAddedItems.map((notAddedItem) => {
          if (selectedItem.identifier === notAddedItem.identifier) {
            return { ...notAddedItem, selected: !notAddedItem.selected };
          }
          return notAddedItem;
        });

        return {
          addedItems: [...state.addedItems],
          allItems: [...state.addedItems, ...mappedNotAddedItems],
          nonAddedItems: mappedNotAddedItems,
        };
      }
    }
    case "Add Item": {
      // find selected items
      const selectedItems = state.allItems.filter((item) => item.selected);
      // toggle each selected item's `added` field
      const mappedSelectedItems = selectedItems.map((item) => ({ ...item, added: true, selected: !item.selected }));
      // list containing updated added items
      const addedItems = [...state.addedItems, ...mappedSelectedItems];
      // list of unique identifiers to assist in removing the items that have been added
      const addedItemIdentifiers = addedItems.map((item) => item.identifier);
      // filtering down of nonAddedItems now that some have been added
      const nonAddedItems = state.nonAddedItems.filter((item) => !addedItemIdentifiers.includes(item.identifier));

      return {
        addedItems,
        allItems: [...addedItems, ...nonAddedItems],
        nonAddedItems,
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
    item.label.toLowerCase().startsWith(selectedItemsValue.toLowerCase()),
  );
  const filteredNonSelectedItems = items.nonAddedItems.filter((item) =>
    item.label.toLowerCase().startsWith(nonSelectedItemsValue.toLowerCase()),
  );

  return (
    <div className="flex justify-center gap-x-8">
      <section className="border flex flex-col p-4 rounded-lg w-96">
        <header className="text-center">Not Added</header>
        <ul>
          {filteredNonSelectedItems.map((item, index) => (
            <li
              className={clsx("capitalize", item.selected ? "border" : "")}
              key={`${item.identifier} ${index}`}
              onClick={() => {
                dispatch({ payload: item.identifier, type: "Select Item" });
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex flex-col">
            <label htmlFor="non-added items">Filter Items:</label>
            <input
              className="border rounded-lg p-1"
              name="non-added items"
              onChange={(e) => setnonSelectedItemsValue(e.target.value)}
              placeholder="Filtered non-added items here..."
              type="search"
              value={nonSelectedItemsValue}
            />
          </div>
          <button className="border p-1 rounded-lg" onClick={() => dispatch({ type: "Add Item" })}>Move Selected Item(s) To Added</button>
          <button className="border p-1 rounded-lg">Move All Item(s) To Added</button>
        </div>
      </section>
      <section className="w-96 bg-green-900">
        <header className="text-center">Added</header>
        <ul>
          {filteredSelectedItems.map((item, index) => (
            <li
              className={clsx("capitalize", item.selected ? "border" : "")}
              key={`${item.identifier} ${index}`}
              onClick={() => {
                dispatch({ payload: item.identifier, type: "Select Item" });
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={selectedItemsValue}
          onChange={(e) => setSelectedItemsValue(e.target.value)}
        />
      </section>
    </div>
  );
};

export default IndexPage;
