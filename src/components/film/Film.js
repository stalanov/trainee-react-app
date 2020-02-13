import React from 'react';
import { useParams } from 'react-router-dom';

function Film(props) {
  let { id } = useParams();
  return <div>Film Works witch path {id}</div>;
}

export default Film;
