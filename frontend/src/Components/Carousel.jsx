import { Card } from "./Card";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Carousel = () => {
  let cards = [
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
  ];
  // cards = cards * 2;
  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 600;
  };
  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 600;
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute z-50 left-0 bottom-[43%] p-2 m-2 rounded-full bg-white border-2 border-blue hover:scale-125 transition duration-300"
      >
        <FiChevronLeft className="text-black" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute z-50 right-0 bottom-[43%] p-2 m-2 rounded-full bg-white border-2 border-blue hover:scale-125 transition duration-300"
      >
        <FiChevronRight className="text-black" />
      </button>
      <div className="flex">
        <div
          id="content"
          className="p-4 flex gap-x-2 items-center justify-start overflow-x-auto scroll-smooth"
        >
          {cards.map(({ id, ServiceName, Description, ImageLink }) => (
            <Card
              key={id}
              id={id}
              ServiceName={ServiceName}
              Description={Description}
              ImageLink={ImageLink}
              RedirectLink={"#"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
