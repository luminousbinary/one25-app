import { useState } from "react";
import Modal from "./modal";

export default function ModalTest() {
  const [showModal, setShowModal] = useState(false);

  const data = [
    {
      title: "Tab 3",
      content: (
        <div>
          <h1>This is content tab3 </h1>
          <div> this too is okay right</div>
        </div>
      ),
    },
  ];
  function handleShowModal() {
    setShowModal(!showModal);
  }

  function onClose() {
    setShowModal(false);
  }

  console.log(showModal);
  return (
    <div className="modal-test-wrapper">
      <button onClick={() => handleShowModal()}>
        Click here to show modal
      </button>

      {showModal && <Modal currentModalData={data} onClose={onClose} />}
    </div>
  );
}
