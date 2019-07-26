import React from "react";

export default function ProfilePic({ image, first, onClick }) {
    return (
        <div id="profile-pic">
            <img src={image} alt={first} onClick={onClick} />
        </div>
    );
}
