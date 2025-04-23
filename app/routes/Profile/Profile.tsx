import React, { type JSX, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import icon from "../../assets/icons/Icon.png";
import icon2 from "../../assets/icons/Icon-1.png";
import icon3 from "../../assets/icons/Icon-2.png";
import icon4 from "../../assets/icons/Icon-3.png";
import "../../style.css";

export default function Profile(): JSX.Element {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        bio: "",
        image: "",
        username: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            const response = await fetch('http://localhost:3001/account/info', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                localStorage.removeItem('token');
                navigate('/');
                return;
            }

            const data = await response.json();
            setProfile(data.user);
        } catch (err) {
            localStorage.removeItem('token');
            navigate('/');
            setError(err instanceof Error ? err.message : 'Failed to fetch profile');
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const updateData = {
                name: profile.name,
                bio: profile.bio,
                image: profile.image
            };

            const response = await fetch('http://localhost:3001/account/update', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                setError("");
                await fetchProfile();
            } else {
                const errorData = await response.json().catch(() => ({}));
                setIsEditing(false);
                throw new Error(errorData.error || 'Failed to update profile');
            }
        } catch (err) {
            console.error('Update error:', err);
            setError(err instanceof Error ? err.message : 'Failed to update profile');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const signOutUser = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="profile">
            {/* Profile section */}
            <div className="div">
                <button className="button" onClick={() => navigate('/saved-recipes')}>
                    <div className="text-wrapper">Saved Recipes</div>
                </button>
                {/* Section for user's recipes */}
                <div className="text-wrapper-2">My Recipes</div>

                <div className="copy">
                    {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                    
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                                placeholder="Your name"
                                className="label-wrapper"
                                style={{ marginBottom: '1rem' }}
                            />
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleInputChange}
                                placeholder="Your bio"
                                className="description"
                                style={{ marginBottom: '1rem' }}
                            />
                            <input
                                type="text"
                                name="image"
                                value={profile.image}
                                onChange={handleInputChange}
                                placeholder="Profile image URL"
                                className="label-wrapper"
                                style={{ marginBottom: '1rem' }}
                            />
                            <button className="div-wrapper" onClick={() => {
                                handleUpdateProfile();
                                setIsEditing(false);
                            }}>
                                <div className="text-wrapper-6">Save Changes</div>
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="product-name">{profile.name || profile.username}</div>
                            <p className="description">{profile.bio || "No bio yet"}</p>
                            <button className="div-wrapper" onClick={() => setIsEditing(true)}>
                                <div className="text-wrapper-6">Edit Profile</div>
                            </button>
                        </>
                    )}
                </div>

                <div className="image" style={{ backgroundImage: profile.image ? `url(${profile.image})` : 'none' }} />
                {/* Header section */}
                <nav className="bg-[#e6d8cc] p-4 flex justify-between items-center">
                    <div className="text-[#5a4d3f] text-xl cursor-pointer" onClick={() => navigate('/')}>
                        FlavorShare
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-[#5a4d3f] cursor-pointer" onClick={() => navigate('/recipe')}>
                            Create a Recipe
                        </div>
                        <div className="text-[#5a4d3f] cursor-pointer" onClick={() => navigate('/search')}>
                            Search
                        </div>
                        <button className="bg-[#5a4d3f] text-white px-4 py-2 rounded-lg">
                            Profile
                        </button>
                        <button className="bg-[#5a4d3f] cursor-pointer text-white px-4 py-2 rounded-lg" onClick={signOutUser}>
                            Sign Out
                        </button>
                    </div>
                </nav>
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
