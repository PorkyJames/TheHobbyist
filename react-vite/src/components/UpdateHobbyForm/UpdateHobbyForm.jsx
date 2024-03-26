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

    const [errors, setErrors] = useState([])

    // console.log(hobbyDetails, "<<<< hobbyDetails")

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        thoughts: '',
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
                thoughts: hobbyDetails.thoughts || '',
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
        const res = await dispatch(updateHobby(hobbyId, formData));
        if (res.error) {
            setErrors(res.error);
        } else {
            setErrors([]); 
            navigate(`/hobbies/${hobbyId}`);
        }
    };

    if (!hobbyDetails && !formData.name) {
        return <div>Loading...</div>;
    }

    return (
        <div className="update-hobby-form-container">

            <div className="form-introduction">
                <h2>Anything new with the Hobby?</h2>
                <p>Let us know what's changed or any new insights you have.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="update-hobby-form">

                <div className="form-group">

                {/* {Object.keys(errors).length > 0 && (
                    <div className="error-messages">
                        {Object.keys(errors).map((errorKey) => (
                            <p key={errorKey}>{errors[errorKey]}</p>
                        ))}
                    </div>
                )} */}

                {errors.name && <div className="error-message">{errors.name}</div>}
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Hobby Name"
                    />
                </div>

                {errors.description && <div className="error-message">{errors.description}</div>}
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Hobby Description"
                    />
                </div>

                {errors.location && <div className="error-message">{errors.location}</div>}
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                    />
                </div>

                {errors.thoughts && <div className="error-message">{errors.thoughts}</div>}
                <div className="form-group">
                    <label htmlFor="thoughts">Thoughts</label>
                    <input
                        type="text"
                        id="location"
                        name="thoughts"
                        value={formData.thoughts}
                        onChange={handleChange}
                        placeholder="Thoughts"
                    />
                </div>

                <button type="submit" className="submit-btn">Update Hobby</button>
            </form>
        </div>
    );
};

export default UpdateHobbyForm;
