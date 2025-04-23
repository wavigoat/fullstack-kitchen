import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router";
import type { Route } from "../../../.react-router/types/app/routes/+types/home";
import "../../style.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search Recipes" },
    { name: "search", content: "Search for recipes!" },
  ];
}

interface RecipeItem {
  id: string;
  name: string;
  description: string;
}

export default function Search(): JSX.Element {
  // const [userFilters, setUserFilters] = useState({
  //   ingredients: [] as string[], 
  //   cookTime: "",
  //   difficulty: "",
  //   cuisine: "",
  //   dietary: [] as string[],
  // });
  //const [showFilters, setShowFilters] = useState(false);

  // const cuisineTypes = ["Italian", "Chinese", "Mexican", "Indian", "American", "Japanese"]; 
  // const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free"];
  // const cookTimes = ["< 30 mins", "30-60 mins", "1-2 hours", "> 2 hours"];
  // const difficultyLevels = ["Easy", "Medium", "Hard"];

  // const handleFilterChange = (category: string, value: string | string[]) => {
  //   setUserFilters(prev => ({
  //     ...prev, // takes the previous filters, which is "...prev" and updates only the requested category with the new value, keeping the rest filters the same.
  //     [category]: value
  //   }));
  // };

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState<RecipeItem[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };



  const handleSearch = async () => {
    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      const token = localStorage.getItem('token') ?? "";
      const response = await fetch(`http://localhost:3001/recipe/search/${encodedQuery}`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      
      const data = await response.json();
      setSearchResults(data.results.map((recipe: any) => ({
        id: recipe._id,
        name: recipe.name,
        description: recipe.description
      })));
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#e6d8cc]">
      {/* Page Header w/ navigation */}
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

      {/* Search Recipe Field */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold text-[#5a4d3f] mb-8">Search Recipes</h1>
          <div className="w-full max-w-2xl">
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                className="flex-1 p-3 rounded-lg border-2 border-[#5a4d3f] placeholder-gray-700"
                placeholder="Search for recipes..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button 
                className="bg-[#5a4d3f] text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                onClick={handleSearch}
              >
                <span className="text-xl inline-block transform -rotate-45">⚲</span> {/* magnifying glass for style */}
                Search
              </button>
            </div>
            
            {/* Filter field and the dropdown menus, options, etc.
            <button
              className="text-[#5a4d3f] font-medium mb-4 flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? '− Hide Filters' : '+ Show Filters'}
            </button>

            {showFilters && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[#5a4d3f] font-medium mb-2">Cook Time</label>
                    <select
                      className="w-full p-2 border-2 border-[#5a4d3f] rounded-lg bg-white text-[#5a4d3f]"
                      value={userFilters.cookTime}
                      onChange={(e) => handleFilterChange('cookTime', e.target.value)}
                    >
                      <option value="">Any Time</option>
                      {cookTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#5a4d3f] font-medium mb-2">Difficulty</label>
                    <select
                      className="w-full p-2 border-2 border-[#5a4d3f] rounded-lg bg-white text-[#5a4d3f]"
                      value={userFilters.difficulty}
                      onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                    >
                      <option value="">Any Difficulty</option>
                      {difficultyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#5a4d3f] font-medium mb-2">Cuisine</label>
                    <select
                      className="w-full p-2 border-2 border-[#5a4d3f] rounded-lg bg-white text-[#5a4d3f]"
                      value={userFilters.cuisine}
                      onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                    >
                      <option value="">Any Cuisine</option>
                      {cuisineTypes.map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                      ))}
                    </select>
                  </div>

                  <div className="lg:col-span-3">
                    <label className="block text-[#5a4d3f] font-medium mb-2">Dietary Restrictions</label>
                    <div className="flex flex-wrap gap-3">
                      {dietaryOptions.map(option => (
                        <button
                          key={option}
                          className={`px-3 py-1 rounded-full border-2 border-[#5a4d3f] ${
                            userFilters.dietary.includes(option)
                              ? 'bg-[#5a4d3f] text-white'
                              : 'bg-white text-[#5a4d3f]'
                          }`}
                          onClick={() => {
                            const newDietary = userFilters.dietary.includes(option)
                              ? userFilters.dietary.filter(item => item !== option)
                              : [...userFilters.dietary, option];
                            handleFilterChange('dietary', newDietary);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )} */}
            
          </div>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((recipe) => (
            <div 
              key={recipe.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#5a4d3f]">{recipe.name}</h3>
                <p className="text-gray-600 mt-2">{recipe.description}</p>
                <button 
                  className="mt-4 bg-[#5a4d3f] text-white px-4 py-2 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 