import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error === "OAuthAccountNotLinked") {
    return (
      <div className="text-center p-6">
        <h1 className="text-xl font-semibold mb-2">Account Not Linked</h1>
        <p>Please sign in using the provider you originally used (Google or GitHub).</p>
      </div>
    );
  }

  return <p>Authentication error: {error}</p>;
}
