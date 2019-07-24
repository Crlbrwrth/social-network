import React from "react";
import HelloWorld from "./start";
import axios from "./axios";
import Registration from "./registration";
import Welcome from "./welcome";
import StartPage from "./startpage";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {}

    handleChange(e) {
        console.log(e);
        // console.log(e.target.name); // logging e gives undefined
    }

    handleClick(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <StartPage />
            </div>
        );
    }
}
