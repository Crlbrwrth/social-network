import React from "react";
import AnimalsContainer from "./AnimalsContainer";
import HelloWorld from "./start";
import axios from "axios";
import Registration from "./registration";
import Welcome from "./welcome";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {}

    handleChange(e) {
        // console.log(e.target.name); // logging e gives undefined
    }

    handleClick(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Welcome />
                <Registration />
            </div>
            // <div>
            //     <h1>App is running {this.state.name}</h1>
            //     <AnimalsContainer
            //         name={this.state.name}
            //         cutenessScore={this.state.cutenessScore}
            //     />
            //     <HelloWorld />
            //     <form>
            //         <input
            //             type="text"
            //             name="name"
            //             onChange={this.handleChange}
            //         />
            //         <input
            //             type="text"
            //             name="cutenessScore"
            //             onChange={this.handleChange}
            //         />
            //         <button onClick={this.handleClick}>Submit</button>
            //     </form>
            // </div>
        );
    }
}
