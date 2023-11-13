import "bootstrap/dist/css/bootstrap.css";
import "../NavBar/NavBar.css";

function Banner (){
    return(
        <div className="banner">
        <img src="img/scandinavian.png" alt="furniture-1" />
        <div className="bannertext">
          <p className="new-arrival">New Arrival</p>
          <h1 className="discover">
            Discover Our <br />
            New Collection
          </h1>
          <p className="new-discover-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            <br />
            elit tellus, luctus nec ullamcorper mattis.
          </p>
          <div className="buynow-btn-div">
            <button type="button" className="buynow-btn btn-lg">
              BUY Now
            </button>
          </div>
        </div>
      </div>
    )
}

export default Banner;