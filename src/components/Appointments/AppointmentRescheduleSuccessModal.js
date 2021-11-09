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
          className="apt-cancel-close-icn"
          src={closeIcon}
          onClick={() => {
            toggleOpen(false);
          }}
          alt=""
        />
        
        <div className="apt-cancel-modal">
            <img className="apt-success-icn" src={successIcon} alt=""/>
            <span className="apt-reschedule-success-msg">
                Your appointment was rescheduled!
            </span>
            <span className="apt-success-sub-msg">
                You will shortly receive confirmation of this with a payment link. Please
                complete the payment before your appointment.
            </span>
            <div style={{ marginBottom: 70 }}>
              <button
								className="apt-reschedule-modal-btn"
								onClick={() => {
                }}
							>
                <span>Go to Dashboard</span>
              </button>
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
