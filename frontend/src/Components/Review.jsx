import React from "react";
import "../Assets/css/AdCard.css";
import { Link } from "react-router-dom";

const Review = ({ review }) => {
  return (
    <div className="item">
      <div className="user">
        <img className="pp" src={review.pp} alt="" />
        <div className="info">
          <span>{review.user.name}</span>
        </div>
      </div>
      <div className="stars">
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <span>5</span>
      </div>
      <p>{review.description}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
