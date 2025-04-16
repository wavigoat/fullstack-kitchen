import React, { type JSX } from "react";
import icon from "../../assets/icons/Icon.png";
import icon2 from "../../assets/icons/Icon-1.png";
import icon3 from "../../assets/icons/Icon-2.png";
import icon4 from "../../assets/icons/Icon-3.png";
import "../../style.css";

export default function Recipe(): JSX.Element {
    return (
        <div className="recipe">
            <div className="div">
                <div className="text-wrapper">Related Recipes</div>

                <div className="image" />

                <div className="image-2" />

                <div className="image-3" />

                <p className="paragraph">
                    Recipe Instructions
                    <br />
                    Formatted as a step by step
                    <br />
                    Users can add notes like this
                    <br />a<br />b<br />c<br />d<br />
                    maybe it would be good if users can add images of the steps?
                </p>

                <div className="overlap">
                    <p className="p">
                        Recipe Ingredients
                        <br />
                        bulleted list of ingredients
                        <br />
                        should have measurements
                        <br />
                        maybe could have potential substitutes like this
                        <br />
                        idk what else to put
                        <br />a<br />b<br />c
                    </p>

                    <div className="overlap-group">
                        <div className="image-4" />

                        <div className="article-title">
                            <div className="text-wrapper-2">Recipe Name</div>
                        </div>
                    </div>

                    <p className="text-wrapper-3">
                        A brief description of the recipe, with a word limit to keep
                        concise.
                    </p>

                    <div className="text-wrapper-4">Cook Time:</div>

                    <div className="text-wrapper-5">Author Name</div>

                    <div className="text-wrapper-6">Categories</div>
                </div>

                <div className="navigation-footer">
                    <div className="items">
                        <div className="text-wrapper-7">Topic</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>
                    </div>

                    <div className="items-2">
                        <div className="text-wrapper-7">Topic</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>

                        <div className="text-wrapper-8">Page</div>
                    </div>

                    <div className="items-3">
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
                                <img className="icon-2" alt="Icon" src={icon4} />
                            </div>
                        </div>

                        <div className="buttons-icon">
                            <div className="icon">
                                <img className="icon-3" alt="Icon" src={icon2} />
                            </div>
                        </div>

                        <div className="buttons-icon">
                            <div className="icon">
                                <img className="img" alt="Icon" src={icon3} />
                            </div>
                        </div>
                    </div>

                    
                </div>

                <div className="cards">
                    <div className="card">
                        <div className="image-5" />

                        <div className="copy">
                            <div className="text-wrapper-10">Recipe 1</div>

                            <div className="text-wrapper-11">Short Description</div>
                        </div>
                    </div>

                    <div className="card-2">
                        <div className="image-6" />

                        <div className="copy">
                            <div className="text-wrapper-10">Recipe 2</div>

                            <div className="text-wrapper-11">Short Description</div>
                        </div>
                    </div>

                    <div className="card-2">
                        <div className="image-6" />

                        <div className="copy">
                            <div className="text-wrapper-10">Recipe 3</div>

                            <div className="text-wrapper-11">Short Description</div>
                        </div>
                    </div>
                </div>

                <div className="navigation">
                    <div className="items-4">
                        <div className="text-wrapper-12">Page</div>

                        <div className="text-wrapper-12">Page</div>

                        <button className="button">
                            <div className="text-wrapper-13">Log In</div>
                        </button>
                    </div>

                    <div className="text-wrapper-14">FlavorShare</div>
                </div>
            </div>
        </div>
    );
};
