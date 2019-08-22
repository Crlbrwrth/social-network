import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople(props) {
    const [users, setUsers] = useState();
    const [val, setVal] = useState();
    const [lastUsers, setLastUsers] = useState();

    useEffect(() => {
        (async () => {
            let { data } = await axios.get("/last-users");
            setLastUsers(data.result);
        })();
    }, []);

    useEffect(
        () => {
            let ignore;
            (async () => {
                if (val) {
                    let { data } = await axios.get(`/find-users/${val}/json`);
                    if (!ignore) {
                        setUsers(data.data);
                    }
                }
            })();
            return () => {
                ignore = true;
            };
        },
        [val]
    );

    const onChange = e => {
        setVal(e.target.value);
    };

    return (
        <div id="find-people">
            <h1>These individuals recently joined</h1>
            <div className="last-joined">
                {lastUsers &&
                    lastUsers.map((user, i) => {
                        if (!user.profile_pic) {
                            user.profile_pic = "logo.jpg";
                        }
                        return (
                            <div className="last-users-list" key={i + 1}>
                                <p>
                                    <strong>
                                        {user.first} {user.last}
                                    </strong>
                                </p>
                                <a href={"user/" + user.id}>
                                    <img src={user.profile_pic} />
                                </a>
                            </div>
                        );
                    })}
            </div>
            <div className="find-friends">
                <h3>Find your Friends</h3>
                <input type="text" onChange={onChange} />
            </div>
            <div className="friends-result">
                {users &&
                    users.map((user, i) => {
                        if (!user.profile_pic) {
                            user.profile_pic = "logo.jpg";
                        }
                        return (
                            <div className="users-found-list" key={i + 1}>
                                <p>
                                    <strong>
                                        {user.first} {user.last}
                                    </strong>
                                </p>
                                <a href={"user/" + user.id}>
                                    <img src={user.profile_pic} />
                                </a>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
