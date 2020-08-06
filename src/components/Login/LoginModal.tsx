import React from 'react'
import ReactModal from 'react-modal'
import LoginForm from './LoginForm'

import {createUseStyles} from 'react-jss'
import modalClasses from '../../style/modalClasses'
import formClasses from '../../style/formClasses'

const useStyles = createUseStyles({
    boxModal: {...modalClasses.boxModal, 
        textAlign: 'center'
    },
    formButton: {...formClasses.formButton, 
        marginTop: '2%'
    }
})

ReactModal.setAppElement('*')
interface ILoginModalProps {
    show: boolean
}
const LoginModal: React.FC<ILoginModalProps> = (props) => {
    const classes = useStyles()
    const [showModal, setShowModal] = React.useState(false)
    React.useEffect(() => {
        setShowModal(props.show)
    }, [props.show])

    const handleCloseModal = () => {
        setShowModal(false)
    }
    return (
        <ReactModal className={classes.boxModal}
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    isOpen={showModal}
                    onRequestClose={handleCloseModal}>
            <LoginForm />
            
            <button className={classes.formButton} onClick={handleCloseModal}>
                Close
            </button>
        </ReactModal>
    )
}

export default LoginModal
