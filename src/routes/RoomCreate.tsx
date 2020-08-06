import React from 'react'
import LobbyApi from '../engine/api/LobbyApi'
import LoginModal from '../components/Login/LoginModal'
import ClubSession from '../utils/ClubSession'
import ClientError from '../engine/api/ClientError'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    centeredTop: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        textAlign: 'center',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content'
    },
    formButton: {
        backgroundColor: 'rgb(0, 102, 153)',
        border: 0,
        color: 'white',
        borderRadius: '3px',
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '6px',
        paddingRight: '6px',
        marginTop: '5px',
        marginBottom: '5px',
        '&:hover': {
            backgroundColor: 'cornflowerblue'
        }
    }
})

const Rooms: React.FC = () => {
    const classes = useStyles()
    const [isLoggedIn, setIsLoggedIn] = React.useState(true)
    React.useEffect(() => {
        setIsLoggedIn(ClubSession.getPlayerId() !== null)
    }, [isLoggedIn])

    const handleRoomCreation = (event: React.MouseEvent<HTMLButtonElement>) => {
        LobbyApi.newRoom().then((roomId) => {
            // TODO: Make sure there is no better way
            window.location.assign("/room/" + roomId) 
        }).catch((error: ClientError) => {
            // TODO: Handle better, 401
            console.error(`${error.httpStatusCode}: ${error.message}`)
        })
    }
    
    return (
        <React.Fragment>
            <div className={classes.centeredTop}>
                <h3>Create a room</h3>
                <button 
                    className={classes.formButton} 
                    type="button" 
                    onClick={handleRoomCreation}
                >
                    <span>New Room</span>
                </button>
            </div>
            <LoginModal show={!isLoggedIn} />
        </React.Fragment>
    )
}

export default Rooms