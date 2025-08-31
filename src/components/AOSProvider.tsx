"use client";

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    AOS: {
      init: (options: {
        duration: number;
        easing: string;
        once: boolean;
        offset: number;
      }) => void;
    };
  }
}

export default function AOSProvider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Wait for AOS to be available
    const initAOS = () => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({
          duration: 400,
          easing: 'ease-in-out',
          once: true,
          offset: 100
        });
      } else {
        // Retry after a short delay if AOS isn't loaded yet
        setTimeout(initAOS, 100);
      }
    };

    initAOS();
  }, []);

  // Don't render anything on server side
  if (!isClient) {
    return null;
  }

  return null;
}
