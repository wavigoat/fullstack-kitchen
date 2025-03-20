
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import express from "express";
import App from "./app";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
    const context = {};
    const html = renderToString(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    );

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Fullstack Kitchen</title>
            </head>
            <body>
                <div id="root">${html}</div>
                <script src="/static/client.js"></script>
            </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});