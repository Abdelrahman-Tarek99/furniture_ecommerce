import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../../Components/NavBar/NavBar";
import BrowseRange from "../../Components/BrowseRange/BrowseRange";
import InspirationalSlider from "../../Components/Slider/InspirationalSlider";
import ShareYourSteps from "../../Components/SharingSteps/ShareyourSteps";
import Footer from "../../Components/Footer/Footer";
import OurProductsContainer from "../../Components/OurProducts/OurProductsContainer";
import OurProductsCards from "../../Components/OurProducts/OurProductsCards";
import Banner from "../../Components/NavBar/Banner";

function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <Banner />
      <BrowseRange />
      <OurProductsContainer>
        <OurProductsCards />
      </OurProductsContainer>
      <InspirationalSlider />
      <ShareYourSteps />
      <Footer />
    </React.Fragment>
  );
}

export default Home;
