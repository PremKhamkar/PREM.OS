import { useState } from "react";
import { ArrowUpRight, Circle } from "lucide-react";
import { projects } from "../../data/projects";

function BuildSpace() {
    const [activeProject, setActiveProject] = useState(projects[0]);

    return (
        <section
            id="build"
            className="relative min-h-screen overflow-hidden border-t border-white/5 px-6 py-24 md:px-10"
        >
            {/* Background grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="relative mx-auto max-w-7xl">
                {/* Section heading */}
                <div className="mb-20">
                    <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-white/30">
                        Build Space / 01
                    </p>

                    <h2 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
                        Things I
                        <span className="text-white/30"> build.</span>
                    </h2>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/40">
                        A collection of systems, experiments and applications built while
                        exploring AI, full-stack development and data.
                    </p>
                </div>

                {/* Main project environment */}
                <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
                    {/* Project Universe */}
                    <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.015]">
                        <div className="absolute left-6 top-6 text-[9px] uppercase tracking-[0.3em] text-white/20">
                            Project Universe
                        </div>

                        {/* Center */}
                        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                            <div className="absolute h-40 w-40 rounded-full border border-white/5" />
                            <div className="absolute h-28 w-28 rounded-full border border-white/10" />

                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white text-[9px] font-semibold tracking-[0.2em] text-black shadow-[0_0_60px_rgba(255,255,255,0.08)]">
                                CORE
                            </div>
                        </div>

                        {/* Project nodes */}
                        {projects.map((project, index) => {
                            const positions = [
                                "left-[18%] top-[25%]",
                                "right-[15%] top-[20%]",
                                "left-[15%] bottom-[20%]",
                                "right-[18%] bottom-[22%]",
                            ];

                            const active = activeProject.id === project.id;

                            return (
                                <button
                                    key={project.id}
                                    onClick={() => setActiveProject(project)}
                                    className={`absolute ${positions[index]} group text-left`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-500 ${active
                                                ? "border-white/60"
                                                : "border-white/20 group-hover:border-white/50"
                                                }`}
                                        >
                                            <Circle
                                                size={5}
                                                fill="currentColor"
                                                className={
                                                    active ? "text-white" : "text-white/30"
                                                }
                                            />
                                        </span>

                                        <span
                                            className={`text-[10px] uppercase tracking-[0.15em] transition ${active
                                                ? "text-white"
                                                : "text-white/30 group-hover:text-white/70"
                                                }`}
                                        >
                                            {project.title}
                                        </span>
                                    </div>

                                    {/* Connection line */}
                                    <div
                                        className={`absolute left-[9px] top-5 h-24 w-px origin-top transition-all duration-500 ${active
                                            ? "bg-white/30"
                                            : "bg-white/5"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Project information */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                                Project {activeProject.number}
                            </span>

                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                                {activeProject.status}
                            </span>
                        </div>

                        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/30">
                            {activeProject.category}
                        </p>

                        <h3 className="text-4xl font-semibold tracking-tight md:text-6xl">
                            {activeProject.title}
                        </h3>

                        <p className="mt-7 max-w-lg text-sm leading-7 text-white/45">
                            {activeProject.description}
                        </p>

                        {/* Technologies */}
                        <div className="mt-8 flex flex-wrap gap-2">
                            {activeProject.technologies.map((technology) => (
                                <span
                                    key={technology}
                                    className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-white/40"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-10 flex flex-wrap gap-3">
                            {activeProject.id === "voyagent-ai" && (
                                <a
                                    href="#architecture"
                                    className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
                                >
                                    Explore Architecture
                                    <ArrowUpRight size={14} />
                                </a>
                            )}

                            {activeProject.github !== "#" ? (
                                <a
                                    href={activeProject.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white"
                                >
                                    View Repository
                                    <ArrowUpRight size={14} />
                                </a>
                            ) : (
                                <span className="self-center text-[10px] uppercase tracking-[0.2em] text-white/20">
                                    Repository coming soon
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BuildSpace;