"use client";

import { useState } from "react";
import {
    LayoutGrid,
    MessageSquare,
    Sparkles,
    Users,
    Bell,
    FileText,
    Settings,
    PanelLeftClose,
    PanelLeftOpen,
    Activity,
} from "lucide-react";

const navItems = [
    { label: "Overview", icon: LayoutGrid, active: true },
    { label: "Conversations", icon: MessageSquare, active: false },
    { label: "Client Intelligence", icon: Sparkles, active: false },
    { label: "Clients", icon: Users, active: false },
    { label: "Alerts", icon: Bell, active: false },
    { label: "Templates", icon: FileText, active: false },
    { label: "Settings", icon: Settings, active: false },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`sidebar ${collapsed ? "collapsed" : ""} flex flex-col h-screen sticky top-0 bg-navy text-white shrink-0 ${
                collapsed ? "w-18" : "w-60"
            }`}
        >
            {/* Brand */}
            <div
                className={`flex items-center h-16 border-b border-white/10 ${
                    collapsed
                        ? "flex-col justify-center gap-1 py-2 h-auto min-h-16"
                        : "gap-3 px-4"
                }`}
            >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 shrink-0">
                    <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="sidebar-label font-semibold text-base tracking-wide">
                    VITAL
                </span>
                <button
                    type="button"
                    onClick={() => setCollapsed((c) => !c)}
                    className={`p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors ${
                        collapsed ? "" : "ml-auto"
                    }`}
                    aria-label={
                        collapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                >
                    {collapsed ? (
                        <PanelLeftOpen className="w-4 h-4" />
                    ) : (
                        <PanelLeftClose className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Nav — no separate routes, hover only */}
            <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            className={`sidebar-item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm cursor-default transition-colors ${
                                item.active
                                    ? "bg-[#5B4BDB] text-white"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <Icon className="w-4.5 h-4.5 shrink-0" />
                            <span className="sidebar-label">{item.label}</span>
                        </div>
                    );
                })}
            </nav>

            {/* Coach footer */}
            <div className="px-3 py-4 border-t border-white/10">
                <div className="sidebar-item flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5B4BDB] text-xs font-semibold shrink-0">
                        CD
                    </div>
                    <div className="sidebar-label min-w-0">
                        <p className="text-sm font-medium truncate">
                            Coach Demo
                        </p>
                        <p className="text-xs text-white/50">Coach</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
