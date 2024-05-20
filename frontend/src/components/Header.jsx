import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/TokenSlice";

function Header() {
    const user = useSelector((state) => state.userProfile.user);
    const token = useSelector((state) => state.token.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    // Utiliser useEffect pour surveiller les changements de token et de user
    useEffect(() => {}, [token, user]);

    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="src/assets/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            {token ? (
                <div>
                    <NavLink className="main-nav-item" to="/user">
                        <i className="fa fa-user-circle"></i>
                        {user?.userName || "User"} {/* Affiche le userName */}
                    </NavLink>
                    <NavLink
                        className="main-nav-item"
                        to="/"
                        onClick={handleLogout}
                    >
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </NavLink>
                </div>
            ) : (
                <div>
                    <NavLink className="main-nav-item" to="/SignIn">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </NavLink>
                </div>
            )}
        </nav>
    );
}

export default Header;
