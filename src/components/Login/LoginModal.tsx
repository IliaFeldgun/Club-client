import React from 'react'
import ReactModal from 'react-modal'
import LoginForm from './LoginForm'

ReactModal.setAppElement('#root');
interface ILoginModalProps {
    show: boolean
}
interface ILoginModalState {
    showModal: boolean
}
export default class LoginModal extends React.PureComponent<ILoginModalProps, ILoginModalState> {
    constructor(props: ILoginModalProps) {
        super(props)

        this.state = {
            showModal: false
        }
    }
    componentDidMount() {
        this.setState({
            showModal: this.props.show
        })
    }
    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.handleOpenModal()
    }
    handleOpenModal = () => {
        this.setState({ showModal: true })
    }
    
    handleCloseModal = () => {
        this.setState({ showModal: false })
    }
    render() {
        return (
            <ReactModal className="box-modal login-modal"
                        shouldCloseOnEsc={true}
                        shouldCloseOnOverlayClick={true}
                        isOpen={this.state.showModal}
                        onRequestClose={this.handleCloseModal}>
                <LoginForm/>
                
                <button className="form-button close-button" onClick={this.handleCloseModal}>
                    Close
                </button>
            </ReactModal>
        )
    }
}