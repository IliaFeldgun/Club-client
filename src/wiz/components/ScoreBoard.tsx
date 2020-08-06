import React from "react"
const styles: React.CSSProperties = {
    flexBasis: '25%'
}
const ScoreBoard: React.FC = (props) => {
    // const classes = "split right tall one-quarter"
    return (
        <span style={styles}>
            {props.children}
        </span>
    )
}

export default ScoreBoard