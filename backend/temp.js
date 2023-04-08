require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("./config/passport");
const f = require("./models/freelancerSchema");
const a = require("./models/adSchema");
const c = require("./models/clientSchema");

app.use(cors());

const PORT = process.env.PORT || 8080;

app.set("port", PORT);

// Parsing the request parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assests"));
app.use(require("./middlewares/auth").setAuthenticatedUser);

//Telling app to use passport
app.use(passport.initialize());
// app.use(passport.session());

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
app.get("/ads", async (req, res) => {
  // const d = await fetch("http://localhost:8080/ads");
  // console.log(d);
  res.json([
    {
      id: 1,
      ServiceName: "Graphics & Design",
      Description: "Build your own brand",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png",
      link: "/categories/graphics-and-design",
    },
    {
      id: 2,
      ServiceName: "Video & Animation",
      Description: "Engage your audience",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png",
      link: "/categories/video-and-animation",
    },
    {
      id: 3,
      ServiceName: "Writing and Translation",
      Description: "Showcase your story",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png",
      link: "/categories/writing-and-translation",
    },
    {
      id: 4,
      ServiceName: "AI Services",
      Description: "Discover the power of AI",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png",
      link: "/categories/ai-services",
    },
    {
      id: 5,
      ServiceName: "Digital Marketing",
      Description: "Unlock growth online",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png",
      link: "/categories/digital-marketing",
    },
    {
      id: 6,
      ServiceName: "Music and Audio",
      Description: "Share your message!",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png",
      link: "/categories/music-and-audio",
    },
    {
      id: 7,
      ServiceName: "Programming and Tech",
      Description: "Unlock power of computing",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png",
      link: "/categories/programming-and-tech",
    },
    {
      id: 8,
      ServiceName: "Business",
      Description: "Learn your business!",
      ImageLink:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png",
      link: "/categories/business",
    },
  ]);
});
//Use express router
app.use("/api", require("./routes/index.js"));

module.exports = app;
