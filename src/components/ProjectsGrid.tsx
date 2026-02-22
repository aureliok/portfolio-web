import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image_url: string | null;
  github_url: string | null;
  tags: string[];
}

interface Props {
  apiUrl: string;
  noProjectsText: string;
  viewCodeText: string;
}

export default function ProjectsGrid({ apiUrl, noProjectsText, viewCodeText }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [apiUrl]);

  const allTags = [...new Set(projects.flatMap((p) => p.tags))];
  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;

  if (loading) {
    return (
      <div className="flex items-center gap-2 font-mono text-sm text-white/30">
        <span className="animate-pulse">▋</span> loading projects...
      </div>
    );
  }

  if (projects.length === 0) {
    return <p className="font-mono text-sm text-white/30">{noProjectsText}</p>;
  }

  return (
    <div>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-mono text-xs px-3 py-1 border transition-all duration-200 ${
              activeTag === null
                ? "border-[#00ff88] text-[#00ff88]"
                : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
            }`}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`font-mono text-xs px-3 py-1 border transition-all duration-200 ${
                activeTag === tag
                  ? "border-[#00ff88] text-[#00ff88]"
                  : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="border border-white/10 p-6 flex flex-col gap-4 hover:border-[#00ff88]/40 transition-all duration-300 group"
          >
            {project.cover_image_url && (
              <img
                src={project.cover_image_url}
                alt={project.title}
                className="w-full h-40 object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
            )}

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 border border-white/10 text-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="font-display text-xl font-bold group-hover:text-[#00ff88] transition-colors">
              {project.title}
            </h3>

            <p className="font-mono text-xs text-white/50 leading-relaxed flex-1">
              {project.description}
            </p>

            <div className="flex gap-4 mt-2">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  className="font-mono text-xs text-white/40 hover:text-[#00ff88] transition-colors"
                >
                  {viewCodeText} →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}