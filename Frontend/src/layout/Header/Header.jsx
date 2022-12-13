import "./Header.css";
import blacklogo from "../assets/logoblack.png";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link to={"/"} className="link">
        <img src={blacklogo} alt="logo-spartan" />
      </Link>
      <h1>
        <Link to={"/"} className="link">
          SPARTAN
        </Link>
      </h1>
    </header>
  );
};
