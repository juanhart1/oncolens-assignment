import { useReducer, useState } from "react";
import { initialState, reducer } from "../utils/reducer";
import { Button, Empty, Input, List, ListHeader } from "../components";

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

  // shared styles
  const sectionStyles = "border flex flex-col p-4 rounded-lg w-96";
  const inputContainerStyles = "flex flex-col mt-4 gap-2";

  return (
    <div className="flex font-mono justify-center gap-x-8 p-4">
      <section className={sectionStyles}>
        <ListHeader title="Not Added" />
        {!itemsThatHaveNotBeenAdded.length ? (
          <Empty />
        ) : (
          <List items={filteredNonAddedItems} dispatch={dispatch} />
        )}
        <div className={inputContainerStyles}>
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
      <section className={sectionStyles}>
        <ListHeader title="Added" />
        {!itemsThatHaveBeenAdded.length ? (
          <Empty />
        ) : (
          <List items={filteredAddedItems} dispatch={dispatch} />
        )}
        <div className={inputContainerStyles}>
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
