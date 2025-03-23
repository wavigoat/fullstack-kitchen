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
    { title: "Signup Page" },
    { name: "Signup", content: "Create an account!" },
  ];
}

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => { // UNTESTED
    try {
      setError("");
      
      const response = await fetch('http://localhost:3001/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      
      // Navigate to profile page on success
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="sign-in">
      <div className="div">
        <div className="navigation">
          <div className="overlap-group">
            <div className="items">
              <div className="text-wrapper">Page</div>
              <div className="text-wrapper">Page</div>
              <div className="text-wrapper">Page</div>
              <button className="button">
                <div className="text-wrapper-2">Button</div>
              </button>
            </div>
            <div className="text-wrapper-3">Site name</div>
            <div className="navigation-2">
              <div className="items-2">
                <div className="text-wrapper">Page</div>
                <div className="text-wrapper">Page</div>
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
      <div className="form">
        {error && <div className="error" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <div className="input">
          <div className="text-wrapper-5">Username</div>
          <input
            className="label-wrapper"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
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
        <div className="input">
          <label className="text-wrapper-5" htmlFor="input-1">
            Email address
          </label>
          <input
            className="label-wrapper"
            id="input-1"
            placeholder="email@janesfakedomain.net"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button className="div-wrapper" onClick={handleSubmit}>
          <div className="text-wrapper-8">Submit</div>
        </button>
        <button className="div-wrapper" onClick={() => navigate('/login')}>
          <div className="text-wrapper-9">Already have an account?</div>
        </button>
      </div>
      <div className="text-wrapper-10">Sign Up</div>
    </div>
  );
}