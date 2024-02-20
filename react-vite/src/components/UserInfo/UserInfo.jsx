import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { fetchUserProfile } from "../../redux/profile";

import "./UserInfo.css"

function UserInfo({ userId }) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const isLoading = useSelector((state) => state.profile.isLoading);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfile(userId));
        }
    }, [userId, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>No profile found.</div>;
    }

    return (
        <div className="user-info">
            <div className="user-icon">
                <i className="fas fa-user-circle"></i>
            </div>
            <div className="username">{profile.username}</div>
            <h2> About Me: </h2>
            <div className="personal-info">
                <div>{profile.mbti}</div>
                <div>{profile.bio}</div>
            </div>
        </div>
    );
}

export default UserInfo;
