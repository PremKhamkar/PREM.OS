import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

const Hero3D = lazy(() => import("./Hero3D.jsx"));


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    title: "Voyagent-AI",
    type: "AI TRAVEL PLANNER",
    description:
      "An AI-powered travel planner built with React, Node.js and LangGraph. Multiple AI agents handle destination selection, budget planning and itinerary generation, connected through REST APIs and an interactive interface.",
    tech: ["React", "Node.js", "Tailwind CSS", "Python", "LangGraph", "FastAPI", "LLM", "Maps", "Git", "GitHub"],
    highlights: ["Multi-agent planning", "Budget & itinerary agents", "Interactive trip experience"],
    featured: true,
    github: "https://github.com/PremKhamkar/Voyagent-AI",
  },
  {
    title: "Student Support Chatbot",
    type: "AI / RAG",
    description:
      "An AI-powered chatbot that answers student queries using retrieval-augmented generation, Gemini LLM and a vector database, with an interactive Streamlit interface and document retrieval.",
    tech: ["Python", "LangChain", "RAG", "Gemini LLM", "Vector Database", "Streamlit", "Git", "GitHub"],
    highlights: ["RAG pipeline", "Document retrieval", "Streamlit interface"],
    featured: false,
    github: "https://github.com/PremKhamkar/Student_support_chatbot",
  },
  {
    title: "Employee Analytics",
    type: "DATA SCIENCE",
    description:
      "An exploratory data analysis project examining employee demographics, performance, satisfaction, training and attrition patterns.",
    tech: ["Python", "Pandas", "Matplotlib", "EDA"],
    highlights: ["Data exploration", "Visual analysis", "Attrition insights"],
    featured: false,
    github: null,
  },
  {
    title: "Amazon Interface",
    type: "WEB DEVELOPMENT",
    description:
      "A responsive e-commerce interface built to strengthen frontend fundamentals, layout systems and interactive web development.",
    tech: ["HTML", "CSS", "JavaScript"],
    highlights: ["Responsive UI", "Frontend fundamentals", "Interactive components"],
    featured: false,
    github: null,
  },
];

/* =========================================================
   SKILLS
========================================================= */

const skills = [
  "React",
  "JavaScript",
  "Python",
  "Node.js",
  "LangChain",
  "LangGraph",
  "RAG",
  "LLMs",
  "MySQL",
  "Git",
  "GitHub",
  "Tailwind CSS",
];

/* =========================================================
   CONTACT CONFIG
========================================================= */

