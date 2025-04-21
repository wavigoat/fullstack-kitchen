// Import necessary modules and assets
import React, { type JSX } from "react";
import { useNavigate } from "react-router";
import icon from "../../assets/icons/Icon.png";
import icon2 from "../../assets/icons/Icon-1.png";
import icon3 from "../../assets/icons/Icon-2.png";
import icon4 from "../../assets/icons/Icon-3.png";
import "../../style.css";

// Define the Profile component
export default function Profile(): JSX.Element {
    // Main container for the profile page
    const navigate = useNavigate();
    return (
        <div className="profile">
            {/* Profile section */}
            <div className="div">
                <button className="button">
                    <div className="text-wrapper">Saved Recipes</div>
                </button>
                {/* Section for user's recipes */}
                <div className="text-wrapper-2">My Recipes</div>

                <div className="copy">
                    <div className="product-name">User Name</div>

                    <p className="description">
                        Hi, this is where the user’s description will go. To the left will
                        be the user’s profile picture. The bottom button should take users
                        to their saved recipes.
                        <br />
                        <br />
                        This should be unique to every user, and should be what it links to
                        when “My profile” is selected”
                        <br />
                        <br />
                        Upper bar should change depending on whether a user is signed in,
                        and my profile should be up there.
                        <br />
                        <br />
                        User profiles should be adjusted to be different when someone is not
                        looking at the profile, so that saved recipes button is not here.
                    </p>
                </div>

                <div className="image" />
                {/* Header section */}
                <div className="navigation">
                    <div className="overlap-group">
                        

                        <div className="navigation">
                            <div className="items-2">
                                <div className="text-wrapper-3" onClick={() => navigate('/recipe')}>Create a Recipe</div>

                                <div className="text-wrapper-3" onClick={() => navigate('/search')}>Search</div>

                                <button className="div-wrapper">
                                    <div className="text-wrapper-6" onClick={() => navigate('/profile')}>Profile</div>
                                </button>
                            </div>

                            <div className="text-wrapper-5">FlavorShare</div>
                        </div>
                    </div>
                </div>
                {/* Footer section */}
                <div className="navigation-footer">
                    <div className="items-3">
                        <div className="text-wrapper-7">Topic</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>
                    </div>

                    <div className="items-4">
                        <div className="text-wrapper-7">Topic</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>
                    </div>

                    <div className="items-5">
                        <div className="text-wrapper-7">Topic</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>
                    </div>

                    <div className="text-wrapper-9">Site name</div>

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
                
                {/* Grid of recipe cards */}
                <div className="card-grid">
                    <div className="card">
                        <div className="image-2" />

                        <div className="copy-2">
                            <div className="text-wrapper-10">Recipe 1</div>

                            <div className="text-wrapper-11">
                                Description of first product
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="image-3" />

                        <div className="copy-2">
                            <div className="text-wrapper-10">Recipe 2</div>

                            <div className="text-wrapper-11">
                                Description of second product
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="image-4" />

                        <div className="copy-2">
                            <div className="text-wrapper-10">Recipe 3</div>

                            <div className="text-wrapper-11">
                                Description of third product
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="image-5" />

                        <div className="copy-2">
                            <div className="text-wrapper-10">Recipe 4</div>

                            <div className="text-wrapper-11">
                                Description of fourth product
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="image-6" />

                        <div className="copy-2">
                            <div className="text-wrapper-10">Recipe 5</div>

                            <div className="text-wrapper-11">
                                Description of fifth product
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="image-7" />

                        <div className="copy-2">
                            <div className="text-wrapper-10">Recipe 6</div>

                            <div className="text-wrapper-11">
                                Description of sixth product
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
