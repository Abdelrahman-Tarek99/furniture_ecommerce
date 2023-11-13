import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import classes from './InspirationalSlider.module.css';
function InspirationalSlider(){
    return(
    <section className={classes.inspiration}>
      <div className={classes[`inspiration-div`]}>
        <p className={classes[`Beautiful-text`]}>50+ Beautiful rooms <br />inspiration</p>
        <p className={classes[`description-of-beautiful-text`]}>
          Our designer already made a lot of beautiful <br />prototipe of rooms
          that inspire you
        </p>
        <button type="button" className={classes[`explore-more`]}>Explore More</button>
      </div>
      <div className={classes[`img-inspration`]}>
        <img src="img/Rectangle 24.png" className={classes[`rc-24`]} alt="rc-24" />
        <div className={classes[`bedroom`]}>
          <div className={[classes[`div-carrying-bedroom-text`]]}>
            <div>
              <p className={classes[`bedroom-text`]}>
                01
              </p>
            </div>
            <div>
              <hr className={classes[`line-between-text`]}/>
            </div>
            <div>
              <p className={classes[`bedroom-text`]}>
                Bed Room
              </p>
            </div>
          </div>
          <div>
            <p className={classes[`inner-peace`]}>
              Inner Peace
            </p>
          </div>

        </div>
        <div className={classes[`next-img-div`]}>
          <button className="btn"><i className="bi-arrow-right"></i></button>
        </div>
        <div className={classes[`rc-25-indicator`]}>
          <img src="img/Rectangle 25.png" className={classes[`rc-25`]} alt="rc-25" />
          <img
            src="img/Indicator.png"
            className={classes[`indicator`]}
            alt="indicator"
          />
        </div>
      </div>
    </section>
    )
}

export default InspirationalSlider;