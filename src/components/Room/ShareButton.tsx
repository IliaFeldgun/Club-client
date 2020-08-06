import React from 'react'
import ReactModal from 'react-modal'

import {createUseStyles} from 'react-jss'
import formClasses from '../../style/formClasses'
import modalClasses from '../../style/modalClasses'
const useStyles = createUseStyles({
    boxModal: {...modalClasses.boxModal,
        width: '80%'
    },
    formButton: formClasses.formButton,
    urlInput: {
        width: '99%'
    },
    closeButton: {...formClasses.formButton,
        position: 'relative',
        left: '50%',
        transform: 'translate(-50%, 0)'
    }
})

interface IShareButtonProps {
    targetUrl: string
}
const ShareButton: React.FC<IShareButtonProps> = (props) => {
    const classes = useStyles()
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

    return (
        <React.Fragment>
            <button className={classes.formButton} onClick={handleClick}>
                <span>Share room link</span>
            </button>
            
            <ReactModal 
                className={classes.boxModal}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                isOpen={showModal}
                onRequestClose={handleCloseModal}
            >
                <h3>Share this link:</h3>
                <input
                    className={classes.urlInput}
                    type="url" 
                    value={props.targetUrl} 
                    onClick={handleInputClick} 
                    readOnly={true}
                />
                <button className={classes.closeButton} onClick={handleCloseModal}>
                    Close
                </button>
            </ReactModal>
        </React.Fragment>
    )
}

export default ShareButton