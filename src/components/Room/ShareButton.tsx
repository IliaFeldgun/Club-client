import React from 'react'
import ReactModal from 'react-modal'

interface IShareButtonProps {
    targetUrl: string
}
const ShareButton: React.FC<IShareButtonProps> = (props) => {
    const [showModal, setShowModal] = React.useState(false)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleOpenModal()
    }
    const handleOpenModal = () => {
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.currentTarget.select()
        document.execCommand("copy")
    }

    const buttonClass = "form-button"
    return (
        <React.Fragment>
            <button className={buttonClass} type="button" onClick={handleClick}>
                <span>Share room link</span>
            </button>
            
            <ReactModal 
                className="box-modal share-modal" 
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                isOpen={showModal}
                onRequestClose={handleCloseModal}
            >
                <h3>Share this link:</h3>
                <input 
                    className="url-textbox" 
                    type="url" 
                    value={props.targetUrl} 
                    onClick={handleInputClick} 
                    readOnly={true}
                />
                <button className="form-button" onClick={handleCloseModal}>
                    Close
                </button>
            </ReactModal>
        </React.Fragment>
    )
}

export default ShareButton