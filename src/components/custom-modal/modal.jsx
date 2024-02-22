import { useState } from "react";
import  './modal.css'

export default function Modal({ onClose, currentModalData }) {
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <span onClick={onClose}>close</span>

        {currentModalData.map((modalItem) => (
          <div className={`modal-title`} key={modalItem.title}>
            {" "}
            {modalItem.title}
          </div>
        ))}
      </div>
    </div>
  );
}
