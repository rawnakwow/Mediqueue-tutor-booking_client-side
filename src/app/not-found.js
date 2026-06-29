import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-extrabold tracking-tight text-primary">404</h1>
        <h2 className="text-3xl font-semibold text-foreground">
          Oops! Page Not Found
        </h2>
        <p className="text-default-500 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
