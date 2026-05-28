import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Location.css";
import { getLocationById } from "../../services/locations";

export const Location = () => {
  const { id } = useParams();

  const [location, setLocation] = useState(null);

  const getLocationAndHandleErrors = async () => {
    try {
      const response = await getLocationById(`${id}`);

      setLocation(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationAndHandleErrors();
  }, []);

  if (!location) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="location-page">
      <div className="back-container">
        <Link className="back-link" to="/locations">
          ← Back to location
        </Link>
      </div>

      <div className="location-content">
        <h1>{location.name}</h1>
        <p>Type: {location.type}</p>
        <p>Dimension: {location.dimension}</p>
      </div>
    </div>
  );
};
