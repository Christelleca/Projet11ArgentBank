import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginEvent = (e) => {
        e.preventDefault();
        let userCredentials = {
            email,
            password,
        };
        dispatch(loginUser(userCredentials)).then((result) => {
            if (result.payload) {
                setEmail("");
                setPassword("");
                navigate("/User");
            }
        });
    };

    return (
        <div className="body-sign-in">
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleLoginEvent}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Email</label>
                            <input
                                type="text"
                                id="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button" to="/User">
                            {loading ? "loading..." : "Sing In"}
                        </button>
                        {error && (
                            <div className="alert_login" role="alert">
                                {error}
                            </div>
                        )}
                    </form>
                </section>
            </main>
        </div>
    );
};

export default SignIn;
