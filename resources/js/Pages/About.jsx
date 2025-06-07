import React from 'react';
import { route } from 'ziggy-js';     // named import, NOT default
import { Ziggy } from '../ziggy';     // adjust path as needed

export default function About() {
  const contactUrl = route('contact', {}, false, Ziggy);

  return (
    <div>
      <h1>About Page</h1>
      <p>This is a dummy About page for testing Ziggy routes.</p>
      <p>
        Need to get in touch? Visit our <a href={contactUrl}>Contact</a> page.
      </p>
    </div>
  );
}
