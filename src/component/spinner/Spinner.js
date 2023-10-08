import React from 'react';
import spinnerGif from './Infinity-4.2s-200px.gif';

export default function Spinner() {
  return (
    <div>
      <img src={spinnerGif} alt="Loading Spinner" />
    </div>
  );
}