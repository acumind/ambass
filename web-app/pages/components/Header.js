import Link from "next/link";

export default function Header() {
  return (
    <nav className="p-5 border-b-2 flex flex-row">
      <h1 className="py-4 px-4 font-bold text-3xl"> Ambass</h1>

      <div className="ml-auto py-4 px-1 ">
        <Link href="/">Home</Link>
      </div>
      <div className="ml-auto py-4 px-1">
        <Link href="/components/new_campaign">New Campaign</Link>
      </div>
      <div className="ml-auto py-4 px-1">
        <Link href="/components/list_campaign">Campaigns</Link>
      </div>
    </nav>
  );
}
