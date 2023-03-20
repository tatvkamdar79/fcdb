require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const db = require("./config/mongoose");
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 8080;

app.set("port", PORT);

// Parsing the request parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assests"));

//Initializing passport
// const passport = require("passport")
// app.use(passport.initialize())
// app.use(passport.session())
// require('./services/passport');

//Managing cookies
// const cookieSession = require("cookie-session")
// app.use(
//     cookieSession({
//         maxAge:30*24*60*60*1000,
//         keys:[process.env.cookieKey]
//     })
// )

//Importing OAuth routes
// const authRoutes = require('./routes/OAuth');
// authRoutes(app);

app.get("/ads", (req, res) => {
  res.json([
    {
      id: 1,
      ServiceName: "Logo Design",
      Description: "Build your own brand",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png",
    },
    {
      id: 2,
      ServiceName: "Voice Over",
      Description: "Share your message!",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png",
    },
    {
      id: 3,
      ServiceName: "Word Press",
      Description: "Customize your site!",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png",
    },
    {
      id: 4,
      ServiceName: "Video Explainer",
      Description: "Engage your audience",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png",
    },
    {
      id: 5,
      ServiceName: "SEO",
      Description: "Unlock growth online!",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png",
    },
    {
      id: 6,
      ServiceName: "Illustration",
      Description: "Color your Dreams!",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png",
    },
    {
      id: 7,
      ServiceName: "Data Entry",
      Description: "Learn your business",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png",
    },
    {
      id: 8,
      ServiceName: "Book Covers",
      Description: "Showcase your story",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png",
    },
  ]);
});

//Use express router
// app.use("/", require("./routes/index.js"));

app.listen(PORT, () => {
  console.log("Yay");
});
