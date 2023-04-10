import Link from "next/link";

export default function Error() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Redirect to Home</Link>
    </>
  );
}
