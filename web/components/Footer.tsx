import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-20"
      style={{
        background: "var(--surface)",
        boxShadow: "var(--shadow-inset)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <h3
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              OpenPharmaDB
            </h3>

            <p
              className="mt-3 max-w-sm text-sm leading-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Open pharmaceutical recall data from trusted regulatory
              authorities around the world.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4
                className="mb-3 font-semibold"
                style={{ color: "var(--text)" }}
              >
                Platform
              </h4>

              <div className="space-y-2">
                <Link
                  href="/recalls"
                  className="block transition"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Recalls
                </Link>

                <Link
                  href="/downloads"
                  className="block transition"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Downloads
                </Link>

                <Link
                  href="/api"
                  className="block transition"
                  style={{ color: "var(--text-secondary)" }}
                >
                  API
                </Link>
              </div>
            </div>

            <div>
              <h4
                className="mb-3 font-semibold"
                style={{ color: "var(--text)" }}
              >
                Project
              </h4>

              <div className="space-y-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition"
                  style={{ color: "var(--text-secondary)" }}
                >
                  GitHub
                </a>

                <Link
                  href="/"
                  className="block transition"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-3 pt-6 text-sm md:flex-row md:items-center md:justify-between"
          style={{
            borderTop: "1px solid color-mix(in srgb, var(--text) 10%, transparent)",
            color: "var(--text-secondary)",
          }}
        >
          <p>
            © {new Date().getFullYear()} OpenPharmaDB. All rights reserved.
          </p>

          <p>
            Built for fast, searchable pharmaceutical safety information.
          </p>
        </div>
      </div>
    </footer>
  );
}
