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
      if (selectedItem?.added) {
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
          if (selectedItem?.identifier === notAddedItem.identifier) {
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
      const mappedSelectedItems = selectedItems.map((item) => ({
        ...item,
        added: true,
        selected: !item.selected,
      }));
      // list containing updated added items
      const addedItems = [...state.addedItems, ...mappedSelectedItems];
      // list of unique identifiers to assist in removing the items that have been added
      const addedItemIdentifiers = addedItems.map((item) => item.identifier);
      // filtering down of nonAddedItems now that some have been added
      const nonAddedItems = state.nonAddedItems.filter(
        (item) => !addedItemIdentifiers.includes(item.identifier),
      );

      return {
        addedItems,
        allItems: [...addedItems, ...nonAddedItems],
        nonAddedItems,
      };
    }
    case "Remove Item": {
      // find selected items
      const selectedItems = state.allItems.filter((item) => item.selected);
      // toggle each selected item's `added` field
      const mappedSelectedItems = selectedItems.map((item) => ({
        ...item,
        added: false,
        selected: !item.selected,
      }));
      // list containing updated added items
      const nonAddedItems = [...state.nonAddedItems, ...mappedSelectedItems];
      // list of unique identifiers to assist in removing the items that have been added
      const notAddedItemIdentifiers = nonAddedItems.map(
        (item) => item.identifier,
      );
      // filtering down of nonAddedItems now that some have been added
      const addedItems = state.addedItems.filter(
        (item) => !notAddedItemIdentifiers.includes(item.identifier),
      );

      console.log({
        selectedItems,
        mappedSelectedItems,
        nonAddedItems,
        addedItems,
      });

      return {
        addedItems,
        allItems: [...addedItems, ...nonAddedItems],
        nonAddedItems,
      };
    }
    case "Add All Not Added Items": {
      const nonAddedItems = state.nonAddedItems.map((item) => ({
        ...item,
        added: true,
      }));

      return {
        addedItems: [...state.addedItems, ...nonAddedItems],
        allItems: [...state.allItems],
        nonAddedItems: [],
      };
    }
    case "Add All Added Items": {
      const addedItems = state.addedItems.map((item) => ({
        ...item,
        added: false,
      }));

      return {
        addedItems: [],
        allItems: [...state.allItems],
        nonAddedItems: [...state.nonAddedItems, ...addedItems],
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
    <div className="flex justify-center gap-x-8 p-4">
      <section className="border flex flex-col p-4 rounded-lg w-96">
        <header className="text-center">Not Added</header>
        {items.nonAddedItems.length === 0 ? (
          <p>Empty</p>
        ) : (
          <ul className="flex flex-col border p-2 max-h-40 overflow-scroll rounded-lg gap-y-1">
            {filteredNonSelectedItems.map((item, index) => (
              <li
                className={clsx("border capitalize p-2 rounded-lg", item.selected ? "border-indigo-600" : "")}
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
              onChange={(e) => setnonSelectedItemsValue(e.target.value)}
              placeholder="Filtered non-added items here..."
              type="search"
              value={nonSelectedItemsValue}
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
        {items.addedItems.length === 0 ? (
          <p>Empty</p>
        ) : (
          <ul className="flex flex-col border p-2 max-h-40 overflow-scroll rounded-lg gap-y-1">
            {filteredSelectedItems.map((item, index) => (
              <li
                className={clsx("border capitalize p-2 rounded-lg", item.selected ? "border-indigo-600" : "")}
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
              onChange={(e) => setSelectedItemsValue(e.target.value)}
              placeholder="Filtered non-added items here..."
              type="search"
              value={selectedItemsValue}
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
            onClick={() => dispatch({ type: "Add All Added Items" })}
          >
            Move All Item(s) To Not Added
          </button>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
