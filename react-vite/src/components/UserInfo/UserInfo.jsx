import { useSelector } from "react-redux/es/hooks/useSelector";

function UserInfo() {
    const profile = useSelector((state) => state.profile.profile);
    const isLoading = useSelector((state) => state.profile.isLoading);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>No profile found.</div>;
    }

    return (
        <div className="user-info">
            {/* Replace with actual user icon */}
            <div className="user-icon">
                <i className="fas fa-user-circle"></i>
            </div>
            <div className="username">{profile.username}</div>
            <div className="personal-info">
                {/* Assuming profile contains firstName and lastName */}
                <div>{profile.firstName} {profile.lastName}</div>
                <div>{profile.mbti}</div>
                <div>{profile.bio}</div>
            </div>
        </div>
    );
}

export default UserInfo;
