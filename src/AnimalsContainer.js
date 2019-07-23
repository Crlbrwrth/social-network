import React from "react";

//The state of a parent component becomes the props of its child

export default function AnimalsContainer(props) {
    return (
        <div>
            <h2>Animals Container is up and running</h2>
            <p>
                Look, there is a {props.name}, it is {props.cutenessScore}
            </p>
        </div>
    );
}

// export default class AnimalsContainer extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         console.log("this", this);
//         return (
//             <div>
//                 <h2>Animals Container is up and running</h2>
//                 <p>
//                     Look, there is a {this.props.name}, it is
//                     {this.props.cutenessScore}
//                 </p>
//             </div>
//         );
//     }
// }
