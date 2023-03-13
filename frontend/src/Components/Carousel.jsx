import { Card } from "./Card";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function Carousel() {

const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 400;
}
const scrollRight = () => {
    document.getElementById("content").scrollLeft += 400;
}


  return (
    <div className="relative">
      <div className="absolute right-0 top-5 ">
        <button onClick={scrollLeft} className="p-2 m-2 rounded-full bg-white">
          <FiChevronLeft />
        </button>
        <button onClick={scrollRight} className="p-2 m-2 rounded-full bg-white">
          <FiChevronRight />
        </button>
      </div>
      <div id="content" className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide">
        <div>
          <Card id={1} ServiceName={"Web Development"} Description={"Web development is coool!"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink={"/"}/>
        </div>
        <div>
          <Card id={1} ServiceName={"Web Development"} Description={"Web development is coool!"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink={"/"}/>
        </div>
        <div>
          <Card id={1} ServiceName={"Web Development"} Description={"Web development is coool!"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink={"/"}/>
        </div>
        <div>
          <Card id={1} ServiceName={"Web Development"} Description={"Web development is coool!"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink={"/"}/>
        </div>
        <div>
          <Card id={1} ServiceName={"Web Development"} Description={"Web development is coool!"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink={"/"}/>
        </div>
        <div>
          <Card id={1} ServiceName={"Web Development"} Description={"Web development is coool!"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink={"/"}/>
        </div>
        <div>
          <Card id={1} ServiceName={"Web Development"} Description={"Web development is coool!"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink={"/"}/>
        </div>
        <div>
          <Card id={1} ServiceName={"Web Development"} Description={"Web development is coool!"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink={"/"}/>
        </div>
        <div>
          <Card id={1} ServiceName={"Web Development"} Description={"Web development is coool!"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink={"/"}/>
        </div>
        
      </div>
    </div>
  );
}

export default Carousel;
