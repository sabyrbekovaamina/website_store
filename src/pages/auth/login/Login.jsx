import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import scss from "./Login.module.scss";
import regis from "../../../image/Side Image.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithGoogle, register, logout, user } = useAuth();

  async function handleRegister() {
    try {
      await register(email, password);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className="container">
        <div className={scss.register}>
          <div className={scss.img}>
            <img src={regis} alt="" />
          </div>
          <div className={scss.inp}>
            {/* если пользователь уже вошёл */}
            {user ? (
              <div>
                <h3>Logged in as: {user.email}</h3>
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  value={email}
                  placeholder="email"
                />

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  placeholder="password"
                />

                <button onClick={handleRegister}>Register</button>
                <button onClick={signUpWithGoogle}>Google</button>
              </>
            )}

            <NavLink to="/register">
              <h6>forget password</h6>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
