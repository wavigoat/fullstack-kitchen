import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";
import "./style.css";
import "./styleguide.css";

export default [
    index("./routes/home.tsx"),
    route("login","./routes/Login_Page/Login.tsx"),
    route("register","./routes/Signup_Page/Signup.tsx"),
    route("profile","./routes/Profile/Profile.tsx"),
    route("search","./routes/Search_Page/Search.tsx"),
    route("recipe","./routes/Recipe_Page/Recipe.tsx"),
    route("recipe/:id","./routes/Recipe_Page/ViewRecipe.tsx"),
    route("saved-recipes","./routes/Saved_Recipes/SavedRecipes.tsx")
] satisfies RouteConfig;
