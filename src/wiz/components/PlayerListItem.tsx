import React from 'react'
import {createUseStyles} from 'react-jss'
import tooltipClasses from '../../style/tooltipClasses'
const useStyles = createUseStyles({...tooltipClasses,
    listItem: {
        display: 'block',
        borderStyle: 'groove',
        borderRadius: '7px',
        padding: '0.5vh',
        marginBottom: '0.5vh',
        fontSize: '2.5vw'
    },
    highlight: {
        fontWeight: 'bold'
    },
    name: {

    },
    score: {
        position: 'relative',
        float: 'right',
        fontSize: '5vw'
    },
    bet: {
        position: 'relative',
        display: 'inline-block',
        width: '3vw',
        borderRadius: '100%',
        textAlign: 'center',
        fontSize: '2.5vw',
        lineHeight: '3vw',
        borderWidth: '2px',
        borderStyle: 'inset',
        borderColor: 'gold',
        background: 'rgb(255, 255, 102)'
    },
    takes: {
        position: 'relative',
        display: 'inline-block',
        width: '2.5vw',
        borderRadius: '5px',
        textAlign: 'center',
        lineHeight: '3vw',
        borderWidth: '2px',
        borderStyle: 'outset',
        borderColor: 'whitesmoke',
        background: 'royalblue',
        color: 'white',
        marginLeft: '1vw',
    },
    betTakeContainer: {
        display: 'block'
    }
})
interface IPlayerListItemProps {
    name: string,
    score: number,
    bet: number,
    takes: number,
    highlight: boolean
}
const PlayerListItem: React.FC<IPlayerListItemProps> = (props) => {
    const classes = useStyles()
    
    return (
        <span className={
            `${props.highlight ? classes.highlight : ""} ${classes.listItem}`
        }>
            <span className={classes.name}>{props.name}</span>
            <span className={`${classes.score} ${classes.tooltipTarget}`}>
                {props.score}
                <span className={classes.tooltip}>Score</span>
            </span>
            <span className={classes.betTakeContainer}>
                <span className={`${classes.bet} ${classes.tooltipTarget}`}>
                    {props.bet}
                    <span className={classes.tooltip}>Bet</span>
                </span>
                
                <span className={`${classes.takes} ${classes.tooltipTarget}`}>
                    {props.takes}
                    <span className={classes.tooltip}>Takes</span>
                </span>
            </span>
        </span>
    )
}

export default PlayerListItem