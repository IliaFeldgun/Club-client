import React from "react"

const CardBoard: React.FC = (props) => {
    const classes = "split cardboard left tall three-quarters"
    return (
        <span className={classes}>
            {props.children}
        </span>
    )
}

export default CardBoard