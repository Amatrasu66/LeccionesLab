'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="bg-[#111014] text-[#F4F0F7] p-8 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold mb-4">An unexpected error occurred</h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-[#F4F0F7] text-[#111014] rounded-[6px] text-sm font-medium hover:bg-white transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
