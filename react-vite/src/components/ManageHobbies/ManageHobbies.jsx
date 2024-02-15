import { useEffect, useState } from 'react';

const ManageHobbies = () => {
  const [hobbies, setHobbies] = useState([]);

    useEffect(() => {
        fetch('/api/hobbies/current', {
            headers: {
            // Include auth headers if necessary, e.g., for JWT
            'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setHobbies(data))
            .catch(error => console.error('Error fetching hobbies:', error));
    }, []);

  return (
    <div>
      <h2>My Hobbies</h2>
      <ul>
        {hobbies.map(hobby => (
          <li key={hobby.id}>
            <h3>{hobby.name}</h3>
            <p>{hobby.description}</p>
            <p>Location: {hobby.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageHobbies;
