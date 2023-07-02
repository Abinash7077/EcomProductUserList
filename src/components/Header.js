import { NavLink } from "react-router-dom";
import '../App.css'

const Header = () => {
  return (
    <>
      <div className="header">
        <ul className="ul">
          <li>
            <NavLink to="/products" className="item">
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className="item">
              User
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
