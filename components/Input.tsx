import { InputProps } from "../interfaces";

const Input = ({ name, onChange, value }: InputProps) => (
  <input
    className="border rounded-lg p-1"
    name={name}
    onChange={(event) => onChange(event.target.value)}
    placeholder="Filtered items here..."
    type="search"
    value={value}
  />
);

export default Input;
