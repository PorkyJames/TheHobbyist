import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createHobby } from '../../redux/hobby';
import { useNavigate } from 'react-router-dom';

import "./CreateHobbyForm.css"

const CreateHobbyForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdHobby = await dispatch(createHobby(formData));
        if (createdHobby && createdHobby.id) {
            navigate(`/hobbies/${createdHobby.id}`);
        }
    };

return (
    <div className="create-hobby-form-container">

        <form onSubmit={handleSubmit} className="create-hobby-form">    

            <h2>Create a New Hobby</h2>

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

            <button type="submit" className="submit-btn">Create Hobby</button>

        </form>
    </div>
    );
};

export default CreateHobbyForm;
