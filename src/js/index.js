"use strict";

import React from 'react';

import Vis from './components/vis.react';
import Wait from './components/waiting.react';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        // instead of getInitialState in new React notation
        this.state = {
            waitingForURLs: true,
            data: {}
        };
    }

    // lifecycle methods
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillUpdate(nextProps, nextState) {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() {

    }


    // UI and stores handlers
    handleFormSubmited(data) {
        this.setState({
            waitingForURLs: false,
            data: data
        });
    }

    // common helpers


    // render helpers


    render() {
        return (

                this.state.waitingForURLs ?
                        <Wait onFormSubmited={this.handleFormSubmited.bind(this)}></Wait> :
                        <Vis data={this.state.data}></Vis>

        );
    }
}

React.render(<App></App>, document.getElementById('container'));
