import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    route("login","./routes/Login_Page/Login.tsx"),
    route("register","./routes/Signup_Page/Signup.tsx")
] satisfies RouteConfig;
