import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  useEffect(() => {
    const { name = '' } = JSON.parse(localStorage.getItem('user')) ?? '';
    setUserName(name);
  }, [location.pathname]);
  return (
    <div className="navbar navbar-expand-lg bg-light">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <Link to="/" className="navbar-brand">
          BLOG
        </Link>
        <Link to="/" className="nav-link">
          HOME
        </Link>
        {userName && (
          <Link to="/new" className="nav-link">
            CREATE POST
          </Link>
        )}
      </ul>

      <div className="d-flex" role="search">
        {!userName ? (
          <>
            <button className="btn btn-outline-success">
              <Link to="/login" className="nav-link">
                LOGIN
              </Link>
            </button>
            <button className="btn btn-outline-success">
              <Link to="/register" className="nav-link">
                REGISTER
              </Link>
            </button>
          </>
        ) : (
          <button className="btn btn-outline-secondary  btn-lg disabled">
            {userName}
          </button>
        )}

        {userName && (
          <button
            className="btn btn-outline-danger"
            onClick={() => handleLogout()}
          >
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
