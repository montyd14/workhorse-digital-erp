/** Attribution footer for demo sites using Creative Commons photos. */
export function DemoCredits({ credits }: { credits: { what: string; by: string; license: string; href: string }[] }) {
  return (
    <footer className="border-t border-black/10 px-5 py-4 text-center text-[0.7rem] text-black/50">
      Demo site by Workhorse Digital. Photos:{" "}
      {credits.map((c, i) => (
        <span key={c.href}>
          <a href={c.href} className="underline" rel="noopener" target="_blank">
            {c.what}
          </a>{" "}
          by {c.by} ({c.license}){i < credits.length - 1 ? "; " : "."}
        </span>
      ))}
    </footer>
  );
}
