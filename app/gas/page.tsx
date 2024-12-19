export default function Page() {
  return (
    <div className="space-y-9">
      <div className="prose prose-sm prose-invert max-w-none">
        <h1 className="text-xl font-bold">Client Component Hooks</h1>

        <ul>
          <li>
            Next.js provides a number of hooks for accessing routing information
            from client components.
          </li>
          <li>
            Try navigating each page and observing the output of each hook
            called from the current routes <code>layout.js</code> and{' '}
            <code>page.js</code> files.
          </li>
        </ul>
      </div>
    </div>
  );
}
