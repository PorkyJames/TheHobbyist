import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/profile';
import ManageHobbies from '../ManageHobbies/ManageHobbies'
import UserInfo from '../UserInfo/UserInfo';
import UserTabs from '../UserTabs/UserTabs';
import './UserProfilePage.css';

function UserProfilePage({ userId }) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const isLoading = useSelector((state) => state.profile.isLoading);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfile(userId)); 
        }
    }, [dispatch, userId]); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>Profile not found or user is not logged in.</div>;
    }

    return (
        <div className="profile-container">
            <UserInfo /> 
            <UserTabs /> 
            <div className="tab-content">
                <ManageHobbies />
            </div>
        </div>
    );
}

export default UserProfilePage;

