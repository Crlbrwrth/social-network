import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    return (
        <div className="profile">
            <h1>
                Welcome back, {props.first} {props.last}
            </h1>
            <ProfilePic
                first={props.first}
                image={props.image}
                onClick={props.onClick}
            />
            <BioEditor bio={props.bio} changeBio={props.updateBio} />
        </div>
    );
}

// <div>
//     <h3>Your Bio</h3>
//     <p>{props.bio}</p>
// </div>
