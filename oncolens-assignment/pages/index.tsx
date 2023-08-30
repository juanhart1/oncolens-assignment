import { useReducer } from "react";

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
  const [items, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex row gap-x-8">
      <section className="w-96 bg-amber-900">
        <header className="text-center">Not Added</header>
        <ul>
          {items.nonSelectedItems.map((item) => (
            <li
              className="capitalize"
              key={item.identifier}
              onClick={() => console.log({ identifier: item.identifier })}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </section>
      <section className="w-96 bg-green-900">
        <header className="text-center">Added</header>
        <ul>
          {items.selectedItems.map((item) => (
            <li
              className="capitalize"
              key={item.identifier}
              onClick={() => console.log({ identifier: item.identifier })}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default IndexPage;
