import React from "react";
import AnimalsContainer from "./AnimalsContainer";
import HelloWorld from "./start;";
import axios from "axios";
import Welcome from "./welcome";
import Registration from "./registration";

let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <img src="/logo.png" />;
}

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            cutenessScore: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get("/getAnimal").then(resp => {
            this.setState({
                name: resp.data.name,
                cutenessScore: resp.data.cutenessScore
            });
        });
    }

    handleChange(e) {
        // console.log(e.target.name); // logging e gives undefined
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick(e) {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>App is running {this.state.name}</h1>
                <AnimalsContainer
                    name={this.state.name}
                    cutenessScore={this.state.cutenessScore}
                />
                <HelloWorld />
                <form>
                    <input
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="cutenessScore"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>Submit</button>
                </form>
            </div>
        );
    }
}
