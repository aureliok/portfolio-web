import { useState } from "react";

interface Props {
  lang: string;
  links: { label: string; href: string }[];
  resumeLabel: string;
  currentPath: string;
}

export default function MobileMenu({
  lang,
  links,
  resumeLabel,
  currentPath,
}: Props) {
  const [open, setOpen] = useState(false);

  const otherLang = lang === "en" ? "pt" : "en";
  const otherLangPath = `/${otherLang}${currentPath.substring(3)}`;

  return (
    <div className="md:hidden">
      {/* hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-px bg-white transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-px bg-white transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-px bg-white transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 top-[57px] bg-[#0a0a0a] z-40 flex flex-col px-8 py-12 gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-2xl text-white/60 hover:text-[#00ff88] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="font-mono text-2xl text-[#00ff88] hover:text-white transition-colors"
          >
            {resumeLabel}
          </a>
          <div className="flex gap-4 mt-4">
            <a
              href={`/${lang}${currentPath.substring(3)}`}
              className={`font-mono text-sm px-3 py-1 ${
                lang === "en"
                  ? "bg-[#00ff88] text-black"
                  : "text-white/40 border border-white/20"
              } transition-colors`}
            >
              EN
            </a>
            <a
              href={otherLangPath}
              className={`font-mono text-sm px-3 py-1 ${
                lang === "pt"
                  ? "bg-[#00ff88] text-black"
                  : "text-white/40 border border-white/20"
              } transition-colors`}
            >
              PT
            </a>
          </div>
        </div>
      )}
    </div>
  );
}