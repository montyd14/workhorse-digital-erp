import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-cream px-4 py-24 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">404</p>
        <h1 className="mt-2 text-4xl">That page pulled up lame.</h1>
        <p className="mt-4 text-ink-soft">The page you are looking for does not exist or has moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-md bg-brand px-5 py-3 font-bold text-white hover:bg-brand-dark">
          Back to home
        </Link>
      </div>
    </main>
  );
}
