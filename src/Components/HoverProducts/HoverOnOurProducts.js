import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../OurProducts/OurProducts.css"
function HoverOnOurProducts() {
  return (
    <div className="hover-overlay">
      <button className="add-to-cart btn btn-light">Add to Cart</button>
      <div className="icons d-flex">
        <i className="bi bi-share"></i>
        <p className="ps-2 pe-2">Share</p>
        <i className="bi bi-arrow-left-right"></i>
        <p className="ps-2 pe-2">Compare</p>
        <i className="bi bi-heart"></i>
        <p className="ps-2">Like</p>
      </div>
    </div>
  );
}

export default HoverOnOurProducts;