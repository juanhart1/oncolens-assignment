import { Action, State } from "../interfaces";
import { items } from "./sample-data";

// initial state
export const initialState: State = {
  allItems: items,
};
// reducer business logic
export const reducer = (state: State, action: Action) => {
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
