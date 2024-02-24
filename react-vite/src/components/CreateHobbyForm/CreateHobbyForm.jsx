import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createHobby } from '../../redux/hobby';
import { useNavigate } from 'react-router-dom';

import "./CreateHobbyForm.css"

const CreateHobbyForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    thoughts: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(createHobby(formData));
        if (result && result.id) {
            navigate(`/hobbies/${result.id}`);
        } else if (result && result.errors) {
            // Here you would set the error state with the errors from result.errors
            setErrors(result.errors);
        }
    };

return (
    <div className="create-hobby-form-container">

        <div className="form-introduction">
            <h2>Tell us About the Hobby</h2>
            <p>Anything exciting happen that'll give someone else some insight?</p>
        </div>

        <form onSubmit={handleSubmit} className="create-hobby-form">    

            <div className="form-group">
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

            <div className="form-group">
                {errors.description && <div className="error-message">{errors.description}</div>}
                <label htmlFor="description">Description</label>    
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Hobby Description"
                    rows="6" 
                />
            </div>

            <div className="form-group">
                {errors.location && <div className="error-message">{errors.location}</div>}
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

            <div className="form-group">
                {errors.thoughts && <div className="error-message">{errors.thoughts}</div>}
                <label htmlFor="thoughts">Thoughts</label>
                <input
                    type="text"
                    id="thoughts"
                    name="thoughts"
                    value={formData.thoughts}
                    onChange={handleChange}
                    placeholder="Thoughts"
                />
            </div>

            <button type="submit" className="submit-btn">Create Hobby</button>

        </form>
    </div>
    );
};

export default CreateHobbyForm;