const contactConfig = {
  email: "premdipakkhamkar18@gmail.com",
  linkedin: "https://www.linkedin.com/in/premkhamkar",
};

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  label,
  title,
  description,
}) {
  return (
    <Reveal>
      <div className="mb-16">
        <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-white/30">
          {label}
        </p>

        <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
          {title}
        </h2>

        {description && (
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/40">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* =========================================================
   ARCHITECTURE ARROW
========================================================= */

function Arrow() {
  return (
    <div className="my-5 text-xl text-white/20">
      ↓
    </div>
  );
}

/* =========================================================
   ARCHITECTURE BOX
========================================================= */

function ArchitectureBox({
  title,
  text,
  highlight = false,
  meta,
}) {
  return (
    <div
      className={`group relative w-full max-w-md overflow-hidden rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-1 ${
        highlight
          ? "border-white/25 bg-white/[0.07] shadow-[0_0_45px_rgba(255,255,255,0.04)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/65">
            {title}
          </p>
          <p className="mt-2 text-xs leading-6 text-white/25">{text}</p>
        </div>

        {meta && (
          <span className="shrink-0 rounded-full border border-white/10 px-2 py-1 text-[7px] uppercase tracking-[0.16em] text-white/20">
            {meta}
          </span>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT COMMAND CENTER
========================================================= */

function ProjectVisual({ project, activeIndex }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    setPointer({ x, y });
  };

  const rotateX = pointer.y * -3.5;
  const rotateY = pointer.x * 5;

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
        mass: 0.5,
      }}
      whileHover={{ scale: 1.01 }}
      className="relative min-h-[280px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090a0c] p-6 transition-colors duration-500 hover:border-white/25 md:p-8"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.04] blur-3xl" />

      <motion.div
        className="relative flex items-start justify-between gap-4"
        animate={{
          x: pointer.x * 2,
          y: pointer.y * 1.5,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transform: "translateZ(30px)" }}
      >
        <div>
          <p className="text-[8px] uppercase tracking-[0.3em] text-white/20">
            PROJECT NODE / {String(activeIndex + 1).padStart(2, "0")}
          </p>
          <h4 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
            {project.title}
          </h4>
        </div>

        {project.featured && (
          <span className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[7px] uppercase tracking-[0.2em] text-white/50">
            Featured
          </span>
        )}
      </motion.div>

      <div
        className="relative mt-8 grid grid-cols-[1fr_auto] items-end gap-6"
        style={{ transform: "translateZ(20px)" }}
      >
        <div>
          <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
            System Type
          </p>
          <p className="mt-2 text-xs text-white/50">{project.type}</p>
        </div>

        <div className="text-right">
          <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
            Modules
          </p>
          <p className="mt-2 text-xl font-semibold">
            {String(project.tech.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div
        className="relative mt-8"
        style={{ transform: "translateZ(25px)" }}
      >
        <div className="flex items-center justify-between text-[7px] uppercase tracking-[0.2em] text-white/20">
          <span>Build Integration</span>
          <span>ACTIVE</span>
        </div>

        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{
              width: project.featured ? "92%" : "72%",
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full rounded-full bg-white/70"
          />
        </div>
      </div>

      <div
        className="absolute bottom-5 left-6 right-6 flex items-center justify-between border-t border-white/5 pt-4 text-[7px] uppercase tracking-[0.2em] text-white/15 md:left-8 md:right-8"
        style={{ transform: "translateZ(15px)" }}
      >
        <span>PREM.OS / NODE</span>
        <span>
          0x{(activeIndex + 1).toString(16).padStart(2, "0").toUpperCase()}
        </span>
      </div>
    </motion.div>
  );
}

function ProjectCommandCenter() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const activeIndex = projects.findIndex((project) => project.title === activeProject.title);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center justify-between px-5 py-4">
          <div><p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Available Systems</p><p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/10">Select a build node</p></div>
          <span className="text-[8px] text-white/15">{String(projects.length).padStart(2, "0")}</span>
        </div>
        <div className="space-y-1">
          {projects.map((project, index) => {
            const active = activeProject.title === project.title;
            return (
              <button key={project.title} onClick={() => setActiveProject(project)} className={`group relative w-full overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 ${active ? "border border-white/15 bg-white/[0.07]" : "border border-transparent hover:bg-white/[0.035]"}`}>
                <div className={`absolute left-0 top-1/2 h-10 w-px -translate-y-1/2 transition ${active ? "bg-white shadow-[0_0_12px_white]" : "bg-transparent"}`} />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4"><span className="text-[9px] tracking-[0.2em] text-white/20">{String(index + 1).padStart(2, "0")}</span><div><p className={`text-sm font-medium transition ${active ? "text-white" : "text-white/50 group-hover:text-white"}`}>{project.title}</p><p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/20">{project.type}</p></div></div>
                  <span className={`text-xs transition ${active ? "translate-x-0 text-white" : "-translate-x-2 text-white/0 group-hover:translate-x-0 group-hover:text-white/40"}`}>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="pointer-events-none absolute right-8 top-5 text-[100px] font-semibold leading-none text-white/[0.025]">{String(activeIndex + 1).padStart(2, "0")}</div>
        <div className="relative flex items-center justify-between"><span className="rounded-full border border-white/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white/30">{activeProject.type}</span><span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-white/20"><span className="h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_0_10px_white]" />System Active</span></div>

        <motion.div key={activeProject.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="relative mt-10"><p className="text-[9px] uppercase tracking-[0.35em] text-white/20">Selected Project</p><h3 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{activeProject.title}</h3></motion.div>
        <motion.p key={`${activeProject.title}-description`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.05 }} className="relative mt-7 max-w-2xl text-sm leading-7 text-white/40">{activeProject.description}</motion.p>

        <div className="relative mt-8 grid gap-4 md:grid-cols-[1fr_0.9fr]">
          <ProjectVisual project={activeProject} activeIndex={activeIndex} />
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.015] p-6">
            <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
              Technology Stack
            </p>

            <div className="mt-5 space-y-2">
              {activeProject.tech.map((technology, index) => (
                <motion.div
                  key={technology}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <span className="text-[9px] uppercase tracking-[0.12em] text-white/45">
                    {technology}
                  </span>
                  <span className="text-[8px] text-white/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                Build Highlights
              </p>

              <div className="mt-4 space-y-2">
                {(activeProject.highlights || []).map((highlight, index) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-xl border border-white/5 px-4 py-3"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/50" />
                    <span className="text-[9px] text-white/35">
                      {highlight}
                    </span>
                    <span className="ml-auto text-[8px] text-white/10">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-3">
          {activeProject.github && <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:bg-white/90">Open GitHub →</a>}
          {activeProject.title === "Voyagent-AI" && <a href="#architecture" className="rounded-full border border-white/15 px-6 py-3 text-[9px] uppercase tracking-[0.2em] text-white/60 transition hover:border-white/40 hover:text-white">View Architecture →</a>}
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-white/5 pt-4"><span className="text-[8px] uppercase tracking-[0.25em] text-white/15">PREM.OS / BUILD SYSTEM</span><span className="text-[8px] uppercase tracking-[0.25em] text-white/15">{activeProject.tech.length} Technologies</span></div>
      </div>
    </div>
  );
}

/* =========================================================
   TECHNOLOGY MATRIX
========================================================= */

const techAliases = {
  llms: "llm",
  geminillm: "llm",
  nodejs: "node",
  reactjs: "react",
  tailwind: "tailwindcss",
  vectordatabases: "vectordatabase",
};

function techKey(name) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return techAliases[key] || key;
}

function TechnologyMatrix() {
  const [activeTech, setActiveTech] =
    useState("React");

  const relatedProjects = projects.filter(
    (project) =>
      project.tech.some(
        (tech) => techKey(tech) === techKey(activeTech)
      )
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      {/* TECHNOLOGIES */}

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
        <div className="mb-6">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            Select Technology
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill) => {
            const active = activeTech === skill;

            return (
              <button
                key={skill}
                onClick={() =>
                  setActiveTech(skill)
                }
                className={`rounded-xl border px-4 py-4 text-left text-[10px] uppercase tracking-[0.12em] transition ${active
                  ? "border-white/30 bg-white text-black"
                  : "border-white/10 bg-white/[0.02] text-white/40 hover:border-white/25 hover:text-white"
                  }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULTS */}

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10">
        <div className="pointer-events-none absolute right-6 top-2 text-[110px] font-semibold text-white/[0.025]">
          {relatedProjects.length}
        </div>

        <div className="relative">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            Technology Selected
          </p>

          <h3 className="mt-4 text-4xl font-semibold tracking-tight">
            {activeTech}
          </h3>

          <p className="mt-3 text-sm text-white/30">
            {relatedProjects.length === 0
              ? "No portfolio project lists this technology yet."
              : `${relatedProjects.length} project${relatedProjects.length > 1
                ? "s"
                : ""
              } using ${activeTech}.`}
          </p>
        </div>

        <div className="relative mt-10 space-y-3">
          {relatedProjects.length > 0 ? (
            relatedProjects.map(
              (project, index) => (
                <div
                  key={project.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/25 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <span className="text-[8px] tracking-[0.2em] text-white/20">
                        PROJECT{" "}
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <h4 className="mt-2 text-lg font-medium">
                        {project.title}
                      </h4>

                      <p className="mt-2 text-xs leading-6 text-white/30">
                        {project.description}
                      </p>
                    </div>

                    <span className="text-white/20 transition group-hover:text-white">
                      →
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map(
                      (tech) => (
                        <span
                          key={tech}
                          className={`rounded-full border px-2.5 py-1 text-[8px] ${techKey(tech) === techKey(activeTech)
                            ? "border-white/30 text-white"
                            : "border-white/10 text-white/25"
                            }`}
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
              <p className="text-sm text-white/30">
                No project in the build log uses {activeTech} yet
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/15">
                Not listed in current projects
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GITHUB PANEL
========================================================= */

function GitHubPanel() {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    let mounted = true;

    async function loadGitHub() {
      try {
        const requestOptions = { signal: controller.signal };

        const [profileResponse, reposResponse, eventsResponse] =
          await Promise.all([
            fetch("https://api.github.com/users/PremKhamkar", requestOptions),
            fetch(
              "https://api.github.com/users/PremKhamkar/repos?sort=updated&per_page=12",
              requestOptions,
            ),
            fetch(
              "https://api.github.com/users/PremKhamkar/events/public?per_page=30",
              requestOptions,
            ),
          ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error("GitHub request failed");
        }

        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();
        const eventsData = eventsResponse.ok
          ? await eventsResponse.json()
          : [];

        if (!mounted) return;

        setProfile(profileData);
        setRepositories(Array.isArray(reposData) ? reposData : []);
        setActivity(Array.isArray(eventsData) ? eventsData : []);
      } catch (err) {
        if (!mounted || err?.name === "AbortError") return;
        setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadGitHub();

    return () => {
      mounted = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const languageStats = repositories.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const languageEntries = Object.entries(languageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalLanguageRepos = languageEntries.reduce(
    (sum, [, count]) => sum + count,
    0
  );

  const totalStars = repositories.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0
  );

  const totalForks = repositories.reduce(
    (sum, repo) => sum + (repo.forks_count || 0),
    0
  );

  const eventLabel = (event) => {
    const type = event?.type || "";
    const labels = {
      PushEvent: "Pushed code",
      CreateEvent: "Created repository",
      PullRequestEvent: "Pull request",
      IssuesEvent: "Issue activity",
      WatchEvent: "Starred repository",
      ForkEvent: "Forked repository",
      IssueCommentEvent: "Commented",
      DeleteEvent: "Deleted ref",
    };

    return labels[type] || "GitHub activity";
  };

  const formatDate = (date) => {
    if (!date) return "recent";
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.max(1, Math.floor(diff / 3600000));

    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    return `${Math.floor(days / 30)}mo ago`;
  };

  const compactNumber = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return String(value);
  };

  return (
    <div className="space-y-5">
      {/* SYSTEM HEADER */}

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-white/25">
                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                Live Repository Interface
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[7px] uppercase tracking-[0.2em] text-white/20">
                GitHub API
              </span>
            </div>

            <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Code in the wild.
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/30">
              A live snapshot of public repositories, development activity and
              the technologies currently represented across the GitHub profile.
            </p>
          </div>

          <a
            href="https://github.com/PremKhamkar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit shrink-0 rounded-full border border-white/15 px-5 py-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:border-white/40 hover:bg-white hover:text-black"
          >
            Visit profile ↗
          </a>
        </div>

        <div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
          {[
            ["Repositories", profile?.public_repos ?? "—"],
            ["Followers", profile?.followers ?? "—"],
            ["Stars", loading ? "—" : compactNumber(totalStars)],
            ["Forks", loading ? "—" : compactNumber(totalForks)],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`p-5 md:p-6 ${
                index > 0 ? "border-l border-white/10" : ""
              } ${index === 2 ? "border-t border-white/10 sm:border-t-0" : ""} ${
                index === 3 ? "border-t border-white/10 sm:border-t-0" : ""
              }`}
            >
              <p className="text-xl font-semibold tracking-tight text-white/80">
                {value}
              </p>
              <p className="mt-1 text-[7px] uppercase tracking-[0.2em] text-white/20">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        {/* PROFILE */}

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-8">
          <div className="pointer-events-none absolute -right-6 -top-8 text-[130px] font-semibold leading-none text-white/[0.025]">
            GH
          </div>

          {loading ? (
            <div className="relative flex min-h-[390px] items-center justify-center">
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Syncing public profile...
              </div>
            </div>
          ) : error ? (
            <div className="relative flex min-h-[390px] flex-col items-center justify-center text-center">
              <p className="text-sm text-white/40">
                GitHub data unavailable.
              </p>

              <a
                href="https://github.com/PremKhamkar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 rounded-full border border-white/15 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-white/50 transition hover:border-white/40 hover:text-white"
              >
                Open GitHub →
              </a>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white/30">
                  Developer Profile
                </span>

                <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                  @{profile.login}
                </span>
              </div>

              <div className="mt-9 flex items-center gap-5">
                <img
                  src={profile.avatar_url}
                  alt={profile.login}
                  className="h-16 w-16 rounded-2xl border border-white/10 grayscale"
                />

                <div>
                  <p className="text-2xl font-semibold">
                    {profile.name || profile.login}
                  </p>
                  <p className="mt-1 text-xs text-white/25">
                    Public GitHub profile
                  </p>
                </div>
              </div>

              <p className="mt-7 text-sm leading-7 text-white/35">
                {profile.bio ||
                  "Building AI-powered applications, full-stack systems and practical software projects."}
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/10 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                    Profile Signal
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                    Public
                  </span>
                </div>

                <div className="mt-4 h-px bg-white/10" />

                <div className="mt-4 grid grid-cols-2 gap-4 text-[8px] uppercase tracking-[0.15em] text-white/20">
                  <span>Repos · {profile.public_repos}</span>
                  <span>Followers · {profile.followers}</span>
                  <span>Following · {profile.following}</span>
                  <span>Languages · {languageEntries.length || "—"}</span>
                </div>
              </div>

              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition hover:scale-105"
              >
                Open GitHub →
              </a>
            </div>
          )}
        </div>

        {/* REPOSITORIES */}

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Build Log
              </p>

              <h3 className="mt-2 text-2xl font-semibold">
                Latest repositories
              </h3>
            </div>

            <span className="text-[8px] uppercase tracking-[0.2em] text-white/15">
              Sorted by update
            </span>
          </div>

          <div className="mt-7 space-y-2">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]"
                />
              ))
            ) : repositories.length > 0 ? (
              repositories.slice(0, 6).map((repo, index) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-white/10 bg-white/[0.015] p-5 transition hover:border-white/25 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 shrink-0 font-mono text-[9px] text-white/15">
                      0{index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-medium text-white/75 transition group-hover:text-white">
                            {repo.name}
                          </h4>

                          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-white/25">
                            {repo.description || "No repository description."}
                          </p>
                        </div>

                        <span className="shrink-0 text-white/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
                          ↗
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-[8px] uppercase tracking-[0.15em] text-white/20">
                        {repo.language && (
                          <span className="text-white/40">
                            {repo.language}
                          </span>
                        )}
                        <span>★ {repo.stargazers_count}</span>
                        <span>Forks {repo.forks_count}</span>
                        <span>{formatDate(repo.updated_at)}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <p className="py-10 text-center text-xs text-white/25">
                No public repositories found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ACTIVITY + LANGUAGE MATRIX */}

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Public Activity
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                Developer pulse
              </h3>
            </div>

            <span className="text-[8px] uppercase tracking-[0.2em] text-white/15">
              Recent events
            </span>
          </div>

          {activity.length > 0 ? (
            <div className="mt-7 grid grid-cols-6 gap-2 sm:grid-cols-10">
              {activity.slice(0, 30).map((event, index) => {
                const intensity =
                  event.type === "PushEvent"
                    ? "bg-white/80"
                    : event.type === "PullRequestEvent"
                    ? "bg-white/55"
                    : event.type === "CreateEvent"
                    ? "bg-white/40"
                    : "bg-white/20";

                return (
                  <motion.a
                    key={`${event.id}-${index}`}
                    href={`https://github.com/${event.repo?.name || "PremKhamkar"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.75 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.015,
                    }}
                    title={`${eventLabel(event)} • ${formatDate(
                      event.created_at
                    )}`}
                    className={`group relative aspect-square rounded-md border border-white/5 ${intensity} transition hover:scale-110 hover:border-white/50`}
                  >
                    <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0b0c0f] px-2 py-1 text-[7px] uppercase tracking-[0.12em] text-white/60 group-hover:block">
                      {eventLabel(event)}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-white/25">
              No recent public events were returned by GitHub.
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[8px] uppercase tracking-[0.15em] text-white/20">
            <span className="flex items-center gap-2">
              <i className="h-2 w-2 rounded-sm bg-white/20" />
              Other
            </span>
            <span className="flex items-center gap-2">
              <i className="h-2 w-2 rounded-sm bg-white/40" />
              Created
            </span>
            <span className="flex items-center gap-2">
              <i className="h-2 w-2 rounded-sm bg-white/55" />
              Pull request
            </span>
            <span className="flex items-center gap-2">
              <i className="h-2 w-2 rounded-sm bg-white/80" />
              Code push
            </span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            Repository Stack
          </p>

          <h3 className="mt-2 text-2xl font-semibold">
            Language matrix
          </h3>

          {languageEntries.length > 0 ? (
            <div className="mt-8 space-y-5">
              {languageEntries.map(([language, count], index) => {
                const percentage = Math.round(
                  (count / totalLanguageRepos) * 100
                );

                return (
                  <div key={language}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-white/60">
                        {language}
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.15em] text-white/20">
                        {count} repo{count > 1 ? "s" : ""} · {percentage}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.08,
                        }}
                        className="h-full rounded-full bg-white"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-8 text-xs leading-6 text-white/25">
              Language data will appear when public repositories are available.
            </p>
          )}

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                System Readout
              </p>
              <span className="text-[7px] uppercase tracking-[0.2em] text-white/15">
                Live
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Repository metadata is pulled directly from GitHub at page load.
              No static project metrics are displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCommandCenter() {
  const [channel, setChannel] = useState("EMAIL");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const email = contactConfig.email;

  const channels = [
    {
      id: "EMAIL",
      label: "EMAIL",
      value: email,
      href: `mailto:${email}`,
    },
    {
      id: "GITHUB",
      label: "GITHUB",
      value: "github.com/PremKhamkar",
      href: "https://github.com/PremKhamkar",
    },
    {
      id: "LINKEDIN",
      label: "LINKEDIN",
      value: contactConfig.linkedin ? "linkedin.com/in/premkhamkar" : "Not configured",
      href: contactConfig.linkedin,
    },
  ];

  const activeChannel =
    channels.find((item) => item.id === channel) || channels[0];

  const sendMessage = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio Contact${name ? ` — ${name}` : ""}`
    );

    const body = encodeURIComponent(
      message ||
        "Hello Prem,\n\nI found your portfolio and would like to connect."
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">
              Communication Node
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              Contact
              <span className="text-white/25">.exe</span>
            </h3>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
            <span className="text-[8px] uppercase tracking-[0.2em] text-white/45">
              Online
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {channels.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setChannel(item.id)}
              whileHover={{ x: 4 }}
              className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                channel === item.id
                  ? "border-white/25 bg-white/[0.06]"
                  : "border-white/5 bg-white/[0.015] hover:border-white/15"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-white/20">
                  0{index + 1}
                </span>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    {item.value}
                  </p>
                </div>
              </div>

              <span className="text-white/20 transition group-hover:text-white/70">
                →
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-5 font-mono">
          <p className="text-[9px] text-white/20">
            prem@os:~$ connect --channel {activeChannel.id.toLowerCase()}
          </p>
          <p className="mt-3 text-xs leading-6 text-white/55">
            {channel === "EMAIL" &&
              "Direct communication channel selected. Compose a message on the right."}
            {channel === "GITHUB" &&
              "Open-source channel selected. Explore repositories, experiments and project source."}
            {channel === "LINKEDIN" &&
              "Professional network channel selected. Connect on LinkedIn."}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {channel === "EMAIL" && (
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full border border-white/10 px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-white/45 transition hover:border-white/25 hover:text-white"
            >
              {copied ? "Copied" : "Copy Email"}
            </button>
          )}

          {activeChannel.href ? (
            <a
              href={activeChannel.href}
              target={activeChannel.href.startsWith("http") ? "_blank" : undefined}
              rel={activeChannel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-full bg-white px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white/90"
            >
              Open Channel
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25"
              title="LinkedIn URL is not configured in contactConfig."
            >
              Channel Not Configured
            </button>
          )}
        </div>
      </div>

      <form
        onSubmit={sendMessage}
        className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-white/25">
              Message Protocol
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              Start a
              <span className="text-white/25"> conversation.</span>
            </h3>
          </div>

          <span className="font-mono text-[9px] text-white/20">
            TX_READY
          </span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/25">
              Your Name
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/15 transition focus:border-white/30"
            />
          </label>

          <div>
            <span className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/25">
              Target
            </span>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs text-white/50">
              {email}
            </div>
          </div>
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/25">
            Message
          </span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={7}
            placeholder="Tell me about your idea, project or opportunity..."
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/15 transition focus:border-white/30"
          />
        </label>

        <div className="mt-5 flex flex-col gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] leading-5 text-white/20">
            mailto://{email}
            <br />
            protocol: secure-direct
          </p>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
          >
            Initialize Contact
            <span>→</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  const initial = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initial,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */


/* =========================================================
   GLOBAL SYSTEM POLISH
========================================================= */

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY || 0;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(documentHeight > 0 ? Math.min(scrollTop / documentHeight, 1) : 0);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-px bg-white shadow-[0_0_12px_rgba(255,255,255,.8)]"
      style={{ width: `${progress * 100}%` }}
    />
  );
}

function BootSequence() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const started = performance.now();
    const duration = 1100;
    let frame;

    const tick = (now) => {
      const value = Math.min((now - started) / duration, 1);
      setProgress(value);

      if (value < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), 180);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 1 ? 0 : 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#07080a]"
      aria-hidden="true"
    >
      <div className="w-[min(420px,calc(100vw-48px))]">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.45em] text-white/25">
              Prem Operating System
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-[0.18em]">
              PREM<span className="text-white/20">.OS</span>
            </p>
          </div>

          <span className="font-mono text-[10px] text-white/35">
            {Math.round(progress * 100).toString().padStart(3, "0")}%
          </span>
        </div>

        <div className="h-px overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.22em] text-white/20">
          <span>
            {progress < 0.35
              ? "Initializing interface"
              : progress < 0.7
                ? "Loading experience modules"
                : "System ready"}
          </span>
          <span>v1.0.26</span>
        </div>
      </div>
    </motion.div>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => setEnabled(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);


  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("prem-custom-cursor");
    } else {
      document.documentElement.classList.remove("prem-custom-cursor");
    }

    return () => {
      document.documentElement.classList.remove("prem-custom-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ring.style.transform =
        `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      raf = window.requestAnimationFrame(animate);
    };

    const interactive = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']"
    );

    const enter = () => ring.classList.add("prem-cursor-hover");
    const leave = () => ring.classList.remove("prem-cursor-hover");

    window.addEventListener("mousemove", move, { passive: true });

    interactive.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });

    raf = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);

      interactive.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });

      window.cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled || typeof document === "undefined") return null;

  return createPortal(
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html.prem-custom-cursor,
          html.prem-custom-cursor body,
          html.prem-custom-cursor body * {
            cursor: none !important;
          }

          .prem-cursor-dot,
          .prem-cursor-ring {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            pointer-events: none !important;
            transform-origin: center !important;
            will-change: transform !important;
          }

          .prem-cursor-dot {
            width: 7px !important;
            height: 7px !important;
            border-radius: 50% !important;
            background: #ffffff !important;
            box-shadow: 0 0 10px rgba(255,255,255,.45) !important;
            z-index: 2147483647 !important;
          }

          .prem-cursor-ring {
            width: 30px !important;
            height: 30px !important;
            border: 1px solid rgba(255,255,255,.55) !important;
            border-radius: 50% !important;
            background: transparent !important;
            z-index: 2147483646 !important;
            transition:
              width .18s ease,
              height .18s ease,
              background .18s ease,
              border-color .18s ease !important;
          }

          .prem-cursor-ring.prem-cursor-hover {
            width: 46px !important;
            height: 46px !important;
            background: rgba(255,255,255,.10) !important;
            border-color: rgba(255,255,255,.85) !important;
          }
        }
      `}</style>

      <div ref={dotRef} className="prem-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="prem-cursor-ring" aria-hidden="true" />
    </>,
    document.body
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    ["about", "About"],
    ["skills", "Stack"],
    ["technology-map", "Tech Map"],
    ["projects", "Build"],
    ["github", "GitHub"],
    ["architecture", "Architecture"],
    ["contact", "Contact"],
  ];

  useEffect(() => {
    document.title = "PREM.OS — Prem Khamkar";
    const description =
      "Prem Khamkar — MCA student and developer building AI, full-stack and Python projects, with a focus on manual testing and bug finding.";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const ids = ["home", ...navItems.map(([id]) => id)];

    const observers = ids
      .map((id) => {
        const element = document.getElementById(id);
        if (!element) return null;

        const observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible) setActiveSection(visible.target.id);
          },
          {
            rootMargin: "-28% 0px -58% 0px",
            threshold: [0.05, 0.15, 0.3, 0.5],
          },
        );

        observer.observe(element);
        return observer;
      })
      .filter(Boolean);

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
      <div className="min-h-screen overflow-hidden bg-[#07080a] text-white">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <BootSequence />
      <ScrollProgress />
      <CustomCursor />

      {/* NAVBAR */}

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-[#07080a]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#home"
            className="text-sm font-semibold tracking-[0.3em]"
          >
            PREM
            <span className="text-white/30">
              .OS
            </span>
          </a>

          <div className="hidden gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40 md:flex">
            {navItems.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileOpen(false)}
                aria-current={activeSection === id ? "page" : undefined}
                className={`relative transition ${
                  activeSection === id ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-white/70" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[8px] uppercase tracking-[0.2em] text-white/20 sm:block">
              Online
            </span>

            <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_15px_white]" />
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span
              className={`absolute h-px w-4 bg-white transition-transform ${
                mobileOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-white transition-transform ${
                mobileOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/5 md:hidden"
            >
              <div className="px-6 py-4">
                {navItems.map(([id, label], index) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    aria-current={activeSection === id ? "page" : undefined}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.035 }}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between border-b border-white/5 py-4 text-[10px] uppercase tracking-[0.25em] last:border-b-0 ${
                      activeSection === id ? "text-white" : "text-white/45 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {activeSection === id && <span className="h-1 w-1 rounded-full bg-white" />}
                      {label}
                    </span>
                    <span className="text-white/15">↗</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="main-content">

      {/* HERO */}

      <section
        id="home"
        className="relative flex min-h-screen items-center px-6 pt-20 md:px-10"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="pointer-events-none absolute left-[55%] top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.015] blur-[120px]" />

        <div className="pointer-events-none absolute bottom-10 left-6 hidden font-mono text-[8px] uppercase tracking-[0.2em] text-white/15 md:block">
          <span>SYS / 001</span>
          <span className="ml-4">PORTFOLIO CORE</span>
        </div>

        <div className="pointer-events-none absolute right-6 top-28 hidden font-mono text-[8px] uppercase tracking-[0.2em] text-white/15 md:block">
          NODE / 18&nbsp;&nbsp;ACTIVE
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-4 md:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-white/20" />

              <p className="text-[10px] uppercase tracking-[0.5em] text-white/30">
                AI SYSTEMS / FULL-STACK / TESTING
              </p>
            </div>

            <h1 className="text-6xl font-semibold leading-[0.88] tracking-[-0.05em] sm:text-7xl md:text-8xl">
              Prem
              <br />

              <span className="text-white/20">
                Khamkar
              </span>
            </h1>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60 md:text-base">
                MCA Student &amp; Developer
                <br />
                <span className="text-white/35">AI • Full-Stack • Manual Testing</span>
              </p>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/40 md:text-base md:leading-8">
              I build AI-powered and full-stack projects, and I test
              software by hand to find bugs, learning through
              practical, hands-on work.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "Python", "LangGraph", "RAG", "Node.js"].map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-white/30 transition hover:border-white/25 hover:text-white/60"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition duration-300 hover:scale-105 hover:bg-white/90"
              >
                Explore Projects
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/15 px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/60 transition duration-300 hover:border-white/40 hover:text-white"
              >
                Contact
              </a>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <a
                href="https://github.com/PremKhamkar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-wider text-white/30 transition hover:text-white"
              >
                GH
              </a>

              {contactConfig.linkedin ? (
                <a
                  href={contactConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold tracking-wider text-white/30 transition hover:text-white"
                  aria-label="Open LinkedIn profile"
                >
                  IN
                </a>
              ) : (
                <a
                  href="#contact"
                  className="text-xs font-semibold tracking-wider text-white/30 transition hover:text-white"
                  aria-label="Open contact section"
                >
                  IN
                </a>
              )}

              <a
                href={`mailto:${contactConfig.email}`}
                className="text-xs font-semibold tracking-wider text-white/30 transition hover:text-white"
              >
                MAIL
              </a>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="flex h-[420px] w-full items-center justify-center sm:h-[480px] lg:h-[520px]">
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/25">
                  PREM.OS // 3D module loading...
                </div>
              </div>
            }
          >
            <Hero3D />
          </Suspense>
        </div>

        <a
          href="#about"
          aria-label="Scroll to About"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/20 transition hover:text-white/60 md:block"
        >
          ↓
        </a>
      </section>

      {/* ABOUT */}

      <section
        id="about"
        className="border-t border-white/5 px-6 py-32 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="01 / Identity"
            title={
              <>
                More than
                <span className="text-white/25">
                  {" "}
                  code.
                </span>
              </>
            }
            description="An MCA student and developer working across AI, full-stack development, data analysis and manual software testing, turning ideas into practical software projects."
          />

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal delay={0.05}>
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10">
                <div className="pointer-events-none absolute -right-8 -top-16 text-[170px] font-semibold leading-none text-white/[0.025]">
                  PK
                </div>

                <div className="relative">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-white/20">
                    Developer Profile
                  </p>

                  <h3 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
                    Building useful systems,
                    <span className="text-white/25"> not just demos.</span>
                  </h3>

                  <p className="mt-6 max-w-2xl text-sm leading-7 text-white/40">
                    I enjoy taking a problem from idea to implementation:
                    designing the interface, connecting the backend, working
                    with data, integrating AI where it adds real value and
                    manually testing software to find bugs. Currently in the
                    second year of MCA at G H Raisoni College of Engineering
                    and Management, Pune (expected graduation April 2027).
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                        Education
                      </p>
                      <p className="mt-3 text-2xl font-semibold">MCA</p>
                      <p className="mt-1 text-[10px] text-white/25">
                        G H Raisoni · Pune
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                        Focus
                      </p>
                      <p className="mt-3 text-2xl font-semibold">AI</p>
                      <p className="mt-1 text-[10px] text-white/25">
                        Intelligent applications
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                        Approach
                      </p>
                      <p className="mt-3 text-2xl font-semibold">BUILD</p>
                      <p className="mt-1 text-[10px] text-white/25">
                        Learn through projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/20">
                  Current Direction
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    ["01", "AI Development", "LLMs, RAG & agent workflows"],
                    ["02", "Full-Stack", "React, Node.js & APIs"],
                    ["03", "Data", "Python, analysis & visualization"],
                    ["04", "Manual Testing", "Bug finding & manual verification"],
                  ].map(([number, title, description]) => (
                    <div
                      key={number}
                      className="group rounded-2xl border border-white/5 bg-white/[0.015] p-5 transition hover:border-white/20 hover:bg-white/[0.035]"
                    >
                      <div className="flex items-start gap-4">
                        <span className="pt-0.5 text-[8px] tracking-[0.2em] text-white/15">
                          {number}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-white/65 transition group-hover:text-white">
                            {title}
                          </p>
                          <p className="mt-1 text-[10px] leading-5 text-white/25">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/5 pt-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15">
                    prem@os:~$ status
                  </p>
                  <p className="mt-2 text-xs text-white/35">
                    Learning → Building → Shipping
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}

      <section
        id="skills"
        className="border-t border-white/5 px-6 py-32 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="02 / Technology"
            title={
              <>
                My
                <span className="text-white/25">
                  {" "}
                  stack.
                </span>
              </>
            }
            description="Technologies I use to design, build and experiment with software."
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {skills.map((skill, index) => (
              <Reveal
                key={skill}
                delay={index * 0.04}
              >
                <div
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.05]"
                >
                  <span className="text-[9px] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-5 text-sm font-medium text-white/70 transition group-hover:text-white">
                    {skill}
                  </p>

                  <div className="mt-5 h-px w-0 bg-white/30 transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY MATRIX */}

      <section
        id="technology-map"
        className="border-t border-white/5 px-6 py-32 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="02.5 / Technology Map"
            title={
              <>
                Skills that
                <span className="text-white/25">
                  {" "}
                  ship.
                </span>
              </>
            }
            description="Select a technology to see where I have applied it."
          />

          <Reveal direction="up">
            <TechnologyMatrix />
          </Reveal>
        </div>
      </section>

      {/* PROJECT COMMAND CENTER */}

      <section
        id="projects"
        className="border-t border-white/5 px-6 py-32 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="03 / Build Space"
            title={
              <>
                Project
                <span className="text-white/25">
                  {" "}
                  Command Center.
                </span>
              </>
            }
            description="Explore the systems I have built, the technologies behind them and the problems they solve."
          />

          <Reveal direction="up">
            <ProjectCommandCenter />
          </Reveal>
        </div>
      </section>

      {/* GITHUB */}

      <section
        id="github"
        className="border-t border-white/5 px-6 py-32 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="03.5 / Open Source"
            title={
              <>
                Build
                <span className="text-white/25">
                  {" "}
                  in public.
                </span>
              </>
            }
            description="Explore my code, experiments and projects on GitHub."
          />

          <Reveal direction="up">
            <GitHubPanel />
          </Reveal>
        </div>
      </section>

      {/* ARCHITECTURE */}

      <section
        id="architecture"
        className="border-t border-white/5 px-6 py-32 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="04 / System Architecture"
            title={
              <>
                How it
                <span className="text-white/25">
                  {" "}
                  works.
                </span>
              </>
            }
            description="A simplified view of how Voyagent-AI moves from user intent to an orchestrated, data-enriched travel plan."
          />

          <Reveal direction="up">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
              <div className="flex flex-col gap-5 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-8">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                    Runtime Flow
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    From intent to itinerary.
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-[8px] uppercase tracking-[0.2em] text-white/20">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                    Active pipeline
                  </span>
                  <span className="hidden h-px w-8 bg-white/10 sm:block" />
                  <span>Voyagent-AI</span>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/10 p-6">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                        pipeline.status
                      </p>

                      <div className="mt-6 space-y-4">
                        {[
                          ["01", "Collect", "User requirements"],
                          ["02", "Orchestrate", "LangGraph workflow"],
                          ["03", "Enrich", "External travel data"],
                          ["04", "Compose", "Final travel plan"],
                        ].map(([number, title, description]) => (
                          <div
                            key={number}
                            className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                          >
                            <span className="font-mono text-[9px] text-white/15">
                              {number}
                            </span>
                            <div>
                              <p className="text-xs font-medium text-white/60">
                                {title}
                              </p>
                              <p className="mt-1 text-[10px] text-white/20">
                                {description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono text-[8px] leading-5 text-white/25">
                        request → agents → data → synthesis → response
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute bottom-8 left-4 top-8 w-px bg-gradient-to-b from-white/5 via-white/20 to-white/5 md:left-5" />

                    <div className="relative space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-[#0b0c0f] font-mono text-[9px] text-white/50">
                          01
                        </span>
                        <ArchitectureBox
                          title="USER"
                          text="Travel requirements and preferences enter the application."
                          meta="INPUT"
                        />
                      </div>

                      <div className="ml-5 h-5 w-px bg-white/10" />

                      <div className="flex items-center gap-4">
                        <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-[#0b0c0f] font-mono text-[9px] text-white/50">
                          02
                        </span>
                        <ArchitectureBox
                          title="REACT"
                          text="Frontend interface captures input and presents the generated experience."
                          meta="UI"
                        />
                      </div>

                      <div className="ml-5 h-5 w-px bg-white/10" />

                      <div className="flex items-center gap-4">
                        <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-[#0b0c0f] font-mono text-[9px] text-white/50">
                          03
                        </span>
                        <ArchitectureBox
                          title="NODE.JS"
                          text="Backend API layer connects the interface to the AI workflow."
                          meta="API"
                        />
                      </div>

                      <div className="ml-5 h-5 w-px bg-white/10" />

                      <div className="flex items-center gap-4">
                        <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-white font-mono text-[9px] font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                          04
                        </span>
                        <ArchitectureBox
                          title="LANGGRAPH"
                          text="AI orchestration coordinates the planning workflow and agent logic."
                          meta="AI CORE"
                          highlight
                        />
                      </div>

                      <div className="ml-5 h-5 w-px bg-white/10" />

                      <div className="grid gap-3 pl-0 md:grid-cols-3 md:pl-14">
                        <ArchitectureBox
                          title="WEATHER"
                          text="Weather information"
                          meta="DATA"
                        />
                        <ArchitectureBox
                          title="ATTRACTIONS"
                          text="Places and activities"
                          meta="DATA"
                        />
                        <ArchitectureBox
                          title="TRAVEL"
                          text="Trip planning"
                          meta="DATA"
                        />
                      </div>

                      <div className="ml-5 h-5 w-px bg-white/10" />

                      <div className="flex items-center gap-4">
                        <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/40 bg-white font-mono text-[9px] font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                          05
                        </span>
                        <ArchitectureBox
                          title="FINAL TRAVEL PLAN"
                          text="Personalized itinerary returned to the user as the final application result."
                          meta="OUTPUT"
                          highlight
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid border-t border-white/10 sm:grid-cols-3">
                {[
                  ["Frontend", "React"],
                  ["Orchestration", "LangGraph"],
                  ["Backend", "Node.js"],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`p-5 ${
                      index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""
                    }`}
                  >
                    <p className="text-[7px] uppercase tracking-[0.2em] text-white/20">
                      {label}
                    </p>
                    <p className="mt-2 text-sm text-white/55">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RESUME */}

        <section
          id="resume"
          className="border-t border-white/5 px-6 py-28 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                    Professional Profile
                  </p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                    Resume.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/30">
                    A compact professional snapshot covering my education,
                    technical skills, projects and developer profile.
                  </p>
                </div>
                <span className="w-fit rounded-full border border-white/10 px-3 py-1.5 text-[7px] uppercase tracking-[0.2em] text-white/20">
                  PDF / Ready
                </span>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-9">
                  <div className="pointer-events-none absolute -right-8 -top-12 font-mono text-[170px] font-semibold leading-none text-white/[0.025]">
                    CV
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                      <span className="text-[8px] uppercase tracking-[0.3em] text-white/25">
                        Developer Resume
                      </span>
                    </div>

                    <h3 className="mt-7 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
                      Building useful systems with AI, modern web technologies
                      and practical engineering.
                    </h3>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/30">
                      Explore the full resume for my education, technical
                      capabilities and project experience, then use the rest
                      of PREM.OS to explore the work in more detail.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition hover:scale-105"
                      >
                        View Resume ↗
                      </a>
                      <a
                        href="/resume.pdf"
                        download
                        className="rounded-full border border-white/15 px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50 transition hover:border-white/40 hover:bg-white/[0.04] hover:text-white"
                      >
                        Download PDF ↓
                      </a>
                    </div>

                    <div className="mt-10 grid gap-2">
                      {[
                        ["01", "MCA Student", "AI, full-stack, data & manual testing"],
                        ["02", "Project Focus", "Practical systems built around real use cases"],
                        ["03", "Core Stack", "React · Python · Node.js · AI tooling"],
                      ].map(([number, title, description]) => (
                        <div
                          key={number}
                          className="group grid gap-3 rounded-2xl border border-white/10 bg-white/[0.015] p-4 transition hover:border-white/25 hover:bg-white/[0.04] sm:grid-cols-[42px_150px_1fr] sm:items-center"
                        >
                          <span className="font-mono text-[9px] text-white/15">{number}</span>
                          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 transition group-hover:text-white">
                            {title}
                          </span>
                          <span className="text-xs leading-5 text-white/25">{description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/20">
                      Resume Terminal
                    </span>
                    <span className="flex items-center gap-2 text-[7px] uppercase tracking-[0.2em] text-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                      Ready
                    </span>
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 font-mono">
                    <p className="text-[10px] text-white/20">prem@os:~$ open resume.pdf</p>
                    <div className="my-5 h-px bg-white/10" />

                    <div className="space-y-4 text-[9px] uppercase tracking-[0.16em]">
                      <div className="flex justify-between gap-4">
                        <span className="text-white/20">Format</span>
                        <span className="text-white/50">PDF</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-white/20">Profile</span>
                        <span className="text-white/50">MCA Student / Developer</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-white/20">Focus</span>
                        <span className="text-right text-white/50">AI / Full-Stack / Data</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-white/20">Status</span>
                        <span className="text-white/70">MCA STUDENT</span>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="text-[8px] leading-5 tracking-[0.08em] text-white/25">
                        The portfolio provides the interactive layer. The
                        resume provides the compact professional snapshot.
                      </p>
                    </div>

                    <p className="mt-5 text-[9px] text-white/20">
                      prem@os:~$ <span className="animate-pulse">_</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                      Recruiter Access
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">
                      Everything important, one document.
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs leading-6 text-white/25">
                      Use the resume for a quick professional overview, then
                      explore the rest of PREM.OS for the projects and systems
                      behind it.
                    </p>
                  </div>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-full border border-white/15 px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50 transition hover:border-white/40 hover:bg-white hover:text-black"
                  >
                    Open document →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}

        <section
          id="contact"
          className="border-t border-white/5 px-6 py-28 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mb-12">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Communication Layer
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                  Contact.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/30">
                  Have a project, opportunity or technical idea in mind?
                  Connect directly and start a conversation.
                </p>
              </div>

              <ContactCommandCenter />
            </Reveal>
          </div>
        </section>

      </main>

      {/* FOOTER */}

      <footer className="border-t border-white/5 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-[9px] uppercase tracking-[0.25em] text-white/20 md:flex-row">
          <span>PREM.OS</span>

          <span>
            Built with React + Three.js
          </span>

          <span>
            © 2026 Prem Khamkar
          </span>
        </div>
      </footer>
      </div>
  );
}

export default App;