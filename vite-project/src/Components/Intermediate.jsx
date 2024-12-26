import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientPage from "../Pages/clientProfile";
import DetailsPage from "../Pages/WorkerPage";

const Intermediate = () => {
  const { name: username } = useParams(); 
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const getRole = async () => {
      const token = localStorage.getItem('token');
      const url = `http://localhost:8080/auth/role/${username}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setRole(data.role); // Set the role in state
      } catch (error) {
        console.error("Error fetching role:", error);
        navigate('/login'); // Redirect on error
      }
    };

    if (username) {
      getRole();
    }
  }, [username, navigate]);

  if (role === 'client') {
    return <ClientPage />;
  } else if (role === 'worker') {
    return <DetailsPage />;
  } else {

    return <div>Loading...</div>;
  }
};

export default Intermediate;
