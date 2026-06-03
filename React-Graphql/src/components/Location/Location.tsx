import { useQuery } from "@apollo/client/react";
import { Link, useParams } from "react-router-dom";
import "./Location.css";
import { GET_LOCATION } from "../../services/querys";

export const Location = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_LOCATION, {
    variables: {
      id: id ?? "",
    },
    skip: !id,
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <>
        <Link to="/locations" className="back-link">
          ← Back to locations
        </Link>
        <h1>Error loading location</h1>
      </>
    );
  }

  if (!data?.location) {
    return <h1>Location not found</h1>;
  }

  const location = data.location;

  return (
    <div className="location-page">
      <div className="back-container">
        <Link className="back-link" to="/locations">
          ← Back to locations
        </Link>
      </div>

      <div className="location-content">
        <h1>{location.name}</h1>

        <p>Type: {location.type}</p>

        <p>Dimension: {location.dimension}</p>

        <h2>Residents</h2>

        <div className="residents-container">
          {location.residents.map((resident) => (
            <Link
              key={resident.id}
              to={`/characters/${resident.id}`}
              className="resident-card"
            >
              <h3>{resident.name}</h3>

              <p>{resident.status}</p>

              <p>{resident.species}</p>

              <img src={resident.image} alt={resident.name} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
