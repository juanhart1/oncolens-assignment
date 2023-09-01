// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { Dispatch } from "react";

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
type ListHeaderProps = { title: string };
type ListItemProps = { index: number; item: Item; onClick: () => void };
type ListProps = { items: Items; dispatch: Dispatch<Action> };
type OnClick = { onClick: () => void };
// types

export type {
  Item,
  Items,
  State,
  Action,
  ButtonProps,
  InputProps,
  ListHeaderProps,
  ListItemProps,
  ListProps,
  OnClick,
};
