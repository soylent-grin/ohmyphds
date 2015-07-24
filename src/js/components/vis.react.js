"use strict";

import React from 'react';
import { BarChart } from 'react-d3-components';

const csv = require('csv');

const PROFILES = [
"05.13.01",
"05.13.05",
"05.13.06",
"05.13.11",
"05.13.12",
"05.13.15",
"05.13.17",
"05.13.18"
];


export default class VisSection extends React.Component {

    constructor(props) {
        super(props);

        // instead of getInitialState in new React notation
        this.state = {
            isLoading: true,
            error: false,
            marks: {}
        };
    }

    // lifecycle methods
    componentWillMount() {

    }
    componentDidMount() {
        $.when(
            $.get(this.props.data.phil),
            $.get(this.props.data.lang),
            $.get(this.props.data.spec)
        ).done((p, l, s) => {
            this.processData(p[0], l[0], s[0]);
        }).fail(() => {
            this.setState({
                error: true
            });
        });
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


    // common helpers
    processData(phil, lang, spec) {
        let result = [];
        csv.parse(phil, (error, data) => {
            result = result.concat(data.splice(1, data.length)).map((d) => {
                d.push("phil");
                return d;
            });
            csv.parse(lang, (error, data) => {
                result = result.concat(data.splice(1, data.length)).map((d) => {
                    d.push("lang");
                    return d;
                });
                csv.parse(spec, (error, data) => {
                    result = result.concat(data.splice(1, data.length)).map((d) => {
                        d.push("spec");
                        return d;
                    });
                    this.processResult(this.filterResult(result));
                });
            });
        });
    }
    filterResult(r) {
        let arr = {};
        r = r.filter((d) => {
            if (!arr[`${d[0]}.${d[3]}`]) {
                arr[`${d[0]}.${d[3]}`] = true;
                if (PROFILES.indexOf(d[1]) > -1) {
                    return true;
                }
                return false;
            }
            return false;
        });
        return r;
    }
    processResult(r) {
        let arr = {

        };
        r.map((res) => {
            if (!arr[res[0]]) {
                arr[res[0]] = 0;
            }
            arr[res[0]] += parseInt(res[2]);
        });

        let arr2 = {};
        for (let name in arr) {
            if (!arr2[arr[name]]) {
                arr2[arr[name]] = 0;
            }
            arr2[arr[name]]++;
        }

        this.setState({
            isLoading: false,
            marks: arr2
        });
    }

    // render helpers


    render() {

        if (this.state.isLoading) {
            return <div>Загружается...</div>;
        } else if (this.state.error) {
            return <div>Одна или более ссылок невалидны</div>;
        }

        let data = [{
            label: "Overall",
            values: []
        }];

        for (let mark in this.state.marks) {
            data[0].values.push(
                {
                    x: mark,
                    y: this.state.marks[mark]
                }
            );
        }
        return (
            <div>
                <BarChart
                    data={data}
                    width={400}
                    height={400}
                    margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
            </div>
        );
    }
}
