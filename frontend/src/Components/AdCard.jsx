import React from "react";
import "../Assets/css/AdCard.css";
import { Link } from "react-router-dom";

const AdCard = ({ ad }) => {
  return (
    <div>
      <div className="gigCard">
        <img src={ad.img} alt="Ad image" />
        <div className="info">
          <div className="user">
            <img src={ad?.pp} alt="Profile Picture" />
            <span>{ad.username}</span>
          </div>
          <p>{ad.description}</p>
          <div className="star">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/29/Gold_Star.svg"
              alt="Rating/Star Picture"
            />
            <span>{ad?.star}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/50/Facebook_Thumb_icon.svg"
            alt="Like Option Picture"
          />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              Rs. {ad?.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
