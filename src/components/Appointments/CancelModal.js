import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import closeIcon from "../../assests/images/close_icon.png";
import userIcon from '../../assests/images/user_icon.png';
import calendarIcon from '../../assests/images/icon_calendar.png'

const CancelModal = ({ open, toggleOpen }) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isStillConfirmed, setStillConfirmed] = useState(false)

  return (
    <Modal
      open={open}
      onClose={() => {
        setIsCancelled(false)
        toggleOpen(false);
      }}
    >
      <div className="apt-cancel-modal-container">
        <img
          id="auto-appt-cancel"
          className="apt-cancel-close-icn"
          src={closeIcon}
          onClick={() => {
            toggleOpen(false);
          }}
          alt=""
        />
        {isStillConfirmed && (
          <div className="apt-cancel-modal">
            <span className="apt-cancel-confirm-msg">
              Your appointment is still confirmed, no changes were made.
            </span>
            <img className="apt-calendar-icn" src={calendarIcon} alt=""/>
          </div>
        )}
        {isCancelled && (
          <div className="apt-cancel-modal">
						<span className="apt-cancel-success-msg">
							Your appointment has been canceled.
						</span>
						<span className="apt-cancel-success-sub-msg">
							Our team may contact you if any cancellation charges are applicable.
						</span>
						<img className="apt-user-icn" src={userIcon} alt=""/>
					</div>
        )}
        { !isStillConfirmed && !isCancelled && (
          <div className="apt-cancel-modal">
            <span className="apt-cancel-msg">
              Please note cancellation charge may apply. Do you still wish to
              proceed and cancel?
            </span>
            <div>
              <button
                id="auto-appt-cancel-no-btn"
                className="apt-cancel-no-btn"
                onClick={() => {
                  // toggleOpen(false);
                  setStillConfirmed(true)
                }}
              >
                <span>No</span>
              </button>
              <button
                id="auto-appt-cancel-yes-btn"
								className="apt-cancel-yes-btn"
								onClick={() => {
                  setIsCancelled(true);
                }}
							>
                <span>Yes</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CancelModal;
