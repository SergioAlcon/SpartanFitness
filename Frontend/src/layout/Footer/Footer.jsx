import "./Footer.css";
import whitelogo from "../assets/logowhite.png";

export const Footer = () => {
  return (
    <footer>
      <img src={whitelogo} alt="logo-spartan" />
      <span> © 2022 SPARTAN Fitness</span>
      <p>
        Powered by <b>SERGIO ALCÓN </b>
      </p>
    </footer>
  );
};
