import React from "react";

export default function ProfilePic({ image, first, onClick }) {
    return <img src={image} alt={first} onClick={onClick} />;
}
