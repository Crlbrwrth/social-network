import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    console.log("props1", props);
    return (
        <div className="profile-component">
            <h2>
                Profile of {props.first} {props.last}
            </h2>
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
