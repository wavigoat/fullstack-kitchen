import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import type { JSX } from "react";
import "../../style.css";



export default function LandingPage(): JSX.Element {
  // Footer navigation data
  const navigate = useNavigate();
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

  // Recent recipes data
  const recentRecipes = [
    {
      id: 1,
      title: "Recipe 1",
      description:
        "Body text for whatever you'd like to add more to the subheading.",
      imageBg: "bg-[url(https://file.garden/ZaN3pZzqMBk7KeIf/Image-1.png)]",
    },
    {
      id: 2,
      title: "Recipe 2",
      description:
        "Body text for whatever you'd like to expand on the main point.",
      imageBg: "bg-[url(https://file.garden/ZaN3pZzqMBk7KeIf/Image-2.png)]",
    },
    {
      id: 3,
      title: "Recipe 3",
      description: "Body text for whatever you'd like to share more.",
      imageBg: "bg-[url(https://file.garden/ZaN3pZzqMBk7KeIf/Image-3.png)]",
    },
  ];

  // About us sections data
  const aboutSections = [
    {
      title: "Who Are We?",
      content: "Body text for whatever you'd like to expand on the main point.",
    },
    {
      title: "Mission Statement",
      content:
        "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes.",
    },
    {
      title: "Subheading",
      content:
        "Body text for whatever you'd like to add more to the main point. It provides details, explanations, and context.",
    },
  ];

  // Social media icons
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
              <div className="font-body-text text-[#5a4d3f]">Page</div>
              <div className="font-body-text text-[#5a4d3f]">Page</div>
              <Button className="bg-[#5a4d3f] text-white rounded-lg shadow-button-shadow"
              onClick={() => navigate("/signup")}>
                Log In
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
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
           onClick={() => navigate("/signup")}>
            Sign up today
          </Button>
        </section>

        {/* Hero Image */}
        <div className="w-[1280px] h-[640px] mt-[337px] mx-16 rounded-lg bg-[url(https://file.garden/ZaN3pZzqMBk7KeIf/Hero%20Image.png)] bg-cover bg-[50%_50%]" />

        {/* Recent Recipes Section */}
        <section className="mt-[181px] px-20">
          <h2 className="[font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#5a4d3f] text-5xl tracking-[-0.96px] leading-[normal] mb-[107px]">
            Recent Recipes
          </h2>

          <div className="flex items-center gap-8">
            {recentRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="flex-1 bg-transparent border-none"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col items-start gap-6">
                    <div
                      className={`w-full h-[405px] rounded-lg ${recipe.imageBg} bg-cover bg-[50%_50%]`}
                    />
                    <div className="flex flex-col w-full items-start justify-center gap-1">
                      <h3 className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#5a4d3f] text-2xl tracking-[0] leading-9">
                        {recipe.title}
                      </h3>
                      <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-[#5f403b] text-2xl tracking-[0] leading-9">
                        {recipe.description}
                      </p>
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
