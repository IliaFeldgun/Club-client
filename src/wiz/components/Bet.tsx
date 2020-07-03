import React from "react"
// TODO: Unused, possibly not needed
interface IBetProps {
    bet: number
}
interface IBetState {

}
export default class Bet extends React.PureComponent<IBetProps,IBetState>{
    render() {
        return (
            <h3>Bet: {this.props.bet}</h3>
        )
    }
}