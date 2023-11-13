import React, { useState } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import AddProducts from "../AddProducts/AddProducts";
//using destructuring to get the values from the props
function EditModal({ onClose, dValues }) {
  console.log("From edit modal ", dValues.enteredProductId);
  const [basicModal, setBasicModal] = useState(true);

  const toggleShow = () => setBasicModal(!basicModal);

  const handleClose = () => {
    toggleShow();
    onClose();
  };
  return (
    <React.Fragment>
      <MDBModal show={basicModal} toggle={handleClose} tabIndex="-1" backdrop="static">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <button className="btn-close" onClick={handleClose}></button>
            </MDBModalHeader>
            <MDBModalBody>
              <AddProducts eValues={dValues} />
            </MDBModalBody>

            <MDBModalFooter>
              Make sure to Edit the values in the form Correctly
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  );
}

export default EditModal;
