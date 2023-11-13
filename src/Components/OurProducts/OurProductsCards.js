import React, { useState, useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./OurProducts.css";
import HoverOnOurProducts from "../HoverProducts/HoverOnOurProducts";

function OurProductsCards(props) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemsPosted, setItemsPosted] = useState(false);
  const [fetchingProductImageUrl, setFetchingProductImageUrl] = useState([]);


  ///////////////////////////////////////////////
  // FETCHING DATA FROM DATABASE
  ///////////////////////////////////////////////
  const fetchProductsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://dashboard-http-676f6-default-rtdb.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedItems = [];
      for (const key in data) {
        const item = {
          id: key,
          enteredProductName: data[key].enteredProductName,
          enteredProductDescription: data[key].enteredProductDescription,
          enteredProductPriceBeforeDiscount:
            data[key].enteredProductPriceBeforeDiscount,
          enteredProductPriceAfterDiscount:
            data[key].enteredProductPriceAfterDiscount,
          enteredProductDiscount: data[key].enteredProductDiscount,
          enteredProductImageUrl: data[key].enteredProductImageUrl
        };

        setFetchingProductImageUrl(prevUrls => [...prevUrls, item.enteredProductImageUrl]);
        loadedItems.push(item);

      }
      setItems(loadedItems);
    } catch (error) {
      setError(error.message);
    }
      setIsLoading(false);

  }, []);

  useEffect(() => {
    fetchProductsHandler();
    if (itemsPosted) setItemsPosted(false);
  }, [itemsPosted, fetchProductsHandler]);

  let content = <p>Found no Products.</p>;
  console.log(items);
  // //////////////////////////////////////////////
  // RENDERING THE DATA FROM THE DATABASE TO THE DOM
  /////////////////////////////////////////////////
  if (items.length > 0) {
    console.log("Rendering Data");
    content = items.map((item,index) => (
      <div className="col" key={item.id}>
        <div className="card">
          <div className="d-flex  " id="discount-button-div">
            {item.enteredProductDiscount === "" ? null : (
              <button
                className="btn"
                id={
                  item.enteredProductDiscount === "New"
                    ? "new-button"
                    : "discount-button"
                }
              >
                {item.enteredProductDiscount === "New"
                  ? "New"
                  : `-${item.enteredProductDiscount}%`}
              </button>
            )}
          </div>
          {/* Your card content here */}
          <img src={fetchingProductImageUrl[index]} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title tittle-text-tag">
              {item.enteredProductName}
            </h5>
            <p className="card-text card-description">
              {item.enteredProductDescription}
            </p>
            <p className="card-text actual-price">
              {`RP ${item.enteredProductPriceAfterDiscount}.000`}
            </p>
            {item.enteredProductPriceBeforeDiscount === "" ? (
              () => null
            ) : (
              <s className="card-text price-before-discount">
                {`RP ${item.enteredProductPriceBeforeDiscount}.000`}
              </s>
            )}
          </div>
          <HoverOnOurProducts />
        </div>
      </div>
    ));
  }
  /////////////////////////////////////////////
  // SHOWING STATE OF THE DATA WHETHER IT IS BEING RENDERED OR LOADING
  /////////////////////////////////////////////
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return <React.Fragment>{content}</React.Fragment>;
}

export default OurProductsCards;
