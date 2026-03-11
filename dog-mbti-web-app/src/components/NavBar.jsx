import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/quiz" className={({isActive}) => isActive ? 'active' : ''}>Quiz</NavLink>
      <NavLink to="/breeds" className={({isActive}) => isActive ? 'active' : ''}>Breed Profiles</NavLink>
      {/* Login and Signup links removed entirely */}
    </nav>
  );
};

export default NavBar;