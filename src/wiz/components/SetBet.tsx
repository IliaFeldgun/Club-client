import React from "react"
import ReactModal from 'react-modal'
import {createUseStyles} from 'react-jss'
import modalClasses from '../../style/modalClasses'
import formClasses from '../../style/formClasses'
const useStyles = createUseStyles({
    modal: {...modalClasses.boxModal},
    input: {
        display: 'block'
    },
    button: {...formClasses.formButton,
        float: 'right'
    }

})

ReactModal.setAppElement('*')
interface ISetBetProps {
    maxBet: number
    handleBet: (event: React.MouseEvent, bet: number) => void
}
const SetBet: React.FC<ISetBetProps> = (props) => {
    const classes = useStyles()
    const [bet, setBet] = React.useState(0)
    const [showModal, setShowModal] = React.useState(false)

    const handleBetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBet(parseInt(event.target.value))
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.handleBet(event, bet)
        handleCloseModal()
    }
    const handleOpenModal = () => {
        setShowModal(true)
    }
    
    const handleCloseModal = () => {
        setShowModal(false)
    }
    React.useEffect(() => {
        handleOpenModal()
    }, [])

    return (
        <ReactModal className={classes.modal}
                    isOpen={showModal}>
            <input 
                className={classes.input}
                type="range" 
                defaultValue="0" 
                name="setBet" 
                min="0" 
                max={props.maxBet}
                onChange={handleBetChange}
            />
            <label>{bet}</label>
                <button className={classes.button} type="button" onClick={handleClick}>
                    <span>
                        Bet!
                    </span>
                </button>
        </ReactModal>
    )
}

export default SetBet