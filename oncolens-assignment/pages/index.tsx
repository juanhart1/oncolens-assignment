import { useReducer, useState } from "react";

// constants
const selected = [
  { label: "Apple", identifier: "Apple1" },
  { label: "Grape", identifier: "Grape1" },
];
const notSelected = [
  { label: "bananas", identifier: "Bananas1" },
  { label: "blueberries", identifier: "Blueberries1" },
  { label: "melons", identifier: "Melons1" },
];

// types
type Item = {
  label: string;
  identifier?: string;
};
type State = { selectedItems: Item[]; nonSelectedItems: Item[] };
type Action = { type: string; payload: string };

// initial state & reducer logic
const initialState: State = {
  selectedItems: selected,
  nonSelectedItems: notSelected,
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "Select Item": {
      console.log("Item has been selected...");
      return {
        nonSelectedItems: [...state.nonSelectedItems],
        selectedItems: [...state.selectedItems],
      };
    }
    case "Add Item": {
      console.log("Item would be added...");
      return {
        nonSelectedItems: [...state.nonSelectedItems],
        selectedItems: [...state.selectedItems],
      };
    }
    case "Remove Item": {
      console.log("Item would be removed...");
      return {
        nonSelectedItems: [...state.nonSelectedItems],
        selectedItems: [...state.selectedItems],
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
  const filteredSelectedItems = items.selectedItems.filter((item) =>
    item.label.toLowerCase().startsWith(selectedItemsValue),
  );
  const filteredNonSelectedItems = items.nonSelectedItems.filter((item) =>
    item.label.toLowerCase().startsWith(nonSelectedItemsValue),
  );

  return (
    <div className="flex row gap-x-8">
      <section className="w-96 bg-amber-900">
        <header className="text-center">Not Added</header>
        <ul>
          {filteredNonSelectedItems.map((item) => (
            <li
              className="capitalize"
              key={item.identifier}
              onClick={() => console.log({ identifier: item.identifier })}
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
              className="capitalize"
              key={item.identifier}
              onClick={() => console.log({ identifier: item.identifier })}
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
