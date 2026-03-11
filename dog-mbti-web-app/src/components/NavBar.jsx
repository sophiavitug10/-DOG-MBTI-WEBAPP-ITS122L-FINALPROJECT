import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/home" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/quiz" className={({isActive}) => isActive ? 'active' : ''}>Quiz</NavLink>
      <NavLink to="/breeds" className={({isActive}) => isActive ? 'active' : ''}>Breed Profiles</NavLink>
      <button type="button" className="navbar-logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;