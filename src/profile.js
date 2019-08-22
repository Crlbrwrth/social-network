import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    return (
        <div className="profile">
            {!props.uploaderVisible && (
                <h1>
                    Welcome back, {props.first} {props.last}
                </h1>
            )}
            {!props.uploaderVisible && (
                <ProfilePic
                    first={props.first}
                    image={props.image}
                    onClick={props.onClick}
                />
            )}
            {!props.uploaderVisible && (
                <button onClick={props.onClick}>
                    {props.image && "Change Profile Picture"}
                    {!props.image && "Upload a Profile Picture"}
                </button>
            )}
            {!props.uploaderVisible && (
                <BioEditor bio={props.bio} changeBio={props.updateBio} />
            )}
        </div>
    );
}
