import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import "../../style.css";

export default function Recipe(): JSX.Element {
    const navigate = useNavigate();
    const [recipeName, setRecipeName] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            setError("Please log in to create a recipe");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/recipe/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: recipeName,
                    description: recipeDescription
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create recipe');
            }

            const data = await response.json();
            navigate(`/recipe/${data.uuid}`);
        } catch (error) {
            console.error('Error creating recipe:', error);
            setError(error instanceof Error ? error.message : 'Failed to create recipe');
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
                    <Button 
                        variant="default"
                        className="bg-[#5a4d3f] text-white"
                        onClick={() => navigate('/profile')}
                    >
                        Profile
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold text-[#5a4d3f] mb-8">Create New Recipe</h1>
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    <Card className="w-full max-w-2xl">
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="recipeName" className="block text-[#5a4d3f] font-medium mb-2">
                                        Recipe Name
                                    </label>
                                    <input
                                        type="text"
                                        id="recipeName"
                                        value={recipeName}
                                        onChange={(e) => setRecipeName(e.target.value)}
                                        required
                                        className="w-full p-3 border-2 border-[#5a4d3f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a4d3f] text-[#5a4d3f]"
                                        placeholder="Enter recipe name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="recipeDescription" className="block text-[#5a4d3f] font-medium mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="recipeDescription"
                                        value={recipeDescription}
                                        onChange={(e) => setRecipeDescription(e.target.value)}
                                        required
                                        className="w-full p-3 border-2 border-[#5a4d3f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a4d3f] min-h-[150px] text-[#5a4d3f]"
                                        placeholder="Enter recipe description"
                                    />
                                </div>
                                <Button 
                                    type="submit" 
                                    className="w-full bg-[#5a4d3f] text-white hover:bg-[#4a3d2f] transition-colors"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Creating..." : "Create Recipe"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
