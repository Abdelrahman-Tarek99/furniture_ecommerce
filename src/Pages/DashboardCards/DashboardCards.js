import React, { useState, useCallback, useEffect,useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./DashboardCards.css";
import Shadow from "../Shadow/Shadow";
import AddProducts from "../AddProducts/AddProducts";
import EditModal from "../EditModal/EditModal";
import NavBar from "../../Components/NavBar/NavBar";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";
// Importing toastify module
// Import toastify css file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashboardCards(props) {
  const refreshButtonRef = useRef(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemsPosted, setItemsPosted] = useState(false);
  ////////////////////////////////////////////////
  // editValues: holds the values of the product to be edited
  // isModalOpen: holds the state of whether the modal is open or not
  ////////////////////////////////////////////////
  const [editValues, setEditValues] = useState({
    enteredProductId: "",
    enteredProductName: "",
    enteredProductDescription: "",
    enteredProductPriceBeforeDiscount: "",
    enteredProductPriceAfterDiscount: "",
    enteredProductDiscount: "",
    enteredProductImageUrl: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  ///////////////////////////////////////////////////////
  // Initialize fetchingProductImageUrl as an empty array
  const [fetchingProductImageUrl, setFetchingProductImageUrl] = useState([]);
  const storage = getStorage();



  const fetchProductsHandler = useCallback(async () => {
    toast.loading("Fetching Products");
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
          enteredProductImageUrl: data[key].enteredProductImageUrl,
        };

        setFetchingProductImageUrl((prevUrls) => [
          ...prevUrls,
          item.enteredProductImageUrl,
        ]);
        loadedItems.push(item);
      }
      setItems(loadedItems);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    toast.dismiss();
  }, []);

  useEffect(() => {
    fetchProductsHandler();
    if (itemsPosted) setItemsPosted(false);
  }, [itemsPosted, fetchProductsHandler]);

  ///////////////////////////////////////
  // DELETE OBJECT FROM DATABASE AND FROM DOM
  ////////////////////////////////////////
  const deleteProductHandler = async (productId, productImageIdUrl) => {
    try {
      const response = await fetch(
        `https://dashboard-http-676f6-default-rtdb.firebaseio.com/products/${productId}.json`,
        {
          method: "DELETE",
        },
        toast.success("Product Deleted Successfully !")
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
        toast.error("Something went wrong !");
      }

      // Delete the image from Firebase Storage
      const storageRef = ref(storage, productImageIdUrl);
      await deleteObject(storageRef);
      console.log("File deleted successfully");
      toast.success("Image Deleted Successfully");

      // Remove the deleted item from the display
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    } catch (error) {
      setError(error.message);
    }
    // window.location.reload();
    refreshButtonRef.current.click();
  };
  /////////////////////////////////////////
  // ADDING NEW PRODUCT YO DATABASE AND RENDERING IT ON THE SCREEN
  /////////////////////////////////////////
  async function addNewProductsHandler(productsData) {
    try {
      const response = await fetch(
        "https://dashboard-http-676f6-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          body: JSON.stringify(productsData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.info("Wait for adding the Product !",{autoClose:5000});
      const data = await response.json();
toast.success("Product Added Successfully !");
      //to auto refresh the page
      setItemsPosted(true);
    } catch (error) {
      setError(error.message);
    }
    // window.location.reload();
refreshButtonRef.current.click();
  }
  /////////////////////////////////////////
// Sending the values to be edited to the modal
  /////////////////////////////////////////

  // console.log("image list urls:::", imageList);
  function onEditHandlerShowMenu(previewEditValues) {
    setIsModalOpen(true);
    setEditValues({
      enteredProductId: previewEditValues.id,
      enteredProductName: previewEditValues.enteredProductName,
      enteredProductDescription: previewEditValues.enteredProductDescription,
      enteredProductPriceBeforeDiscount:
        previewEditValues.enteredProductPriceBeforeDiscount,
      enteredProductPriceAfterDiscount:
        previewEditValues.enteredProductPriceAfterDiscount,
      enteredProductDiscount: previewEditValues.enteredProductDiscount,
      enteredProductImageUrl: previewEditValues.enteredProductImageUrl,
    });
    //sending the data to the modal
    // console.log("the data that will be send ", previewEditValues);
  }
  /////////////////////////////////////////
// Handling the refresh button click
  /////////////////////////////////////////
function handleRefreshButtonClick(){
  refreshButtonRef.current.click(
    console.log("Refresh Button Clicked")
  );
  window.location.reload();
  // fetchProductsHandler();
}



  ///////////////////////////////////////
  // DISPLAYING CONTENT
  /////////////////////////////////////

  let content = <p>Found no Products.</p>;
  // //////////////////////////////////////////////
  // RENDERING THE DATA FROM THE DATABASE TO THE DOM
  /////////////////////////////////////////////////
  if (items.length > 0) {
    // console.log("Rendering Data");
    content = items.map((item, index) => (
      <Shadow key={item.id}>
        <div className="row">
          <div className="col-md-4 col-12 productImage">
            {fetchingProductImageUrl && (
              <img src={fetchingProductImageUrl[index]} alt="productImage" />
            )}{" "}
          </div>
          <div className="col-md-4 col-12 productList">
            <div className="row">
              <h6 className="tittleTag">
                Product Name: {item.enteredProductName}
              </h6>
            </div>
            <div className="row">
              <h6 className="productDescription">
                Product Description: {item.enteredProductDescription}
              </h6>
            </div>
            <div className="row">
              <h6 className="actualPrice">
                Actual Price: Rp {item.enteredProductPriceAfterDiscount}.00
              </h6>
            </div>
            <div className="row">
              <h6>
                {item.enteredProductPriceBeforeDiscount ? (
                  <s className="priceBeforeDiscount">
                    Old Price: Rp {item.enteredProductPriceBeforeDiscount}.00
                  </s>
                ) : null}
              </h6>
            </div>
            <div className="row">
              {item.enteredProductDiscount ? (
                <h6>Discount : {item.enteredProductDiscount}%</h6>
              ) : null}
            </div>
          </div>
          <div className="col-md-4 col-12 d-flex threeButtons">
            <button
              className="btn btn-primary"
              onClick={() => onEditHandlerShowMenu(items[index])}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                deleteProductHandler(item.id, fetchingProductImageUrl[index])
              }
            >
              Delete
            </button>
          </div>
        </div>
      </Shadow>
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
  return (
    <React.Fragment>
      <NavBar />
      <ToastContainer />
      <div className="text-center dashboard">Dashboard</div>
      <button className="btn btn-primary d-none" onClick={fetchProductsHandler}>
        Fetch More
      </button>
      <AddProducts onAddProduct={addNewProductsHandler} />
      {content}
      {/* Modal */}
      {isModalOpen && (
        <EditModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          dValues={editValues}
        />
      )}
<button ref={refreshButtonRef} className="btn btn-primary d-none" onClick={handleRefreshButtonClick} >
  <Link to="/dashboard">Refresh</Link>
  </button>    </React.Fragment>
  );
}

export default DashboardCards;
