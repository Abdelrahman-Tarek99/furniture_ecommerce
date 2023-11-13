
import "bootstrap/dist/css/bootstrap.css";
import"./Footer.css";
import classes from "../Button/Button.module.css";
import Button from "../Button/Button";

function Footer() {
    return (
        <footer className="container-lg about-us mt-5">
      <div className="text-center">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-3">
            <p className="companyNameDetails">Funiro.</p>
            <p className="companyLocation">
              400 University Drive Suite 200 Coral <br />Gables,<br />FL 33134
              USA
            </p>
          </div>
          <div className="col-12 col-md-3">
            <p className="tittlesOfAboutUs">Links</p>
            <p className="linkAboutUs">Home</p>
            <p className="linkAboutUs">Shop</p>
            <p className="linkAboutUs">About</p>
            <p className="linkAboutUs">Contact</p>
          </div>
          <div className="col-12 col-md-3">
            <p className="tittlesOfAboutUs">Help</p>
            <p className="linkAboutUs">Payment Options</p>
            <p className="linkAboutUs">Returns</p>
            <p className="linkAboutUs">Privacy Policies</p>
          </div>

          <div className="col-12 col-md-3">
            <p className="tittlesOfAboutUs">Newsletter</p>
            <form className="emailForm">
              <input
                className="emailInput"
                type="email"
                placeholder="Enter your email"
                name="email"
                required
              />
              <Button className={classes.subscribeButton} type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
      <hr/>
      <div className="copyrights">
        <p>
          2023 furino. All rights reverved
        </p>
      </div>
    </footer>
    )
}   

export default Footer;
