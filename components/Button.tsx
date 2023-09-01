import { ButtonProps } from "../interfaces";

const Button = ({ children, onClick }: ButtonProps) => (
  <button className="border p-1 rounded-lg" onClick={onClick}>
    {children}
  </button>
);

export default Button;
