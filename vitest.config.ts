import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // Optional: if you use path aliases like @/*

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // Optional: Add this if you use path aliases
  ],
  test: {
    globals: true, // Use Vitest global APIs (describe, it, expect)
    environment: 'jsdom', // Simulate browser environment for React components
    setupFiles: './vitest.setup.ts', // Optional: Setup file for global test configurations (e.g., extending expect)
    include: ['src/**/*.test.{ts,tsx}'], // Pattern for test files
    coverage: { // Optional: Configure code coverage
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/layout.tsx', // Exclude layout files if not testing them directly
        'src/**/page.tsx', // Exclude page entry files if testing components separately
        'vitest.config.ts',
        'vitest.setup.ts',
        '.next/**', // Exclude Next.js build artifacts
        'postcss.config.mjs',
        'tailwind.config.ts',
      ],
    },
  },
});
