import ConverterForm from '@/components/ConverterForm'; // Import the client component
import ThemeSwitch from '@/components/ThemeSwitch';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24 bg-gray-50 dark:text-gray-100">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-8">
        {/* Optional: Add header elements here if needed */}
        <ThemeSwitch />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 sm:mb-10">
          Query Parameter  JSON Converter
        </h1>
      </div>

      {/* Render the client component containing the form */}
      <ConverterForm />

      {/* Optional: Add footer elements here if needed */}
      <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
        Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
