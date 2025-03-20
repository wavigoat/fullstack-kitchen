import React, { type JSX } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icons/Icon.png";
import icon2 from "../../assets/icons/Icon-1.png";
import icon3 from "../../assets/icons/Icon-2.png";
import icon4 from "../../assets/icons/Icon-3.png";

export default function LandingPage(): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <div className="div">
                <div className="navigation-footer">
                    <div className="items">
                        <div className="text-wrapper">Topic</div>

                        <div className="text-wrapper-2">Page</div>

                        <div className="text-wrapper-2">Page</div>

                        <div className="text-wrapper-2">Page</div>
                    </div>

                    <div className="items-2">
                        <div className="text-wrapper">Topic</div>

                        <div className="text-wrapper-2">Page</div>

                        <div className="text-wrapper-2">Page</div>

                        <div className="text-wrapper-2">Page</div>
                    </div>

                    <div className="items-3">
                        <div className="text-wrapper">Topic</div>

                        <div className="text-wrapper-2">Page</div>

                        <div className="text-wrapper-2">Page</div>

                        <div className="text-wrapper-2">Page</div>
                    </div>

                    <div className="text-wrapper-3">Contact</div>

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

                  
                </div>

                <div className="navigation">
                    <div className="items-4">
                        <div className="text-wrapper-4">Page</div>

                        <div className="text-wrapper-4">Page</div>

                        <button className="button" onClick={() => navigate('/signup')}>
                            <div className="text-wrapper-5">Sign Up</div>
                        </button>
                    </div>

                    <div className="text-wrapper-6">FlavorShare</div>
                </div>

                <div className="hero-image" />

                <div className="text-wrapper-7">Recent Recipes</div>

                <div className="frame">
                    <div className="card">
                        <div className="image" />

                        <div className="copy">
                            <div className="text-wrapper-8">Recipe 1</div>

                            <p className="p">
                                Body text for whatever you’d like to add more to the subheading.
                            </p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="image-2" />

                        <div className="copy">
                            <div className="text-wrapper-8">Recipe 2</div>

                            <p className="p">
                                Body text for whatever you’d like to expand on the main point.
                            </p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="image-3" />

                        <div className="copy">
                            <div className="text-wrapper-8">Recipe 3</div>

                            <p className="p">
                                Body text for whatever you’d like to share more.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="image-4" />

                <div className="text-wrapper-9">About Us</div>

                <div className="text">
                    <div className="text-2">
                        <div className="text-wrapper-10">Who Are We?</div>

                        <p className="text-wrapper-11">
                            Body text for whatever you’d like to expand on the main point.
                        </p>
                    </div>

                    <div className="text-2">
                        <div className="text-wrapper-10">Mission Statement</div>

                        <p className="text-wrapper-11">
                            Body text for whatever you’d like to say. Add main takeaway
                            points, quotes, anecdotes.
                        </p>
                    </div>

                    <div className="text-2">
                        <div className="text-wrapper-8">Subheading</div>

                        <p className="p">
                            Body text for whatever you’d like to add more to the main point.
                            It provides details, explanations, and context.
                        </p>
                    </div>
                </div>

                <div className="buttons">
                    <button className="div-wrapper">
                        <div className="text-wrapper-12">Button</div>
                    </button>

                    <button className="button-2">
                        <div className="text-wrapper-13">Secondary button</div>
                    </button>
                </div>

                <div className="section">
                    <div className="buttons-2">
                        <button className="button-3">
                            <div className="text-wrapper-12">Button</div>
                        </button>

                        <button className="button-4">
                            <div className="text-wrapper-14">Secondary button</div>
                        </button>
                    </div>

                    <div className="text-wrapper-15">Section heading</div>
                </div>

                <div className="copy-2">
                    <div className="page-title">
                        <div className="text-wrapper-16">Welcome to FlavorShare!</div>

                        <p className="text-wrapper-17">
                            FlavorShare provides a user-friendly, web-based platform for
                            culinary enthusiasts to store, manage, and search for recipes
                        </p>
                    </div>

                    <button className="button-3" onClick={() => navigate('/signup')}>
                        <div className="text-wrapper-12">Sign up today</div>
                    </button>
                </div>
            </div>
        </div>
    );
};
