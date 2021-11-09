import React from "react";
import { Modal } from "@material-ui/core";
import closeIcon from "../../assests/images/close_icon.png";
import successIcon from '../../assests/images/icon_success.svg';

const SuccessModal = ({ open, toggleOpen }) => {

  return (
    <Modal
      open={open}
      onClose={() => {
        toggleOpen(false);
      }}
    >
      <div className="apt-success-modal-container">
        <img
          id="auto-apt-success-close"
          className="apt-cancel-close-icn"
          src={closeIcon}
          onClick={() => {
            toggleOpen(false);
          }}
          alt=""
        />
        
        <div className="apt-cancel-modal">
            <img className="apt-success-icn" src={successIcon} alt=""/>
            <span className="apt-success-msg">
                Your appointment was booked successfully!
            </span>
            <span className="apt-success-sub-msg">
                You will shortly receive confirmation of this with a payment link. Please
                complete the payment before your appointment.
            </span>
            <div style={{ marginBottom: 70 }}>
              <button
                id="auto-apt-success-paylater-btn"
                className="apt-cancel-no-btn"
                onClick={() => {
                  toggleOpen(false);
                }}
              >
                <span>Pay Later</span>
              </button>
              <button
                id="auto-apt-success-paylnow-btn"
								className="apt-cancel-yes-btn"
								onClick={() => {
                }}
							>
                <span>Pay Now</span>
              </button>
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
