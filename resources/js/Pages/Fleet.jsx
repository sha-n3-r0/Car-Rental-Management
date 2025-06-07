import React from 'react';
import { route } from 'ziggy-js';         // <-- named import, NOT default import
import { Ziggy } from '../ziggy';         // adjust path as needed

export default function Fleet() {
  const homeUrl = route('home', {}, false, Ziggy);

  return (
    <div>
      <h1>Fleet Page</h1>
      <p>This is a dummy Fleet page for testing Ziggy routes.</p>
      <p>
        Go back to <a href={homeUrl}>Home</a>
      </p>
    </div>
  );
}
