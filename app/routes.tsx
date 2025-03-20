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
    route("signup","./routes/Signup_Page/Signup.tsx"),
    route("profile","./routes/Profile/Profile.tsx")
] satisfies RouteConfig;
