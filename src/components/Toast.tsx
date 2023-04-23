'use client';

import { Toaster } from 'react-hot-toast';

export function Toast() {
  return (
    <Toaster
      position="top-right"
      containerClassName=""
      toastOptions={{
        style: {
          background: '#252D4A',
          color: '#E6E8F2',
        },
      }}
    />
  );
}
