import React from 'react'
import {createUseStyles} from 'react-jss'
const useStyles = createUseStyles({
    tooltip: {
        fontSize: '2vh',
        lineHeight: '2vh',
        fontWeight: 'normal',
        backgroundColor: '#555',
        color: 'white',
        textAlign: 'center',
        padding: '5px 5px',
        borderRadius: '5px',
        position: 'absolute',
        zIndex: '1001',
        bottom: '100%',
        left: '0',
        opacity: '0',
        transition: 'opacity 0.3s',
        visibility: 'hidden',
        userSelect: 'none',
        '&::after':  {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: '#555 transparent transparent transparent',
        }
    },
    displayTooltip: {
        visibility: 'visible',
        opacity: 1,
    }
})

interface ITooltipProps {
    display: boolean
}
const Tooltip: React.FC<ITooltipProps> = (props) => {
    const classes = useStyles()
    let tooltipClasses = `${classes.tooltip}`
    if (props.display) {
        tooltipClasses += ` ${classes.displayTooltip}`
    }

    return (
        <span className={tooltipClasses}>
            {props.children}
        </span>
    )
}

export default Tooltip