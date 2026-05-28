import { useEffect, useState } from "react";
import "./Locations.css";
import { Link } from "react-router-dom";
import { getAllLocations } from "../../services/locations";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getAllLocationsAndHandleErrors = async () => {
    try {
      const responseGetAllLocations = await getAllLocations();
      setLocations(responseGetAllLocations.results);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error fetching locations");
    }
  };

  useEffect(() => {
    getAllLocationsAndHandleErrors();
  }, []);

  return (
    <div className="locations-page">
      <div className="back-home-container">
        <Link to="/" className="back-home-link">
          Back to Home
        </Link>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="locations-container">
        {locations.map((location) => (
          <Link
            key={location.id}
            to={`/locations/${location.id}`}
            className="location-link"
          >
            <div className="location-card">
              <h2 className="location-title">{location.name}</h2>
              <p className="location-type">{location.type}</p>
              <p className="location-dimension">{location.dimension}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
