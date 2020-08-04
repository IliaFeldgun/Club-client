import React from 'react'
import ClientError from '../engine/api/ClientError'
import ReactModal from 'react-modal'

ReactModal.setAppElement('*')
interface IClientErrorBoxProps {
    error: ClientError
    onModalClose?: () => void
}
interface IClientErrorBoxState {
    displayError: boolean
}
export default class ClientErrorBox extends React.PureComponent<IClientErrorBoxProps, IClientErrorBoxState>{
    constructor(props: IClientErrorBoxProps) {
        super(props)
        this.state = {
            displayError: true
        }
    }
    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.handleOpenModal()
    }
    handleOpenModal = () => {
        this.setState({ displayError: true })
    }
    
    handleCloseModal = () => {
        this.setState({ displayError: false })
        if (this.props.onModalClose) {
            this.props.onModalClose()
        }
    }
    render() {
        return (
            <React.Fragment>
                <ReactModal 
                    className="box-modal error-modal"
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    isOpen={this.state.displayError}
                    onRequestClose={this.handleCloseModal}
                >
                    <h1>{this.props.error.httpStatusCode}</h1>
                    <h3>{this.props.error.message}</h3>
                    <button className="form-button close-button" onClick={this.handleCloseModal}>
                        Close
                    </button>
                </ReactModal>
            </React.Fragment>
        )
    }
}