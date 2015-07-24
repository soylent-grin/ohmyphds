"use strict";

import React from 'react';

export default class WaitingSection extends React.Component {

    constructor(props) {
        super(props);

        // instead of getInitialState in new React notation
        this.state = {

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
    handleGoClick() {
        let data = {
            phil: this.refs.phil.getDOMNode().value,
            spec: this.refs.spec.getDOMNode().value,
            lang: this.refs.lang.getDOMNode().value
        };
        this.props.onFormSubmited(data);
    }

    // common helpers


    // render helpers


    render() {
        return (
            <div id="wait">
                  <div className="form-group">
                    <input className="form-control" ref="spec" defaultValue="https://dl.dropboxusercontent.com/u/39622126/ohmyphds/spec.csv" />
                  </div>
                  <div className="form-group">
                    <input className="form-control" ref="lang" defaultValue="https://dl.dropboxusercontent.com/u/39622126/ohmyphds/lang.csv" />
                  </div>
                  <div className="form-group">
                    <input className="form-control" ref="phil" defaultValue="https://dl.dropboxusercontent.com/u/39622126/ohmyphds/phil.csv" />
                  </div>
                  <button className="btn btn-primary" onClick={this.handleGoClick.bind(this)}>Go</button>
            </div>
        );
    }
}
