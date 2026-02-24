import Link from "next/link";
export default function Nav() {
  return (
    <div>
      <Link href="/dashboard">dashboard</Link>
      <Link href="/saved">saved</Link>
      <Link href="/login">login</Link>
      <Link href="/signup">signup</Link>
    </div>
  );
}
