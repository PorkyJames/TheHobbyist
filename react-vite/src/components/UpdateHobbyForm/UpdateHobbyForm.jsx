import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getHobbyById, updateHobby } from '../../redux/hobby';

import "./UpdateHobbyForm.css";

const UpdateHobbyForm = () => {
    const { hobbyId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hobbyDetails = useSelector(state => state.hobby[hobbyId]);
    // console.log(hobbyDetails, "<<<< hobbyDetails")

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
    });

    // Fetch hobby details when component mounts or hobbyId changes
    useEffect(() => {
        if (!hobbyDetails) {
            dispatch(getHobbyById(hobbyId));
        } else {
            setFormData({
                name: hobbyDetails.name || '',
                description: hobbyDetails.description || '',
                location: hobbyDetails.location || '',
            });
        }
    }, [hobbyId, hobbyDetails, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedHobby = await dispatch(updateHobby(hobbyId, formData));
            if (updatedHobby.error) {
                throw new Error(updatedHobby.error.message);
            }
            navigate(`/hobbies/${hobbyId}`);
        } catch (error) {
            console.error('Failed to update hobby:', error);
        }
    };

    if (!hobbyDetails && !formData.name) {
        return <div>Loading...</div>;
    }

    return (
        <div className="update-hobby-form-container">
            <form onSubmit={handleSubmit} className="update-hobby-form">
                <h2>Update Hobby</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength="20"
                        placeholder="Hobby Name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        maxLength="50"
                        placeholder="Hobby Description"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        maxLength="30"
                        placeholder="Location"
                    />
                </div>

                <button type="submit" className="submit-btn">Update Hobby</button>
            </form>
        </div>
    );
};

export default UpdateHobbyForm;
