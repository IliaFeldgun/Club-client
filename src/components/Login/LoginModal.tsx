import React from 'react'
import ReactModal from 'react-modal'
import LoginForm from './LoginForm'

ReactModal.setAppElement('*')
interface ILoginModalProps {
    show: boolean
}
const LoginModal: React.FC<ILoginModalProps> = (props) => {
    const [showModal, setShowModal] = React.useState(false)
    React.useEffect(() => {
        setShowModal(props.show)
    }, [props.show])

    const handleCloseModal = () => {
        setShowModal(false)
    }
    return (
        <ReactModal className="box-modal login-modal"
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    isOpen={showModal}
                    onRequestClose={handleCloseModal}>
            <LoginForm />
            
            <button className="form-button close-button" onClick={handleCloseModal}>
                Close
            </button>
        </ReactModal>
    )
}

export default LoginModal
