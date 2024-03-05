import React from 'react';

const Home: React.FunctionComponent = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://10.0.2.2:8000/users/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            response.json()
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Hola</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;