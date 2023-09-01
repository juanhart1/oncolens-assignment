import { ButtonProps } from "../interfaces";

const Button = ({ children, onClick }: ButtonProps) => (
  <button
    className="border p-1 rounded-lg hover:bg-indigo-600 hover:text-white hover:shadow-xl"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
