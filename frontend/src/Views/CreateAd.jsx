import React from "react";

const CreateAd = () => {
  return (
    <div>
      <p className="font-serif text-3xl font-semibold text-center relative sm:top-10 text-cyan-800 underline py-2 pb-3 sm:p-0">
        Create an ad
      </p>
      <form className="flex flex-col sm:flex-row w-5/6 h-[80vh] mx-auto gap-x-1">
        <div className="w-full md:w-1/2 h-5/6 my-auto border border-gray-700 rounded-sm flex flex-col justify-evenly">
          <label htmlFor="title" className="flex ml-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 m-2 p-2 mb-10"
          />
          <br />
          <label htmlFor="category" className="flex ml-2">
            Category
          </label>
          <select
            name="category"
            id=""
            className="border border-gray-500 rounded-md outline-none focus:border-blue focus:outline-blue transition-all duration-500 m-2 p-3 mb-10"
          >
            <option value="Select a Category" selected disabled hidden>Select a Category</option>
            <option value="graphics-and-design" className="font-serif text-lg">
              Graphics and Design
            </option>
            <option value="video-and-animation" className="font-serif text-lg">
              Video and Animation
            </option>
            <option value="writing-and-translation" className="font-serif text-lg">
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
            type="text"
            name="short-description"
            className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 m-2 p-2 mb-5 "
          />
          <br />
          <label htmlFor="delivery-time" className="flex ml-2">
            Delivery Time (Days)
          </label>
          <input
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
              type="text"
              name="tags"
              className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 mx-2 my-1"
            />
            <br />
            <input
              type="text"
              name="tags"
              className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 mx-2 my-1"
            />
            <br />
            <input
              type="text"
              name="tags"
              className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 mx-2 my-1"
            />
            <br />
            <input
              type="text"
              name="tags"
              className="border border-gray-500 rounded-sm outline-none focus:border-blue focus:outline-blue transition-all duration-500 mx-2 my-1"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAd;
