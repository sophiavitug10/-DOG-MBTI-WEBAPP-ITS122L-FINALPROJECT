import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/quiz" className={({isActive}) => isActive ? 'active' : ''}>Quiz</NavLink>
      <NavLink to="/breeds" className={({isActive}) => isActive ? 'active' : ''}>Breed Profiles</NavLink>
      <NavLink to="/login" className={({isActive}) => isActive ? 'active' : ''}>Login</NavLink>
      <NavLink to="/signup" className={({isActive}) => isActive ? 'active' : ''}>Signup</NavLink>
    </nav>
  );
};

export default NavBar;
  