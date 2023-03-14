import React from 'react'

export const Card = ({ id, ServiceName, ImageLink, Description, RedirectLink }) => {
    return (
        <a href="/">
          <div className="card bg-white w-[200px] h-[350px] m-2 rounded-lg shadow-lg">
            <div className="top">
              <img
                className="w-[200px] h-[200px] object-cover  p-2"
                src={ImageLink}
                alt="img"
              />
            </div>
            <div className="bottom flex flex-col justify-center items-start p-3 bg-">
              <div className="title font-semibold text-xs my-1">
                {ServiceName}
              </div>
              
    
              <div className="pricing flex items-center">
                {Description}
              </div>
              <div className="flex items-center my-2">
                Click here to explore!
              </div>
            </div>
          </div>
        </a>
        
);
}
