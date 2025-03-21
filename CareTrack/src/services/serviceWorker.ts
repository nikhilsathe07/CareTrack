// src/services/serviceWorker.ts
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => console.error('Service Worker Error:', err));
    });
  }