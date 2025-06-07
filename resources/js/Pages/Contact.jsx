import React from 'react';
import { route } from 'ziggy-js';
import { Ziggy } from '../ziggy'; // adjust path as needed

export default function Contact() {
  const fleetUrl = route('fleet', {}, false, Ziggy);

  return (
    <div>
      <h1>Contact Page</h1>
      <p>This is a dummy Contact page for testing Ziggy routes.</p>
      <p>
        Check out our <a href={fleetUrl}>Fleet</a>
      </p>
    </div>
  );
}
