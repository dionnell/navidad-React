import { useState } from "react"
import ReactModal from "react-modal"
import { Formulario } from "./Formulario"


export const PedirDeseo = () => {
  const [showModal, setShowModal] = useState(false)
    const handleOpenModal = () => {
        setShowModal(true)
    }
      
  const handleCloseModal = () => {
      setShowModal(false) 
  }

  return (
    <>
      <div className="p-11 me-auto ms-auto ">
          <button 
            className="button border-2"
            onClick={handleOpenModal}
          >
            Pedir Regalo
            <div class="hoverEffect">
              <div></div>
            </div>
          </button>
      </div>
      <ReactModal
        isOpen={showModal}
        contentLabel=""
        onRequestClose={handleCloseModal}
        className="Modal"
        ariaHideApp={false}
        overlayClassName="Overlay"
      >
        <Formulario/>
      </ReactModal>
    </>
  )
}
