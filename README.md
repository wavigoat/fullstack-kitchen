As an avid cook, my recipes can often have a lot of variety which can sometimes make it hard to memorize the entire recipe off the top of my head, the traditional way of managing recipes in physical cookbooks or scattered digital notes can be inefficient and cumbersome. Your challenge is to develop a virtual recipe book application that addresses this problem by providing a user-friendly, web-based platform for culinary enthusiasts to store, manage, and search for recipes.

This virtual recipe book should allow users to input their own recipes, including details such as ingredients, cooking time, preparation steps, and (optional) photos. A key feature of your application will be its robust search functionality, enabling users to find recipes based on various criteria like recipe name, ingredients, total preparation and cooking time, custom categories, and more.

ex: recipekeeperonline, allrecipes, any website that lets users upload their own recipes and store it, sharing it with others is optional
Develop a solution that addresses the challenge statement and meets the following specifications and expectations:

Specifications:
Implements some form of user authentication
Implements a dynamic database of user and/or item data
Implements one or more “operations” involving some form of frontend-backend-database communication

Expectations:
Databases can use any existing dataset or have dummy data. Databases using datasets should have at least 100 items. There can be exceptions based on the specific project.
New User creation/registration should be available
UI design should contain elements commonly found or expected such as a user profile, login, logout.
Consideration for design aesthetics
System should be dynamic and responsive
Basic search functionality as well as basic filtering functionality for recipes
Users should not be able to access other users' recipes


We are going to create a platform where users can store recipes by inputting them into our web app. Users will be able to type in an ingredient, followed by an optional quantity category (ex: ¼ tsp, 1 cup, etc.), and optionally upload a picture of their completed recipe (if no picture is added, we could maybe use an AI image generation API such as DALL-E to generate a couple images for the user to pick from, or just leave it blank). Users will also have the ability to import a recipe from elsewhere in JSON format. 
Users will be able to search their recipes in two ways, by name, or by ingredient(s).
Users will have the option to “post” recipes for others to see & share, which will be a feature similar to some social media platforms such as instagram, but they can also be kept private.
