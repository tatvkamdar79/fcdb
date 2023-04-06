import React, { useEffect, useState } from "react";

const CreateAd = () => {
  // const [title, setTitle] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [revisions, setRevisions] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [tag4, setTag4] = useState("");

  const getTitle = (e) => {
    console.log(e.target.value);
  };
  const getCategory = (e) => {
    console.log(e.target.value);
  };
  const getDescription = (e) => {
    console.log(e.target.value);
  };
  const getShortDescription = (e) => {
    console.log(e.target.value);
  };
  const getDeliveryTime = (e) => {
    console.log(e.target.value);
  };
  const getRevisions = (e) => {
    console.log(e.target.value);
  };
  const getTag1 = (e) => {
    console.log(e.target.value);
  };
  const getTag2 = (e) => {
    console.log(e.target.value);
  };
  const getTag3 = (e) => {
    console.log(e.target.value);
  };
  const getTag4 = (e) => {
    console.log(e.target.value);
  };

  const createAdHandler = () => {};

  useEffect(() => {
    console.log(title);
  }, [title]);
  return (
    <div className="h-screen flex flex-col">
      <p className="w-5/6 font-serif text-3xl font-semibold text-center relative sm:top-9 text-cyan-800 underline mx-auto py-2 pb-3 sm:p-0">
        Create an ad
      </p>
      <form
        className="flex flex-col sm:flex-row w-5/6 h-[80vh] mx-auto gap-x-1"
        onSubmit={createAdHandler}
      >
        <div className="w-full md:w-1/2 h-5/6 my-auto rounded-sm flex flex-col justify-evenly">
          <label htmlFor="title" className="flex ml-2">
            Title
          </label>
          <input
            onKeyUp={getTitle}
            type="text"
            name="title"
            className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 m-2 p-2 mb-10"
          />
          <br />
          <label htmlFor="category" className="flex ml-2">
            Category
          </label>
          <select
            onChange={getCategory}
            name="category"
            id=""
            className="border border-gray-500 rounded-md outline-none focus:border-blue focus:outline-blue transition-all duration-500 m-2 p-3 mb-10"
          >
            <option value="Select a Category" selected disabled hidden>
              Select a Category
            </option>
            <option value="graphics-and-design" className="font-serif text-lg">
              Graphics and Design
            </option>
            <option value="video-and-animation" className="font-serif text-lg">
              Video and Animation
            </option>
            <option
              value="writing-and-translation"
              className="font-serif text-lg"
            >
              Writing and Translation
            </option>
            <option value="ai-services" className="font-serif text-lg">
              AI Services
            </option>
            <option value="digital-marketing" className="font-serif text-lg">
              Digital Marketing
            </option>
            <option value="music-and-audio" className="font-serif text-lg">
              Music and Audio
            </option>
            <option value="programming-and-tech" className="font-serif text-lg">
              Programming and tech
            </option>
            <option value="business" className="font-serif text-lg">
              Business
            </option>
          </select>
          <br />
          <label htmlFor="cover-img" className="flex m-2">
            Cover Image
          </label>
          <input type="file" name="cover-img" className="m-2 p-2 mb-10" />
          <br />
          <label htmlFor="description" className="flex ml-2">
            Description
          </label>
          <input
            onKeyUp={getDescription}
            type="text"
            name="description"
            className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 m-2 p-2 mb-10"
          />
        </div>
        <div className="w-full md:w-1/2 h-5/6 my-auto border border-gray-700 rounded-sm flex flex-col justify-evenly">
          <label htmlFor="short-description" className="flex ml-2 mt-2">
            Short Description
          </label>
          <input
            onKeyUp={getShortDescription}
            type="text"
            name="short-description"
            className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 m-2 p-2 mb-5 "
          />
          <br />
          <label htmlFor="delivery-time" className="flex ml-2">
            Delivery Time (Days)
          </label>
          <input
            onKeyUp={getDeliveryTime}
            type="number"
            name="delivery-time"
            id=""
            className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 m-2 p-2 mb-5 "
          />{" "}
          <br />
          <label htmlFor="revisions" className="flex ml-2">
            Revisions
          </label>
          <input
            onKeyUp={getRevisions}
            type="number"
            name="revisions"
            id=""
            className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 m-2 p-2 mb-5 "
          />
          <br />
          <div className="mb-4">
            <label htmlFor="tags" className="flex ml-2">
              Tags
            </label>
            <input
              onKeyUp={getTag1}
              type="text"
              name="tag1"
              className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 mx-2 my-1"
            />
            <br />
            <input
              onKeyUp={getTag2}
              type="text"
              name="tag2"
              className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 mx-2 my-1"
            />
            <br />
            <input
              onKeyUp={getTag3}
              type="text"
              name="tag3"
              className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 mx-2 my-1"
            />
            <br />
            <input
              onKeyUp={getTag4}
              type="text"
              name="tag4"
              className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 mx-2 my-1"
            />
          </div>
        </div>
      </form>
      <div className="w-5/6 max-w-[600px] mx-auto flex justify-center place-items-center relative">
        <input
          type="submit"
          value="Create an Ad"
          className="w-1/2 bg-gray-300 rounded-md text-2xl text-gray-800 font-semibold font-serif cursor-pointer py-1 absolute bottom-1 hover:bg-blue hover:text-white hover:scale-105 hover:w-2/3 border-2 border-gray-600 transition-all duration-500"
        />
      </div>
    </div>
  );
};

export default CreateAd;
