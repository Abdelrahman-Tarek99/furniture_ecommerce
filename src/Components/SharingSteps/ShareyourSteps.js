import "bootstrap/dist/css/bootstrap.css";
// import "../../App.css";
import "./ShareYourSteps.css";

function ShareYourSteps(){
    return(
        <section>
        <div className="container-fluid mt-5 section-sharing-steps ">
          <div className="text-center">
            <p className="share-your-steps">Share your setup with</p>
            <p className="FuniroFurniture">#FuniroFurniture</p>
          </div>
          <div className="container-fluid d-flex img-combined" >
            <div className="col-lg-5 col-12 pe-2 " id="r1234c1234">
              <div className="row " >
                <div className="d-flex gap-1 p-1 mb-1" id="col-1-1-img" >
                  <img src="img/r1c1.png" className="img-fluid" id="r1c1" alt="" />
                  <img src="img/r1c2.png" className="img-fluid pe-2" id="r1c2" alt="" />
                </div>
              </div>
              <div className="row" >
                <div className="d-flex gap-1 mb-1 p-1" id="col-1-2-img">
                  <img src="img/r2c1.png" className="img-fluid" id="r2c1" alt="" />
                  <img src="img/r2c2.png" className="img-fluid" id="r2c2" alt="" />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-2 gap-1 r3c3-div"  >
              <div className="d-flex r3c3 "  >
                <img src="img/r3c3.png" className="img-fluid"  alt=""/>
              </div>
            </div>
                 <div className="col-12 col-lg-5 ps-2 r6789c6789 ">
              <div className="row ">
                <div className="d-flex gap-1 mb-1" id="col-3-1-img">
                  <img src="img/r1c4.png" className="img-fluid" id="r1c4" alt="" />
                  <img src="img/r1c5.png" className="img-fluid" id="r1c5" alt="" />
                </div>
              </div>
              <div className="row">
                <div className="d-flex gap-1 mb-1" id="col-3-2-img">
                  <img src="img/r2c4.png" className="img-fluid" id="r2c4" alt="" />
                  <img src="img/r2c5.png" className="img-fluid" id="r2c5" alt="" />
                </div>
              </div>
            </div>
          </div>
          </div>
          <hr/>
      </section>
    );
}

export default ShareYourSteps;