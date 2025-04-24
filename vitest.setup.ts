// vitest.setup.ts
import '@testing-library/jest-dom'; // Extends Vitest's expect with jest-dom matchers (e.g., .toBeInTheDocument())

// You can add other global setup here if needed, like:
// - Mocking global objects (fetch, localStorage)
// - Setting up MSW (Mock Service Worker)
// - Configuring testing library defaults

// Example: Mocking localStorage
// const localStorageMock = (() => {
//   let store: { [key: string]: string } = {};
//   return {
//     getItem: (key: string) => store[key] || null,
//     setItem: (key: string, value: string) => { store[key] = value.toString(); },
//     removeItem: (key: string) => { delete store[key]; },
//     clear: () => { store = {}; },
//   };
// })();
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

console.log('Vitest setup file loaded.'); // Optional: confirm the file is loaded during tests
