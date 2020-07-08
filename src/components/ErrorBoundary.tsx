import React from 'react'
import ClientError from '../engine/api/ClientError'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')
interface IErrorBoundaryProps {

}
interface IErrorBoundaryState {
    displayError: boolean,
    lastError?: Error
}
export default class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState>{
    constructor(props: IErrorBoundaryProps) {
        super(props)
        this.state = {
            displayError: false,
            lastError: undefined
        }
    }
    componentDidCatch(error: ClientError) {
        this.setState({
            displayError: true,
            lastError: error
        })
        // TODO: Find a service to log error using http
    }
    render() {
        const errorDisplay = !this.state.displayError ? <React.Fragment /> :
        <React.Fragment>
            <h3>{this.state.lastError?.message}</h3>
        </React.Fragment>
        return (
            <React.Fragment>
                {this.props.children}
                {errorDisplay}
            </React.Fragment>
        )
    }
}