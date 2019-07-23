//THIS RED UNDERLINE IS JUST AN LINTER ERROR
import React from "react";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Welcome to Social Network</h2>
                <p>This is a Website for nice people</p>
            </div>
        );
    }
}
