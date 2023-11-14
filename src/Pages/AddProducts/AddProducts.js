import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./AddProducts.css";
import { Link } from "react-router-dom";
import Shadow from "../Shadow/Shadow";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
// Importing toastify module
// Import toastify css file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProducts({ onAddProduct, eValues }) {
  const refreshButtonRef = useRef(null);
  let capturingImageInput = null;
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [productName, setProductName] = useState(
    eValues ? eValues.enteredProductName : ""
  );
  const [productDescription, setProductDescription] = useState(
    eValues ? eValues.enteredProductDescription : ""
  );
  const [productPriceBeforeDiscount, setProductPriceBeforeDiscount] = useState(
    eValues ? eValues.enteredProductPriceBeforeDiscount : ""
  );
  const [productPriceAfterDiscount, setProductPriceAfterDiscount] = useState(
    eValues ? eValues.enteredProductPriceAfterDiscount : ""
  );
  const [productDiscount, setProductDiscount] = useState(
    eValues ? eValues.enteredProductDiscount : ""
  );
  const productImageRef = useRef(null);
  // const [formValues, setFormValues] = useState({
  //   productImageUrl: null,
  // });
  ////////////////////////////////////////////////////
  // Handling Image Upload and Getting Image URL
  ////////////////////////////////////////////////////
  const handleImageUpload = async () => {
    // console.log("REF::", productImageRef.current.files[0]);
    if (!productImageRef.current.files[0]) {
      alert("Please select an image");
      return;
    }

    const imageFile = productImageRef.current.files[0];
    const imageRef = ref(storage, `images/${uuidv4()}`);

    try {
      await uploadBytes(imageRef, imageFile);
      console.log("finished uploading bytes");
      toast.info("Resolving the product !");
      const imageUrl = await getDownloadURL(imageRef);
      console.log("finished downloading URL");
      // setFormValues((prevValues) => ({
      //   ...prevValues,
      //   productImageUrl: imageUrl,
      // }));
      capturingImageInput = imageUrl;
      console.log("the link is ", imageUrl);
      console.log("Image uploaded successfully", capturingImageInput);
      toast.success("Uploaded Successfully");
    } catch (error) {
      console.log("Error uploading image:", error);
      toast.error("Error uploading image !");
    }
  };

  /////////////////////////////////////////////////
  // Submitting Form Handler
  /////////////////////////////////////////////////
  const submitFormHandler = async (event) => {
    event.preventDefault();
    toast.info("Wait for adding the Product !", { autoClose: 10000 });
    await handleImageUpload();

    if (!productImageRef.current.files[0]) {
      toast.warning("please upload image !");
      return;
    }

    const newAddedProduct = {
      enteredProductName: productName,
      enteredProductDescription: productDescription,
      enteredProductPriceBeforeDiscount: productPriceBeforeDiscount,
      enteredProductPriceAfterDiscount: productPriceAfterDiscount,
      enteredProductDiscount: productDiscount,
      enteredProductImageUrl: capturingImageInput,
    };
    // Call the parent component's callback
    onAddProduct(newAddedProduct);
    ResetHandler();
    console.log("Inputs Rested Successfully");
  };

  //////////////////////////////////////////////
  // Resetting the form
  //////////////////////////////////////////////
  function ResetHandler() {
    // Reset the form
    setProductName("");
    setProductDescription("");
    setProductPriceBeforeDiscount("");
    setProductPriceAfterDiscount("");
    setProductDiscount("");
    if (productImageRef.current) {
      productImageRef.current.value = null; // Reset the image input field
    }
  }

  //////////////////////////////////////////////
  // Deleting the old image
  //////////////////////////////////////////////
  const deleteOldImage = async (ImageId) => {
    console.log(":::::::::::::::");
    const storageOldImageRef = ref(storage, ImageId);
    // console.log("the old image url::", storageOldImageRef);
    await deleteObject(storageOldImageRef);
    console.log("photo deleted successfully");
    toast.success("Old Image Deleted Successfully");
  };

  ////////////////////////////////////////////////
  // editing on the data
  ////////////////////////////////////////////////
  useEffect(() => {
    // console.log("<<State BEFORE>>",editMode)
    if (eValues) {
      setEditMode(true);
    }
  }, [editMode]);

  // ...

  const editSubmit = async (productId) => {
    toast.info("Wait for updating the Product !", { autoClose: 10000 });
    // console.log("image Ref", productImageRef.current.files[0]);
    //if user didn't upload new image
    let settingNewEditedImage = eValues.enteredProductImageUrl;
    if (productImageRef.current.files[0] === undefined) {
      settingNewEditedImage = eValues.enteredProductImageUrl;
    } else {
      await deleteOldImage(eValues.enteredProductImageUrl);
      await handleImageUpload();
      settingNewEditedImage = capturingImageInput;
    }

    try {
      const response = await fetch(
        `https://dashboard-http-676f6-default-rtdb.firebaseio.com/products/${productId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            enteredProductName: productName,
            enteredProductDescription: productDescription,
            enteredProductPriceBeforeDiscount: productPriceBeforeDiscount,
            enteredProductPriceAfterDiscount: productPriceAfterDiscount,
            enteredProductDiscount: productDiscount,
            enteredProductImageUrl: settingNewEditedImage,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
        toast.error("Something went wrong !");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Something went wrong !");
    }
    console.log("Edited Successfully");
    toast.success("Edited Successfully");
    setEditMode(false);
    window.history.go(0);
  };

  // ...

  ////////////////////////////////////////////////
  // Handling the refresh button
  ////////////////////////////////////////////////
  const handleRefreshButtonClick = () => {
    refreshButtonRef.current.click();
    window.location.reload();
  };

  ////////////////////////////////////////////////

  return (
    <React.Fragment>
      <ToastContainer />
      <Shadow>
        <form onSubmit={submitFormHandler} className="formSubmit">
          <label htmlFor="PName" className="fields">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product Name"
            id="PName"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <label htmlFor="pDescription" className="fields">
            Product Description
          </label>
          <input
            type="text"
            placeholder="Enter product Description"
            id="pDescription"
            required
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />

          <label htmlFor="pPriceBeforeDiscount" className="fields">
            Price before Discount
          </label>
          <input
            type="number"
            placeholder="Price before Discount"
            id="pPriceBeforeDiscount"
            value={productPriceBeforeDiscount}
            onChange={(e) => setProductPriceBeforeDiscount(e.target.value)}
          />

          <label htmlFor="pPriceAfterDiscount" className="fields">
            Price After Discount
          </label>
          <input
            type="number"
            placeholder="Price After Discount"
            id="pPriceAfterDiscount"
            required
            value={productPriceAfterDiscount}
            onChange={(e) => setProductPriceAfterDiscount(e.target.value)}
          />

          <label htmlFor="pDiscount" className="fields">
            Discount Percentage %
          </label>
          <input
            type="number"
            placeholder="Discount Percentage %"
            id="pDiscount"
            value={productDiscount}
            onChange={(e) => setProductDiscount(e.target.value)}
          />

          <label htmlFor="pImage" className="fields">
            Product Image
          </label>
          <input
            className="mb-2"
            type="file"
            placeholder="Enter product Description"
            id="pDescription"
            required
            ref={productImageRef}
            // onChange={handleImageUpload}
          />

          <button className="btn btn-warning mb-1" onClick={ResetHandler}>
            Reset
          </button>
          {/* //////////////////////////////////////////////////// */}
          {/* Refresh button */}
          {/* //////////////////////////////////////////////////// */}
          <button
            ref={refreshButtonRef}
            className="btn btn-primary d-none"
            onClick={handleRefreshButtonClick}
          >
            <Link to="/dashboard">Refresh</Link>
          </button>

          {!editMode && (
            <button type="submit" className="btn btn-primary mb-1">
              Add Product
            </button>
          )}
        </form>
        {editMode && (
          <button
            type="submit"
            className="btn btn-primary editBtn "
            onClick={() => editSubmit(eValues.enteredProductId)}
          >
            Edit
          </button>
        )}
      </Shadow>
    </React.Fragment>
  );
}

export default AddProducts;
