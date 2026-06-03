import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Locations.css";
import { GET_LOCATIONS } from "../../services/querys";

export const Locations = () => {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery(GET_LOCATIONS, {
    variables: { page },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <>
        <Link to="/" className="back-home-link">
          Back to Home
        </Link>
        <h1>Error fetching locations</h1>
      </>
    );
  }

  const locations = data?.locations?.results ?? [];
  const info = data?.locations?.info;

  return (
    <div className="locations-page">
      <div className="back-home-container">
        <Link to="/" className="back-home-link">
          Back to Home
        </Link>
      </div>

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

      {info && (
        <div className="pagination-container">
          <p className="pagination-info">
            Page {page} of {info.pages}
          </p>

          <div className="pagination-buttons">
            {info.prev && (
              <button
                className="pagination-button"
                onClick={() => setPage(info.prev)}
              >
                Back
              </button>
            )}

            {info.next && (
              <button
                className="pagination-button"
                onClick={() => setPage(info.next)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
