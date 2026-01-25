import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101828]">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-3">
          You don&apos;t have permission to access this page.
        </p>
        <p className="text-gray-600 mb-6">Please contact your adminstrator.</p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}