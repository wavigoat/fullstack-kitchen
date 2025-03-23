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
    route("search","./routes/Search_Page/Search.tsx")
] satisfies RouteConfig;
