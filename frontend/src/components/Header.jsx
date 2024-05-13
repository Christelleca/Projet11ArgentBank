import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    const user = useSelector((state) => state.user.user);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

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
                        Tony
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
