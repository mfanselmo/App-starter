import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>This is my web-app starter</h1>
      <Link href={"/test"}>Go to test model</Link>
    </>
  );
}
