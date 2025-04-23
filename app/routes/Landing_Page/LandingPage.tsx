import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { JSX } from "react";
import "../../style.css";

interface Recipe {
  _id: string;
  name: string;
  description: string;
  likes: number;
  createdAt: string;
}

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);
    fetchPopularRecipes();
  }, []);

  const fetchPopularRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3001/recipe/popular');
      const data = await response.json();
      if (data.recipes) {
        setPopularRecipes(data.recipes);
      }
    } catch (error) {
      console.error('Error fetching popular recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuthAndNavigate = (path: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const footerNavigation = [
    {
      title: "Topic",
      links: ["Page", "Page", "Page"],
    },
    {
      title: "Topic",
      links: ["Page", "Page", "Page"],
    },
    {
      title: "Topic",
      links: ["Page", "Page", "Page"],
    },
  ];

  const aboutSections = [
    {
      title: "Who Are We?",
      content: "At FullStack Kitchen, we are a passionate team of developers dedicated to creating intuitive, accessible, and powerful solutions for culinary enthusiasts. Our app, FlavorShare, aims to revolutionize the way home cooks and food lovers organize, manage, and share their recipes. With a focus on simplicity and functionality, we are building a platform that enhances the cooking experience by providing an interactive and user-friendly recipe management system. Whether you're storing a cherished family recipe or discovering new culinary inspirations, we strive to make cooking more enjoyable, efficient, and connected.",
    },
    {
      title: "Mission Statement",
      content:
        "Our mission is to empower home cooks, food enthusiasts, and culinary creators by providing a seamless, organized, and social platform to store, share, and discover recipes. We believe that great cooking should be made easy, and with FlavorShare, we are dedicated to turning recipes into something more than just instructions—they're a way to connect, share, and inspire others in the kitchen.",
    },
    {
      title: "Subheading",
      content:
        "Organize, Share, Discover—Your Recipes, Your Flavor.",
    },
  ];

  const socialIcons = [
    { icon: <Facebook className="w-5 h-5" />, alt: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, alt: "Twitter" },
    { icon: <Youtube className="w-5 h-5" />, alt: "Youtube" },
    { icon: <Instagram className="w-5 h-5" />, alt: "Instagram" },
  ];

  return (
    <div className="bg-[#e6d8cc] flex flex-row justify-center w-full">
      <div className="bg-collection-1-color-2 w-full max-w-[1440px] relative">
        {/* Header */}
        <header className="w-full h-[164px] bg-collection-1-color-3">
          <div className="flex items-center justify-between px-20 py-14">
            <div className="font-body-text text-[#5a4d3f]" onClick={() => navigate('/')}>FlavorShare</div>
            <div className="flex items-center gap-[var(--variable-collection-spacing-m)]">
              <div className="font-body-text text-[#5a4d3f] cursor-pointer" onClick={() => checkAuthAndNavigate('/recipe')}>Create a Recipe</div>
              <div className="font-body-text text-[#5a4d3f] cursor-pointer" onClick={() => checkAuthAndNavigate('/search')}>Search</div>
              <Button 
                className="bg-[#5a4d3f] text-white rounded-lg shadow-button-shadow cursor-pointer"
                onClick={() => isAuthenticated ? navigate('/profile') : navigate('/login')}
              >
                {isAuthenticated ? 'Profile' : 'Log In'}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Info Section */}
        <section className="flex flex-col w-[844px] items-start gap-10 pt-[212px] px-20">
          <div className="flex flex-col items-start gap-6 w-full">
            <h1 className="[font-family:'Inter-Bold',Helvetica] font-bold text-[#5a4d3f] text-[64px] tracking-[-1.28px] leading-[normal]">
              Welcome to FlavorShare!
            </h1>
            <p className="font-subheading text-[#2c0808bf]">
              FlavorShare provides a user-friendly, web-based platform for
              culinary enthusiasts to store, manage, and search for recipes
            </p>
          </div>
          <Button className="bg-[#5a4d3f] text-white px-8 py-5 rounded-lg shadow-button-shadow text-2xl"
           onClick={() => navigate("/register")}>
            Sign up today
          </Button>
        </section>

        {/* Main Image */}
        <div className="w-[1280px] h-[640px] mt-[337px] mx-16 rounded-lg bg-[url(https://file.garden/ZaN3pZzqMBk7KeIf/Hero%20Image.png)] bg-cover bg-[50%_50%]" />

        {/* Popular Recipes Section */}
        <section className="mt-[181px] px-20">
          <h2 className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#5a4d3f] text-5xl tracking-[-0.96px] leading-[normal] mb-[107px]">
            Popular Recipes
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-[405px]">
              <p className="text-[#5a4d3f] text-xl">Loading recipes...</p>
            </div>
          ) : popularRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRecipes.map((recipe) => (
                <div 
                  key={recipe._id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-[#5a4d3f]">{recipe.name}</h3>
                    <p className="text-gray-600 mt-2">{recipe.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[#5a4d3f]">❤️ {recipe.likes}</span>
                      <button 
                        className="bg-[#5a4d3f] text-white px-4 py-2 rounded-lg cursor-pointer"
                        onClick={() => navigate(`/recipe/${recipe._id}`)}
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[405px]">
              <p className="text-[#5a4d3f] text-xl">No popular recipes found</p>
            </div>
          )}
        </section>

        {/* About Us Section */}
        <section className="mt-[246px] px-20 flex">
          <div className="w-[624px]">
            <h2 className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#5a4d3f] text-5xl tracking-[-0.96px] leading-[normal] mb-[107px]">
              About Us
            </h2>

            <div className="flex flex-col w-[516px] gap-12 ml-[59px]">
              {aboutSections.map((section, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start justify-center gap-2 w-full"
                >
                  <h3 className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#5a4d3f] text-2xl tracking-[0] leading-9">
                    {section.title}
                  </h3>
                  <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#5f403b] text-2xl tracking-[0] leading-9">
                    {section.content}
                  </p>
                </div>
              ))}

              <div className="flex items-center gap-4 mt-[107px]">
                <Button className="bg-[#5a4d3f] text-white px-6 py-3 rounded-lg shadow-button-shadow">
                  Button
                </Button>
                <Button
                  variant="outline"
                  className="bg-[#e6e6e6] text-[#5a4d3f] px-6 py-3 rounded-lg shadow-button-shadow"
                >
                  Secondary button
                </Button>
              </div>
            </div>
          </div>

          <div className="w-[704px] h-[704px] rounded-[8px_0px_0px_8px] bg-[url(https://file.garden/ZaN3pZzqMBk7KeIf/Image.png)] bg-cover bg-[50%_50%]" />
        </section>

        {/* CTA Section */}
        <section className="mt-[269px] w-full h-[236px] bg-collection-1-color-4 flex items-center justify-between px-20">
          <h2 className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#5a4d3f] text-5xl tracking-[-0.96px] leading-[normal]">
            Section heading
          </h2>
          <div className="flex items-center gap-6">
            <Button className="bg-[#5a4d3f] text-white px-8 py-5 rounded-lg shadow-button-shadow text-2xl">
              Button
            </Button>
            <Button className="bg-[#b38d53] text-[color:var(--colors-text-text-default)] px-8 py-5 rounded-lg shadow-button-shadow text-2xl">
              Secondary button
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full h-[264px] bg-collection-1-color-3 mt-[236px]">
          <Separator className="w-[1280px] mx-20" />

          <div className="px-20 py-12">
            <h3 className="font-subheading text-[#5a4d3f] mb-[44px]">
              Contact
            </h3>

            <div className="flex justify-between">
              <div className="flex items-start gap-[var(--variable-collection-spacing-XS)]">
                {socialIcons.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded"
                  >
                    <div className="w-6 h-6">{social.icon}</div>
                  </Button>
                ))}
              </div>

              <div className="flex gap-[32px]">
                {footerNavigation.map((column, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-[187px] items-end gap-[var(--variable-collection-spacing-s)]"
                  >
                    <div className="font-small-text text-[#5a4d3f]">
                      {column.title}
                    </div>
                    {column.links.map((link, linkIndex) => (
                      <div
                        key={linkIndex}
                        className="font-small-text text-[#555555]"
                      >
                        {link}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
