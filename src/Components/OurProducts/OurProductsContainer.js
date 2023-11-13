import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./OurProducts.css";
import Button from "../Button/Button";
import classes from "../Button/Button.module.css";
import { Link } from "react-router-dom";

function OurProductsContainer(props) {
  return (
    <React.Fragment>
      <section className="mt-5">
        <div className="container-fluid ">
          <div className="text-center">
            <p className="display-5 fw-bold mb-5">Our Products</p>
          </div>
          {/* <!--start of the  row--> */}
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {props.children}
            {/* <!--end of the  row--> */}
          </div>
        </div>
        <div className="show-more-div d-flex mt-5">
          <Button className={classes.showMore}>
            <Link to="/dashboard">Show More</Link>
          </Button>
        </div>
      </section>
    </React.Fragment>
  );
}

export default OurProductsContainer;
