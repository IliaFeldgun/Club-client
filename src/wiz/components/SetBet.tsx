import React from "react"
import ReactModal from 'react-modal'

ReactModal.setAppElement('*')
interface ISetBetProps {
    maxBet: number
    handleBet: (event: React.MouseEvent, bet: number) => void
}
const SetBet: React.FC<ISetBetProps> = (props) => {
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

    const buttonClass = "form-button"
    return (
        <ReactModal className="bet-modal box-modal"
                    isOpen={showModal}>
            <input type="range" defaultValue="0" name="setBet" min="0" max={props.maxBet}
                    onChange={handleBetChange}/>
            <label>{bet}</label>
                <button className={buttonClass} type="button" onClick={handleClick}>
                    <span>
                        Bet!
                    </span>
                </button>
        </ReactModal>
    )
}

export default SetBet