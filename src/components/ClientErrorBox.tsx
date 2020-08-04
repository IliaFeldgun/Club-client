import React from 'react'
import ClientError from '../engine/api/ClientError'
import ReactModal from 'react-modal'

ReactModal.setAppElement('*')
interface IClientErrorBoxProps {
    error: ClientError
    onModalClose?: () => void
}
const ClientErrorBox: React.FC<IClientErrorBoxProps> = (props) => {
    const [displayError, setDisplayError] = React.useState(true)

    const handleCloseModal = () => {
        setDisplayError(false)
        if (props.onModalClose) {
            props.onModalClose()
        }
    }
    return (
        <React.Fragment>
            <ReactModal 
                className="box-modal error-modal"
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                isOpen={displayError}
                onRequestClose={handleCloseModal}
            >
                <h1>{props.error.httpStatusCode}</h1>
                <h3>{props.error.message}</h3>
                <button className="form-button close-button" onClick={handleCloseModal}>
                    Close
                </button>
            </ReactModal>
        </React.Fragment>
    )
}

export default ClientErrorBox