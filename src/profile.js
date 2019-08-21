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
            <button onClick={props.onClick}>
                {props.image && "Change Profile Picture"}
                {!props.image && "Upload a Profile Picture"}
            </button>
            <BioEditor bio={props.bio} changeBio={props.updateBio} />
        </div>
    );
}
