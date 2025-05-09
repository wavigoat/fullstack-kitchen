import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router";
import icon from "../../assets/icons/Icon.png";
import icon2 from "../../assets/icons/Icon-1.png";
import icon3 from "../../assets/icons/Icon-2.png";
import icon4 from "../../assets/icons/Icon-3.png";
import type { Route } from "../../../.react-router/types/app/routes/+types/home";
import "../../style.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login Page" },
    { name: "login", content: "Login to your account!" },
  ];
}
export default function LogIn(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {

      const response = await fetch('http://localhost:3001/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in local storage
        localStorage.setItem('token', data.token);
        navigate("/profile");
        return;
      }

      setError(data.error);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="log-in">
      <div className="div">
        {/* Header section */}
        <div className="navigation">
          <div className="overlap-group">
            <div className="navigation-2">
              <div className="items-2">
              <div className="text-wrapper" onClick={() => navigate('/login')}>Create a Recipe</div>
                <div className="text-wrapper" onClick={() => navigate('/login')}>Search</div>
                <button className="button" onClick={() => navigate('/register')}>
                  <div className="text-wrapper-4">Sign Up</div>
                </button>
              </div>
              <div className="text-wrapper-3" onClick={() => navigate('/')}>FlavorShare</div>
            </div>
          </div>
        </div>
        <div className="navigation-footer">
          <div className="overlap">
            <div className="items-3">
              <div className="text-wrapper-5">Topic</div>
              <div className="text-wrapper-6">Page</div>
              <div className="text-wrapper-6">Page</div>
              <div className="text-wrapper-6">Page</div>
            </div>
            <div className="items-4">
              <div className="text-wrapper-5">Topic</div>
              <div className="text-wrapper-6">Page</div>
              <div className="text-wrapper-6">Page</div>
              <div className="text-wrapper-6">Page</div>
            </div>
            <div className="items-5">
              <div className="text-wrapper-5">Topic</div>
              <div className="text-wrapper-6">Page</div>
              <div className="text-wrapper-6">Page</div>
              <div className="text-wrapper-6">Page</div>
            </div>
            <div className="text-wrapper-7">Site name</div>
            <div className="social-icons">
              <div className="buttons-icon">
                <div className="icon">
                  <img className="img" alt="Icon" src={icon} />
                </div>
              </div>
              <div className="buttons-icon">
                <div className="icon">
                  <img className="icon-2" alt="Icon" src={icon2} />
                </div>
              </div>
              <div className="buttons-icon">
                <div className="icon">
                  <img className="icon-3" alt="Icon" src={icon3} />
                </div>
              </div>
              <div className="buttons-icon">
                <div className="icon">
                  <img className="img" alt="Icon" src={icon4} />
                </div>
              </div>
            </div>
            <div className="navigation-footer-2">
              <div className="items-3">
                <div className="text-wrapper-5">Topic</div>
                <div className="text-wrapper-6">Page</div>
                <div className="text-wrapper-6">Page</div>
                <div className="text-wrapper-6">Page</div>
              </div>
              <div className="items-4">
                <div className="text-wrapper-5">Topic</div>
                <div className="text-wrapper-6">Page</div>
                <div className="text-wrapper-6">Page</div>
                <div className="text-wrapper-6">Page</div>
              </div>
              <div className="items-5">
                <div className="text-wrapper-5">Topic</div>
                <div className="text-wrapper-6">Page</div>
                <div className="text-wrapper-6">Page</div>
                <div className="text-wrapper-6">Page</div>
              </div>
              <div className="text-wrapper-7">Site name</div>
            </div>
          </div>
        </div>
      </div>
      {/* Form section */}
      <div className="form">
        {/* Display error message */}
        {error && <div className="error" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {/* Inputs */}
        <div className="input">
        <div className="text-wrapper-5">Email</div>
          <input
            className="label-wrapper"
            placeholder="Enter your email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input">
          <div className="text-wrapper-5">Password</div>
          <input
            className="label-wrapper"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="div-wrapper" onClick={handleSubmit}>
          <div className="text-wrapper-8">Submit</div>
        </button>
      </div>
      <div className="text-wrapper-9">Log In</div>
    </div>
  );
}