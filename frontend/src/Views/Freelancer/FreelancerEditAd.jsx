import { Carousel } from "@mantine/carousel";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BsBookmark, BsCheck2Circle } from "react-icons/bs";
import { FaClock, FaUserCircle } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../../App";
import { getCookie } from "../../Hooks/useCookies";

const FreelancerEditAd = () => {
  const { state } = useLocation();
  const ad = state;
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const currentUser = user.user;

  const [title, setTitle] = useState(ad.title);
  const [shortDescription, setShortDescription] = useState(ad.shortDescription);
  const [description, setDescription] = useState(ad.description);
  const [category, setCategory] = useState(ad.category);
  const [deliveryTime, setDeliveryTime] = useState(ad.deliveryTime);
  const [price, setPrice] = useState(ad.price);
  const [revisions, setRevisions] = useState(ad.revisions);
  const [tags, setTags] = useState(ad.tags);

  const goToPreviousSlide = () => {
    document.getElementsByClassName("mantine-UnstyledButton-root")[0].click();
  };
  const goToNextSlide = () => {
    document.getElementsByClassName("mantine-UnstyledButton-root")[1].click();
  };

  const categories = [
    { id: 1, name: "Graphics and Design", value: "graphics-and-design" },
    { id: 2, name: "Video and Animation", value: "video-and-animation" },
    {
      id: 3,
      name: "Writing and Translation",
      value: "writing-and-translation",
    },
    { id: 4, name: "AI Services", value: "ai-services" },
    { id: 5, name: "Digital Marketing", value: "digital-marketing" },
    { id: 6, name: "Music and Audio", value: "music-and-audio" },
    { id: 7, name: "Programming and tech", value: "programming-and-tech" },
    { id: 8, name: "Business", value: "business" },
  ];

  const createAdFormValidator = async (e) => {
    e.preventDefault();
    const updatedAd = {
      title: title,
      shortDescription: shortDescription,
      description: description,
      category: category,
      deliveryTime: deliveryTime,
      revisions: revisions,
      //   tags: tags,
      viewState: ad.viewState,
      price: price,
    };
    let modified = false;
    for (let key of Object.keys(updatedAd)) {
      if (ad[key] !== updatedAd[key]) {
        modified = true;
      }
    }
    if (modified) {
      const res = await axios.post(
        `http://localhost:8080/api/ads/update/${ad._id}`,
        { ad: updatedAd },
        { headers: { Authorization: `Bearer ${getCookie("JWT_AUTH")}` } }
      );
      if (res.status === 200) {
        getUserDetails();
        alert("Ad updated Succesfully!");
        navigate("/freelancer/myAds");
      }
    } else {
      alert("You have not made any Changes");
    }
  };
  async function getUserDetails() {
    let jwt = getCookie("JWT_AUTH");
    if (jwt.length === 0) {
      return;
    }

    const headers = {
      authorization: `Bearer ${jwt}`,
    };
    const response = await axios.get(
      "http://localhost:8080/api/getUserDetails",
      {
        headers,
      }
    );
    const fetchedData = response.data.data;
    fetchedData["loggedIn"] = true;
    setUser(fetchedData);
    console.log("fetched After Ad Creation", fetchedData);
    return;
  }
  function ProgressBar() {
    const fields = [
      { id: 1, field: "Title", variable: title, defaultValue: "Ad Title" },
      {
        id: 2,
        field: "Category",
        variable: category,
        defaultValue: "Category",
      },
      {
        id: 3,
        field: "Short Desc",
        variable: shortDescription,
        defaultValue: "Short Description",
      },
      {
        id: 4,
        field: "Description",
        variable: description,
        defaultValue: "Description",
      },
      {
        id: 5,
        field: "Delivery Time",
        variable: deliveryTime,
        defaultValue: "Delivery Time",
      },
      {
        id: 6,
        field: "Revisions",
        variable: revisions,
        defaultValue: "Revisions",
      },
      { id: 7, field: "Price", variable: price, defaultValue: "Price" },
    ];
    return (
      <div className="grid grid-cols-1 md:grid-cols-7 mx-auto w-fit lg:w-full justify-evenly place-items-center mt-10">
        {fields.map(({ id, field, variable, defaultValue }) => (
          <div
            key={id}
            className="flex flex-col justify-center place-items-center"
          >
            <div
              className={`w-7 h-7 sm:h-10 sm:w-10 text-xs sm:text-md flex justify-center place-items-center rounded-full font-semibold border-2 border-orange-400
                ${
                  variable !== defaultValue &&
                  //   variable.trim() !== "" &&
                  "border-green-500 text-green-500"
                } m-2 transition-all duration-500`}
            >
              {variable === defaultValue ? (
                <p className="text-gray-600">{id}</p>
              ) : (
                <BsCheck2Circle size={30} />
              )}
            </div>
            <p
              className={`text-xs sm:text-lg text-center ${
                variable === defaultValue ? "text-orange-400" : "text-green-600"
              }`}
            >
              {field}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p className="w-11/12 mx-auto text-center text-3xl font-semibold text-gray-600">
        Create an Ad
      </p>
      <div className="flex flex-col lg:flex-row h-[85vh]">
        <div className="flex mx-auto">
          <form
            className="flex flex-row lg:flex-col"
            onSubmit={createAdFormValidator}
          >
            <ProgressBar />
            <div className="w-[100vw] lg:w-[66vw] overflow-y-hidden -ml-6 sm:px-5 md:-ml-0">
              <Carousel
                maw={1200}
                mx="xl"
                slideSize="100%"
                align="end"
                // breakpoints={[{ maxWidth: "md", slideSize: "100%", height: "200" }]}
                withControls
                withKeyboardEvents={false}
              >
                <Carousel.Slide className="flex flex-col justify-evenly sm:px-14 mx-auto my-20 h-fit">
                  {/* Ad Title */}
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 outline-none focus:ring-0 focus:border-green-500 peer"
                      placeholder=" "
                      required
                      defaultValue={title}
                    />
                    <label
                      htmlFor="title"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Ad Title
                    </label>
                  </div>
                  {/* Category */}
                  <div className="flex flex-col mt-16">
                    <select
                      name="category"
                      onChange={(e) => {
                        setCategory(e.target.value);
                        console.log(e.target.value);
                      }}
                      className="p-3 ml-1 sm:ml-0 bg-gray-100 outline-gray-300 rounded-md outline-none focus:outline-green-500 transition-all duration-300 text-md min-w-[200px] w-1/3 text-gray-700 peer"
                      defaultValue={category}
                    >
                      <option value="" disabled>
                        Select a Category
                      </option>
                      {categories.map(({ id, name, value }) => (
                        <option
                          key={id}
                          value={value}
                          className="font-serif text-lg"
                        >
                          {name}
                        </option>
                      ))}
                    </select>
                    <label
                      name="category"
                      className="my-2 w-fit text-sm text-gray-500 peer-focus:text-green-500 -translate-y-[395%]"
                    >
                      Category
                    </label>
                  </div>
                  {/* Short Description */}
                  <div className="relative z-0 w-full my-8 group">
                    <input
                      type="text"
                      name="short-description"
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none outline-none focus:ring-0 focus:border-green-500 peer"
                      placeholder=" "
                      required
                      defaultValue={shortDescription}
                    />
                    <label
                      htmlFor="short-description"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-8"
                    >
                      Short Description
                    </label>
                  </div>

                  {/* Description */}
                  <div className="py-10">
                    <textarea
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                      onFocus={goToPreviousSlide}
                      rows="4"
                      className="block p-2.5 w-11/12 sm:w-full ml-2 sm:ml-0 text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 outline-none ring-0 focus:border-green-500 transition-all duration-300 peer -translate-x-1"
                      placeholder="Long Description"
                      defaultValue={description}
                    />
                    <label
                      htmlFor="description"
                      className="block text-sm text-gray-500 dark:text-white peer-focus:text-green-500 -translate-y-[625%] w-fit"
                    >
                      Description
                    </label>
                  </div>
                </Carousel.Slide>
                <Carousel.Slide
                  className="flex flex-col justify-evenly sm:px-14 mx-auto my-20 h-fit"
                  id="slide-2"
                >
                  <div className="flex flex-col h-full justify-center gap-y-10 mb-20">
                    {/* Delivery Time and Revisions */}
                    <div className="flex justify-start gap-x-10 sm:gap-x-20">
                      {/* Delivery Time */}
                      <div className="flex flex-col">
                        <input
                          type="number"
                          name="delivery-time"
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          onFocus={goToNextSlide}
                          className="border border-gray-300 p-1 px-3 focus:border-green-500 outline-none rounded-md transition-all duration-300 max-w-[100px] peer"
                          defaultValue={deliveryTime}
                          min={1}
                        />
                        <label
                          name="delivery-time"
                          className="text-sm py-2 text-gray-500 peer-focus:text-green-500 transition-all duration-300 -translate-y-[180%]"
                        >
                          Delivery Time (Days)
                        </label>
                      </div>
                      {/* Revisions */}
                      <div className="flex flex-col">
                        <input
                          type="number"
                          name="revisions"
                          onChange={(e) => setRevisions(e.target.value)}
                          className="border border-gray-300 p-1 px-3 focus:border-green-500 outline-none rounded-md transition-all duration-300 max-w-[100px] peer"
                          defaultValue={revisions}
                          min={1}
                        />
                        <label
                          name="revisions"
                          className="text-sm py-2 text-gray-500 peer-focus:text-green-500 transition-all duration-300 -translate-y-[180%]"
                        >
                          Revisions
                        </label>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="mb-5">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          name="revisions"
                          onChange={(e) =>
                            setPrice(
                              Number(e.target.value).toLocaleString("en-US")
                            )
                          }
                          className="border border-gray-300 p-1 px-3 focus:border-green-500 outline-none rounded-md transition-all duration-300 max-w-[100px] peer"
                          defaultValue={price}
                          min={1}
                        />
                        <label
                          name="revisions"
                          className="text-sm py-2 text-gray-500 peer-focus:text-green-500 transition-all duration-300 -translate-y-[180%]"
                        >
                          Price (INR)
                        </label>
                      </div>
                    </div>
                    {/* Tags */}
                    <div>
                      <input
                        type="text"
                        name="tags"
                        onChange={(e) => {
                          let tagsArray = e.target.value.split(",");
                          if (tagsArray.length <= 4) {
                            setTags(e.target.value.split(","));
                            e.target.setCustomValidity("");
                          } else {
                            e.target.setCustomValidity(
                              "You have entered more than 4 tags"
                            );
                          }
                        }}
                        className="w-5/6 ml-2 sm:ml-0 sm:w-full bg-gray-50 border-2 border-gray-300 outline-none focus:border-green-500 text-gray-900 text-sm rounded-lg placeholder-gray-500 block p-2.5 peer transition-all duration-300 -translate-x-1"
                        placeholder="Example Prompt writing, Additional design ,..."
                        defaultValue={tags}
                      />
                      <label
                        htmlFor="tag1"
                        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white peer-focus:text-green-500 transition-all duration-300 -translate-y-[330%]"
                      >
                        Tags (Comma Separated, Max 4)
                      </label>
                    </div>
                    <input
                      type="submit"
                      value="Update Ad"
                      className="w-1/2 hover:w-2/3 mx-auto text-green-700 hover:text-white border border-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 text-xl p-1 font-semibold rounded-lg px-5 text-center transition-all duration-300"
                    />
                  </div>
                </Carousel.Slide>
              </Carousel>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-1/4 lg:h-[80vh] mx-auto flex relative justify-center place-items-center py-10 sm:py-0">
          <p className="absolute top-0 sm:-top-[15%] md:top-[20%] underline text-green-500 text-center text-2xl font-extrabold mb-7">
            PREVIEW
          </p>
          {/* <div className="md:fixed shadow-xl shadow-gray-500 max-w-[300px] sm:max-w-[400px] md:w-[350px] hover:scale-105 rounded-sm transition-all duration-500"> */}
          <div className="md:fixed shadow-xl shadow-gray-500 max-w-[300px] sm:max-w-[400px] md:w-[350px] hover:scale-105 rounded-sm transition-all duration-500">
            <img
              // src="https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600"
              // src={"http://localhost:8080/" + ad?.coverPicPath}
              alt="Adimg"
              className="h-[150px] border border-gray-400"
            />
            <div className="flex justify-between place-items-center px-2 py-1 font-semibold">
              <div className="flex">
                <FaUserCircle size={22} className="mr-2" />
                <h2>{currentUser?.name}</h2>
              </div>
              <div className="flex justify-end gap-x-5 px-2">
                <div>
                  <FaClock size={15} className="inline" /> {deliveryTime}
                </div>
                <div>
                  <GrUpdate size={13} className="inline" /> {revisions}
                </div>
              </div>
            </div>
            <p className="px-2 text-lg flex place-items-start text-justify mx-auto text-gray-900">
              {title}
            </p>
            <p className="flex place-items-center text-sm px-2 py-1 font-serif text-gray-600">
              {shortDescription}
            </p>
            <div className="flex justify-between place-items-center px-4 py-1">
              <BsBookmark size={22} className="fill-gray-800" />
              {/* <BsFillBookmarkFill size={22} className="fill-green-500" /> */}
              <div className="flex flex-col place-items-end ">
                <p>Starting at</p>
                <p>INR {price}</p>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default FreelancerEditAd;
