import React, { Component } from 'react';

export default class NewReactComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <>
                <h2>A new react component</h2>
                <p>Output...{this.state.date.toLocaleTimeString()}</p>
            </>
        )
    }

}