import { ArrowDown, ArrowRight, Brain, Database, Globe, Server } from "lucide-react";

const agents = [
    {
        name: "Weather Agent",
        description: "Handles destination weather information.",
    },
    {
        name: "Attraction Agent",
        description: "Finds relevant attractions and activities.",
    },
    {
        name: "Accommodation Agent",
        description: "Handles accommodation-related planning.",
    },
];

function ArchitectureMode() {
    return (
        <section
            id="architecture"
            className="relative overflow-hidden border-t border-white/5 px-6 py-28 md:px-10"
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-20">
                    <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-white/30">
                        Architecture Mode / 01
                    </p>

                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div>
                            <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
                                How it
                                <span className="text-white/30"> works.</span>
                            </h2>

                            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/40">
                                Voyagent-AI combines a modern web interface, backend services
                                and AI-driven agent workflows to transform a user's travel
                                request into a structured travel plan.
                            </p>
                        </div>

                        <div className="text-[10px] uppercase tracking-[0.25em] text-white/20">
                            VOYAGENT-AI / SYSTEM MAP
                        </div>
                    </div>
                </div>

                {/* Architecture */}
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.015] p-6 md:p-10">

                    {/* User */}
                    <div className="flex flex-col items-center">
                        <ArchitectureNode
                            icon={<Globe size={18} />}
                            label="USER"
                            description="Travel request"
                        />

                        <ArrowDown className="my-5 text-white/20" size={18} />

                        <ArchitectureNode
                            icon={<Server size={18} />}
                            label="REACT FRONTEND"
                            description="Trip planning interface"
                        />

                        <ArrowDown className="my-5 text-white/20" size={18} />

                        <ArchitectureNode
                            icon={<Server size={18} />}
                            label="NODE.JS BACKEND"
                            description="Application API layer"
                        />

                        <ArrowDown className="my-5 text-white/20" size={18} />

                        <ArchitectureNode
                            icon={<Brain size={18} />}
                            label="LANGGRAPH"
                            description="AI orchestration layer"
                            highlighted
                        />
                    </div>

                    {/* Agents */}
                    <div className="my-8 flex justify-center">
                        <div className="h-12 w-px bg-white/10" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {agents.map((agent) => (
                            <AgentCard
                                key={agent.name}
                                name={agent.name}
                                description={agent.description}
                            />
                        ))}
                    </div>

                    {/* Output */}
                    <div className="mt-8 flex flex-col items-center">
                        <ArrowDown className="my-5 text-white/20" size={18} />

                        <ArchitectureNode
                            icon={<Database size={18} />}
                            label="TRAVEL PLAN"
                            description="Structured final result"
                        />
                    </div>
                </div>

                {/* Technical Evidence */}
                <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
                    <Evidence
                        title="Frontend"
                        value="React"
                        description="Interactive travel planning UI"
                    />

                    <Evidence
                        title="Backend"
                        value="Node.js"
                        description="Application and API layer"
                    />

                    <Evidence
                        title="AI"
                        value="LangGraph"
                        description="Multi-step agent orchestration"
                    />

                    <Evidence
                        title="Integration"
                        value="Maps + APIs"
                        description="External travel data"
                    />
                </div>
            </div>
        </section>
    );
}

function ArchitectureNode({
    icon,
    label,
    description,
    highlighted = false,
}) {
    return (
        <div
            className={`w-full max-w-md rounded-2xl border p-5 transition ${highlighted
                    ? "border-white/30 bg-white/[0.06] shadow-[0_0_50px_rgba(255,255,255,0.04)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
        >
            <div className="flex items-center gap-4">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${highlighted
                            ? "border-white/30 bg-white text-black"
                            : "border-white/10 text-white/50"
                        }`}
                >
                    {icon}
                </div>

                <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
                        {label}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function AgentCard({ name, description }) {
    return (
        <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04]">
            <div className="mb-5 flex items-center justify-between">
                <span className="h-2 w-2 rounded-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.5)]" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                    Agent
                </span>
            </div>

            <h3 className="text-sm font-medium text-white/80">
                {name}
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/30">
                {description}
            </p>
        </div>
    );
}

function Evidence({ title, value, description }) {
    return (
        <div className="bg-[#0a0b0d] p-6">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                {title}
            </p>

            <p className="mt-3 text-xl font-medium text-white/80">
                {value}
            </p>

            <p className="mt-2 text-xs leading-5 text-white/25">
                {description}
            </p>
        </div>
    );
}

export default ArchitectureMode;