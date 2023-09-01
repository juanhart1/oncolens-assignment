import { ListHeaderProps } from "../interfaces";

const ListHeader = ({ title }: ListHeaderProps) => (
  <header className="text-center">
    <h1 className="text-center">{title}</h1>
  </header>
);

export default ListHeader;
