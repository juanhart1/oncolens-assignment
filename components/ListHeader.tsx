import { ListHeaderProps } from "../interfaces";

const ListHeader = ({ title }: ListHeaderProps) => (
  <header className="text-center my-4">
    <h1 className="text-center underline underline-offset-8 decoration-wavy">{title}</h1>
  </header>
);

export default ListHeader;
