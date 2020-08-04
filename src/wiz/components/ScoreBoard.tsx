import React from "react"

const ScoreBoard: React.FC = (props) => {
    const classes = "split right tall one-quarter"
    return (
        <span className={classes}>
            {props.children}
        </span>
    )
}