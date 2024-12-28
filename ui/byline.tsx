export default function Byline() {
  return (
    <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
      <div className="flex flex-col justify-between space-y-2 rounded-lg bg-black p-3.5 lg:px-5 lg:py-3">
        <div className="flex items-center gap-x-1.5">
          <div className="text-sm text-gray-400">
            {'By '}
            <a
              className="underline decoration-dotted underline-offset-4 transition-colors hover:text-gray-300"
              href="https://www.linkedin.com/in/t-vos/"
              target="_blank"
              rel="noreferrer"
            >
              Thomas Vos
            </a>
            {' | '}
            <a
              className="underline decoration-dotted underline-offset-4 transition-colors hover:text-gray-300"
              href="https://github.com/T-Vos/broedplaats-rekentool"
              target="_blank"
              rel="noreferrer"
            >
              View code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
