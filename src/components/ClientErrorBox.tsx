import React from 'react'
import ClientError from '../engine/api/ClientError'
import ReactModal from 'react-modal'

import {createUseStyles} from 'react-jss'
import modalClasses from '../style/modalClasses'
import formClasses from '../style/formClasses'

const useStyles = createUseStyles({
    boxModal: {...modalClasses.boxModal, 
        textAlign: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%'
    },
    formButton: {...formClasses.formButton, 
        marginTop: '2%', 
        float: 'right'
    }
})

ReactModal.setAppElement('*')
interface IClientErrorBoxProps {
    error: ClientError
    onModalClose?: () => void
}
const ClientErrorBox: React.FC<IClientErrorBoxProps> = (props) => {
    const classes = useStyles()
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
                className={classes.boxModal}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                isOpen={displayError}
                onRequestClose={handleCloseModal}
            >
                <h1>{props.error.httpStatusCode}</h1>
                <h3>{props.error.message}</h3>
                <button className={classes.formButton} onClick={handleCloseModal}>
                    Close
                </button>
            </ReactModal>
        </React.Fragment>
    )
}

export default ClientErrorBox