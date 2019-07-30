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
            (async () => {
                if (val) {
                    let sameInput = true;
                    let { data } = await axios.get(`/find-users/${val}/json`);
                    console.log("data.data: ", data.data);
                    setUsers(data.data);
                    return () => {
                        sameInput = false;
                    };
                }
            })();
        },
        [val]
    );

    const onChange = e => {
        setVal(e.target.value);
    };

    return (
        <div id="find-people">
            <h2>These individuals recently joined</h2>

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
                            <img src={user.profile_pic} />
                        </div>
                    );
                })}
            <h3>Find your Friends</h3>
            <input type="text" onChange={onChange} />

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
                            <img src={user.profile_pic} />
                        </div>
                    );
                })}
        </div>
    );
}
