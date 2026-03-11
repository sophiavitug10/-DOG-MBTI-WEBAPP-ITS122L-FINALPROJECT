import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const initials = (user?.name || user?.email || 'P')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleProfile = () => {
    setIsMenuOpen(false);
    navigate('/profile');
  };

  const handleResults = () => {
    setIsMenuOpen(false);
    navigate('/results');
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      setIsScrolled(currentScrollY > 8);

      if (currentScrollY > 90 && scrollDelta > 6) {
        setIsHidden(true);
      } else if (scrollDelta < -6) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${isHidden ? 'navbar-hidden' : ''} ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-shell">
        <div className="navbar-brand">Pawsonality</div>

        <div className="navbar-links">
          <NavLink to="/home" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/quiz" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Quiz
          </NavLink>
          <NavLink to="/breeds" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Breed Profiles
          </NavLink>
        </div>

        <div className="navbar-profile" ref={profileMenuRef}>
          <button
            type="button"
            className="profile-trigger"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
          >
            <span className="profile-avatar">{initials}</span>
            <span className="profile-label">Account</span>
          </button>

          {isMenuOpen && (
            <div className="profile-dropdown">
              <button type="button" className="profile-action" onClick={handleProfile}>
                Profile
              </button>
              <button type="button" className="profile-action" onClick={handleResults}>
                Results
              </button>
              <button type="button" className="profile-action danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;