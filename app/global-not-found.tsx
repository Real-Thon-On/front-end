import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-lg text-gray-600">
            The page you are looking for does not exist. Please check the URL or return to the
            <Link
              href="/"
              className="text-blue-500 hover:underline"
            >
              {' '}
              home page
            </Link>
            .
          </p>
        </div>
      </body>
    </html>
  );
}
