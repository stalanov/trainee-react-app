import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './VehicleCard.css';

function VehicleCard(props) {
  const { vehicle } = props;
  const link = '/vehicles/' + vehicle.vehicleId;

  return (
    <Link to={link}>
      <div className="vehicle-card vehicle-card__width">
        <p className="title is-4 vehicle-card__title">{vehicle.name}</p>
        <p className="subtitle is-6 vehicle-card__subtitle">Model: {vehicle.model}</p>
        <div className="vehicle-card__content">
          <p>Class: {vehicle.vehicle_class}</p>
          <p>Manufacturer: {vehicle.manufacturer}</p>
          <p>Cost: {vehicle.cost_in_credits}</p>
        </div>
      </div>
    </Link>
  );
}

VehicleCard.propTypes = {
  vehicle: PropTypes.shape({
    name: PropTypes.string,
    model: PropTypes.string,
    vehicle_class: PropTypes.string,
    manufacturer: PropTypes.string,
    cost_in_credits: PropTypes.string
  })
};

export default VehicleCard;
