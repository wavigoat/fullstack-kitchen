import React, { useState, useEffect, type JSX } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import "../../style.css";

export default function ViewRecipe(): JSX.Element {
    const navigate = useNavigate();
    const { id } = useParams();
    const [recipe, setRecipe] = useState<{ name: string; description: string } | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:3001/recipe/get/${id}`);
                if (!response.ok) {
                    throw new Error('Recipe not found');
                }
                const data = await response.json();
                setRecipe(data.recipe);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setError(error instanceof Error ? error.message : 'Failed to load recipe');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#e6d8cc] flex items-center justify-center">
                <div className="text-[#5a4d3f] text-xl">Loading...</div>
            </div>
        );
    }

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
                    {error ? (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    ) : recipe ? (
                        <Card className="w-full max-w-2xl">
                            <CardContent className="p-8">
                                <h1 className="text-4xl font-bold text-[#5a4d3f] mb-6">{recipe.name}</h1>
                                <p className="text-[#5a4d3f] text-lg">{recipe.description}</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="text-[#5a4d3f] text-xl">Recipe not found</div>
                    )}
                </div>
            </main>
        </div>
    );
} 