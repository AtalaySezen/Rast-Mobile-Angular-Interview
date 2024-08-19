const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const socialMediaRoutes = require("./routes/socialMedia");
const tokenRoutes = require("./routes/token");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/socialMedia", socialMediaRoutes);
app.use("/api/token", tokenRoutes);

app.get("/", (req, res) => {
  res.send(`
      <html>
        <head>
          <title>Rast Mobile Node.JS</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #fff;
              text-align: center;
              padding: 50px;
            }
            h1 {
              color: #744BFC;
            }
          </style>
        </head>
        <body>
          <h1>Rast Mobile</h1>
        </body>
      </html>
    `);
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
