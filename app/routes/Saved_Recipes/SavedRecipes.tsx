import React, { useState, useEffect, type JSX } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../../components/ui/card";
import "../../style.css";

export default function SavedRecipes(): JSX.Element {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSavedRecipes();
    }, []);

    const fetchSavedRecipes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:3001/account/info', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }

            const userData = await response.json();
            const userId = userData.user._id;

            const recipesResponse = await fetch(`http://localhost:3001/recipe/getall/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!recipesResponse.ok) {
                throw new Error('Failed to fetch saved recipes');
            }

            const recipesData = await recipesResponse.json();
            setRecipes(recipesData.recipe || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch saved recipes');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#e6d8cc]">
            {/* Navigation Header */}
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
                    <button 
                        className="bg-[#5a4d3f] text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate('/profile')}
                    >
                        Profile
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold text-[#5a4d3f] mb-8">Saved Recipes</h1>
                    
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="text-[#5a4d3f]">Loading recipes...</div>
                    ) : recipes.length === 0 ? (
                        <div className="text-[#5a4d3f]">No saved recipes found.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {recipes.map((recipe: any) => (
                                <Card key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="h-48 bg-gray-200"></div>
                                    <CardContent className="p-4">
                                        <h3 className="text-xl font-semibold text-[#5a4d3f]">{recipe.name}</h3>
                                        <p className="text-gray-600 mt-2">{recipe.description}</p>
                                        <button 
                                            className="mt-4 bg-[#5a4d3f] text-white px-4 py-2 rounded-lg"
                                            onClick={() => navigate(`/recipe/${recipe._id}`)}
                                        >
                                            View Recipe
                                        </button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
} 