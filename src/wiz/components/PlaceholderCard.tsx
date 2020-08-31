import React from 'react'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    card: {
        width: '12vmax',
        height: '18vmax',
        position: 'fixed',
        margin: '0',
        transformOrigin: 'left bottom',
        fontSize: '2.5vmax',
        fontFamily: 'sans-serif',
        lineHeight: '2.5vmax',
        borderStyle: 'double',
        borderWidth: 'thin',
        borderRadius: '5px',
        paddingLeft: '0.5vmax',
        userSelect: 'none',
        boxShadow: '5px 10px rgba(0,0,0,0.2)',
        '&:hover': {
            zIndex: '1000',
            // boxShadow: '3px 5px'
        }
    },
    placeholder: {
        boxShadow: 'none',
        borderStyle: 'ridge',
        borderWidth: 'medium',
    }

})

const PlaceholderCard: React.FC = () => {
    const classes = useStyles()
    return (<span className={`${classes.card} ${classes.placeholder}`}/>)
}

export default PlaceholderCard