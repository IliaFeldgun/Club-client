import React from "react"
const styles : React.CSSProperties = {
    flexGrow: 1,
    position: 'relative',
    background: 'rgba(7,150,34)'
}
const CardBoard: React.FC = (props) => {
    // const classes = "split cardboard left tall three-quarters"
    return (
        <span style={styles}>
            {props.children}
        </span>
    )
}

export default CardBoard