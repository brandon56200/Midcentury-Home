"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogRenderer } from "~/components/blog/BlogRenderer";
import type { BlogPost, BlogElement } from "~/types/blog";
import { BlogPostSchema } from "~/types/blog";
import { cn } from "~/lib/utils";
import { 
  Download, 
  Copy, 
  Eye, 
  Code, 
  Lock, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Settings,
  Image as ImageIcon,
  Type,
  Code2,
  Table as TableIcon,
  User,
  Calendar,
  Layers,
  X,
  RotateCcw,
  Columns,
  ChevronUp,
  ChevronDown
} from "lucide-react";

const INITIAL_POST: BlogPost = {
  id: "sample-post",
  slug: "introducing-midcentury-v2",
  published: true,
  featured: true,
  metadata: {
    title: "Introducing Midcentury v2: The Multimodal Synapse",
    description: "A deep dive into our new architecture for processing complex data streams at enterprise scale.",
    date: new Date().toISOString().split("T")[0]!,
    author: "Brandon Samaroo",
    image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1993&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  content: [
    {
      id: "banner-1",
      type: "banner",
      url: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1993&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Neural Network Visualization",
    },
    {
      id: "para-1",
      type: "paragraph",
      text: "As we move into 2026, the demand for <b>multimodal processing</b> has reached an all-time high. Traditional data warehouses are no longer sufficient for the synaptic requirements of modern LLMs.",
    },
    {
      id: "space-1",
      type: "space",
      height: "medium",
    },
    {
      id: "sub-1",
      type: "subtitle",
      text: "Performance Benchmarks",
    },
    {
      id: "para-4",
      type: "paragraph",
      text: "Initial testing across <b>heterogeneous compute clusters</b> shows a linear scaling factor of 0.98, which is unprecedented for multimodal workloads. This allows for near-instantaneous processing of petabyte-scale datasets.",
    },
    {
      id: "table-1",
      type: "table",
      headers: ["Metric", "v1.0", "v2.0 (Current)"],
      rows: [
        ["Latency", "450ms", "42ms"],
        ["Throughput", "1.2 GB/s", "8.4 GB/s"],
        ["Accuracy", "94.2%", "99.1%"]
      ],
    },
    {
      id: "code-1",
      type: "code",
      code: "import { midcentury } from '@midcentury/sdk';\n\nconst synapse = await midcentury.initialize({\n  mode: 'multimodal',\n  scaling: 'automatic'\n});\n\nawait synapse.process(stream);",
      language: "typescript",
      fileName: "initialize.ts"
    },
    {
      id: "space-2",
      type: "space",
      height: "medium",
    },
    {
      id: "sub-2",
      type: "subtitle",
      text: "Real-time Synaptic Mapping",
    },
    {
      id: "para-2",
      type: "paragraph",
      text: "The integration of <b>high-fidelity neural mapping</b> allows for instantaneous feedback loops when tuning hyperparameters. This creates a more intuitive workspace for data scientists and engineers alike, reducing the overhead of manual verification.",
    },
    {
      id: "img-1",
      type: "image",
      url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832",
      caption: "Internal visualization of the v2.0 multimodal engine mapping data clusters in real-time."
    },
    {
      id: "space-3",
      type: "space",
      height: "medium",
    },
    {
      id: "sub-3",
      type: "subtitle",
      text: "Future Outlook",
    },
    {
      id: "para-3",
      type: "paragraph",
      text: "Looking ahead, we are exploring <b>quantum-resistant encryption</b> for the synaptic transport layer. This will ensure that your multimodal data remains secure even in the post-quantum era.",
    },
    {
      id: "auth-1",
      type: "authors",
      list: [
        {
          name: "Brandon Samaroo",
          xProfile: "https://x.com/brandonsamaroo",
          avatar: "https://github.com/identicons/midcentury.png",
        },
      ],
    },
  ],
};

export default function IdeaPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePost, setActivePost] = useState<BlogPost>(INITIAL_POST);
  const [viewMode, setViewMode] = useState<"preview" | "code" | "split">("preview");
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [editingElementIndex, setEditingElementIndex] = useState<number | null>(null);
  const [isAddingElement, setIsAddingElement] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Authentication check
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { checkIdeaPassword } = await import("./actions");
    const isValid = await checkIdeaPassword(password);
    if (isValid) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const updatePost = useCallback((updates: Partial<BlogPost>) => {
    setActivePost((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateMetadata = useCallback((updates: Partial<BlogPost["metadata"]>) => {
    setActivePost((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, ...updates },
    }));
  }, []);

  const moveElement = (index: number, direction: 'up' | 'down') => {
    const newContent = [...activePost.content];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Banner is locked at index 0. Draggable items are index 1+.
    if (targetIndex < 1 || targetIndex >= newContent.length) return;
    
    const temp = newContent[index];
    newContent[index] = newContent[targetIndex]!;
    newContent[targetIndex] = temp!;
    
    updatePost({ content: newContent });
  };

  const deleteElement = (index: number) => {
    const newContent = [...activePost.content];
    newContent.splice(index, 1);
    updatePost({ content: newContent });
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(activePost, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activePost.slug || "blog-post"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(activePost, null, 2));
    alert("JSON copied to clipboard!");
  };

  const refreshPreview = () => {
    setRefreshKey(prev => prev + 1);
  };

  const fixedContent = useMemo(() => 
    activePost.content.filter(e => e.type === 'banner'),
    [activePost.content]
  );
  
  const draggableContent = useMemo(() => 
    activePost.content.filter(e => e.type !== 'banner'),
    [activePost.content]
  );

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-zinc-900/50 p-10 backdrop-blur-xl"
        >
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Idea Generator</h2>
            <p className="mt-2 text-gray-400">Enter password to access the editor</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white focus:border-white/20 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Access Editor
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-white/10 bg-zinc-900/50 px-6 backdrop-blur-md shrink-0 z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-sm font-bold tracking-tighter uppercase text-white/90">Midcentury Idea</h1>
          </div>
          
          <div className="relative flex items-center gap-1 rounded-full bg-white/5 p-1 border border-white/5">
            {[
              { id: 'preview', icon: Eye, label: 'Preview' },
              { id: 'split', icon: Columns, label: 'Split' },
              { id: 'code', icon: Code, label: 'JSON' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={cn(
                  "relative z-10 flex items-center gap-2 rounded-full px-5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300",
                  viewMode === mode.id ? "text-black" : "text-gray-500 hover:text-gray-300"
                )}
              >
                {viewMode === mode.id && (
                  <motion.div
                    layoutId="tab-highlight"
                    className="absolute inset-0 z-[-1] rounded-full bg-white shadow-xl shadow-white/10"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                      mass: 1,
                    }}
                  />
                )}
                <mode.icon className="h-3 w-3" />
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshPreview}
            className="group p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            title="Refresh Preview"
          >
            <RotateCcw className="h-4 w-4 transition-transform group-active:rotate-180" />
          </button>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            <Copy className="h-3.5 w-3.5" /> Copy
          </button>
          <button
            onClick={downloadJson}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-black hover:bg-gray-200 transition-all shadow-lg shadow-white/5"
          >
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar Explorer */}
        <aside className="w-80 border-r border-white/10 bg-zinc-950 flex flex-col shrink-0 z-10 shadow-2xl">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Metadata Section */}
            <div className="p-5 border-b border-white/5">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-[0.2em]">Metadata</span>
                <button 
                  onClick={() => setIsEditingMetadata(true)}
                  className="p-1.5 rounded-md hover:bg-white/5 text-gray-500 transition-colors"
                >
                  <Settings className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => setIsEditingMetadata(true)}
                  className="w-full text-left group rounded-2xl border border-white/5 bg-white/2 p-4 hover:border-white/10 hover:bg-white/4 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-3 w-3 text-indigo-400" />
                    <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Title</span>
                  </div>
                  <p className="text-xs font-bold text-gray-200 leading-tight line-clamp-2">{activePost.metadata.title}</p>
                </button>
                
                <button 
                  onClick={() => setIsEditingMetadata(true)}
                  className="w-full text-left group rounded-2xl border border-white/5 bg-white/2 p-4 hover:border-white/10 hover:bg-white/4 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="h-3 w-3 text-indigo-400" />
                    <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Description</span>
                  </div>
                  <p className="text-[11px] font-medium text-gray-400 leading-relaxed line-clamp-2">{activePost.metadata.description || "No description set..."}</p>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setIsEditingMetadata(true)}
                    className="text-left rounded-2xl border border-white/5 bg-white/2 p-4 hover:border-white/10 hover:bg-white/4 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Calendar className="h-3 w-3 text-indigo-400" />
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Date</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-300">{activePost.metadata.date}</p>
                  </button>
                  <button 
                    onClick={() => setIsEditingMetadata(true)}
                    className="text-left rounded-2xl border border-white/5 bg-white/2 p-4 hover:border-white/10 hover:bg-white/4 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <User className="h-3 w-3 text-indigo-400" />
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Author</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-300 truncate">{activePost.metadata.author}</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Elements Section */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-[0.2em]">Elements</span>
                <button 
                  onClick={() => setIsAddingElement(true)}
                  className="flex items-center gap-1.5 rounded-full bg-indigo-500 px-3 py-1 text-[9px] font-bold text-white hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
                >
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>

              {/* Fixed items first (Banner) */}
              <div className="space-y-2 mb-2">
                {fixedContent.map((element) => {
                  const globalIndex = activePost.content.indexOf(element);
                  return (
                    <div
                      key={element.id}
                      className="group relative rounded-2xl border border-white/5 bg-zinc-900/30 p-4 opacity-70"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Lock className="h-3 w-3 text-gray-600" />
                          <div className="flex items-center gap-2">
                            <ElementIcon type={element.type} />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              {element.type}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setEditingElementIndex(globalIndex)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 text-gray-400 transition-all"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reorderable items with physical swap animation */}
              <motion.div layout className="space-y-2 relative">
                {draggableContent.map((element) => {
                  const globalIndex = activePost.content.indexOf(element);
                  const canMoveUp = globalIndex > 1; // Locked banner at 0
                  const canMoveDown = globalIndex < activePost.content.length - 1;

                  return (
                    <motion.div
                      key={element.id}
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        mass: 0.5
                      }}
                      className="group relative rounded-2xl border border-white/5 bg-zinc-900/80 p-4 transition-all hover:border-indigo-500/30 hover:bg-zinc-900 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/5 shadow-inner">
                            <button 
                              onClick={() => moveElement(globalIndex, 'up')}
                              className={cn(
                                "p-1 rounded transition-all",
                                !canMoveUp ? "text-gray-800" : "text-gray-500 hover:text-indigo-400 hover:bg-white/5 active:scale-90"
                              )}
                            >
                              <ChevronUp className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => moveElement(globalIndex, 'down')}
                              className={cn(
                                "p-1 rounded transition-all",
                                !canMoveDown ? "text-gray-800" : "text-gray-500 hover:text-indigo-400 hover:bg-white/5 active:scale-90"
                              )}
                            >
                              <ChevronDown className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <ElementIcon type={element.type} />
                            <span className="text-[10px] font-bold text-gray-200 uppercase tracking-widest">
                              {element.type}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => setEditingElementIndex(globalIndex)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => deleteElement(globalIndex)}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </aside>

        {/* Content View Area */}
        <div className="flex-1 flex overflow-hidden bg-black relative">
          <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-[0.03]" />

          {/* JSON Pane */}
          {(viewMode === "code" || viewMode === "split") && (
            <div className={cn(
              "border-r border-white/10 bg-black flex flex-col relative z-10 transition-all duration-500",
              viewMode === "code" ? "w-full" : "w-[40%]"
            )}>
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-zinc-950/50">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">Source Code</span>
              </div>
              <div className="flex-1 p-6 font-mono text-sm overflow-hidden bg-zinc-950/30">
                <textarea
                  value={JSON.stringify(activePost, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setActivePost(parsed);
                    } catch {}
                  }}
                  className="h-full w-full resize-none bg-transparent text-gray-500 focus:outline-none custom-scrollbar leading-relaxed"
                  spellCheck={false}
                />
              </div>
            </div>
          )}

          {/* Preview Pane */}
          {(viewMode === "preview" || viewMode === "split") && (
            <div className={cn(
              "flex-1 overflow-y-auto custom-scrollbar relative z-10",
              viewMode === "preview" ? "bg-black" : "bg-zinc-950/20"
            )}>
              <motion.div 
                key={`${refreshKey}-${viewMode}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto py-12 px-4"
              >
                <BlogRenderer post={activePost} />
              </motion.div>
            </div>
          )}
        </div>
      </main>

      {/* Overlays / Modals */}
      <AnimatePresence>
        {isEditingMetadata && (
          <Modal title="Document Settings" onClose={() => setIsEditingMetadata(false)}>
             <MetadataForm 
               metadata={activePost.metadata} 
               slug={activePost.slug}
               onSave={(m, s) => {
                 updateMetadata(m);
                 updatePost({ slug: s });
                 setIsEditingMetadata(false);
               }} 
             />
          </Modal>
        )}

        {editingElementIndex !== null && (
          <Modal 
            title={`Edit ${activePost.content[editingElementIndex]?.type}`} 
            onClose={() => setEditingElementIndex(null)}
          >
            <ElementForm 
              element={activePost.content[editingElementIndex]!} 
              onSave={(updated) => {
                const newContent = [...activePost.content];
                newContent[editingElementIndex!] = updated;
                updatePost({ content: newContent });
                setEditingElementIndex(null);
              }}
            />
          </Modal>
        )}

        {isAddingElement && (
          <Modal title="Add Element" onClose={() => setIsAddingElement(false)}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { type: 'subtitle', icon: Type, label: 'Section Heading' },
                { type: 'paragraph', icon: Type, label: 'Paragraph' },
                { type: 'image', icon: ImageIcon, label: 'Image' },
                { type: 'code', icon: Code2, label: 'Code Block' },
                { type: 'table', icon: TableIcon, label: 'Data Table' },
                { type: 'authors', icon: User, label: 'Authors', limit: 1 },
                { type: 'space', icon: Layers, label: 'Spacing' },
              ]
              .filter(item => !item.limit || activePost.content.filter(e => e.type === item.type).length < item.limit)
              .map((item) => (
                <button
                  key={item.type}
                  onClick={() => {
                    const newElement = createDefaultElement(item.type as any);
                    updatePost({ content: [...activePost.content, newElement] });
                    setIsAddingElement(false);
                  }}
                  className="flex flex-col items-center gap-4 rounded-3xl border border-white/5 bg-white/5 p-8 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all text-center group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <item.icon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Subcomponents ---

const ElementIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'banner': return <ImageIcon className="h-3.5 w-3.5 text-indigo-400" />;
    case 'title': return <Type className="h-3.5 w-3.5 text-blue-400" />;
    case 'paragraph': return <Type className="h-3.5 w-3.5 text-gray-400" />;
    case 'code': return <Code2 className="h-3.5 w-3.5 text-orange-400" />;
    case 'image': return <ImageIcon className="h-3.5 w-3.5 text-green-400" />;
    case 'table': return <TableIcon className="h-3.5 w-3.5 text-purple-400" />;
    case 'authors': return <User className="h-3.5 w-3.5 text-pink-400" />;
    default: return <FileText className="h-3.5 w-3.5 text-gray-400" />;
  }
};

const Modal = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-6"
  >
    <motion.div 
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      className="w-full max-w-xl overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-900 shadow-2xl shadow-black"
    >
      <div className="flex items-center justify-between border-b border-white/5 px-10 py-8">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest">{title}</h3>
        <button onClick={onClose} className="p-2.5 rounded-full hover:bg-white/5 transition-colors">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto p-10 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  </motion.div>
);

const MetadataForm = ({ metadata, slug, onSave }: { metadata: BlogPost['metadata'], slug: string, onSave: (m: any, s: string) => void }) => {
  const [m, setM] = useState(metadata);
  const [s, setS] = useState(slug);
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Post URL Slug</label>
        <input value={s} onChange={e => setS(e.target.value)} className="w-full rounded-2xl bg-black border border-white/10 px-5 py-4 text-sm text-white focus:border-indigo-500 outline-none transition-all" />
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Display Title</label>
        <input value={m.title} onChange={e => setM({...m, title: e.target.value})} className="w-full rounded-2xl bg-black border border-white/10 px-5 py-4 text-sm text-white focus:border-indigo-500 outline-none transition-all" />
      </div>
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">SEO Description</label>
        <textarea value={m.description} onChange={e => setM({...m, description: e.target.value})} className="w-full h-32 rounded-2xl bg-black border border-white/10 px-5 py-4 text-sm text-white resize-none focus:border-indigo-500 outline-none transition-all leading-relaxed" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Publication Date</label>
          <input type="date" value={m.date} onChange={e => setM({...m, date: e.target.value})} className="w-full rounded-2xl bg-black border border-white/10 px-5 py-4 text-sm text-white focus:border-indigo-500 outline-none transition-all" />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Primary Author</label>
          <input value={m.author} onChange={e => setM({...m, author: e.target.value})} className="w-full rounded-2xl bg-black border border-white/10 px-5 py-4 text-sm text-white focus:border-indigo-500 outline-none transition-all" />
        </div>
      </div>
      <button onClick={() => onSave(m, s)} className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-[11px] rounded-2xl hover:bg-gray-200 transition-all shadow-xl shadow-white/5 active:scale-[0.98]">Save Document Settings</button>
    </div>
  );
};

const ElementForm = ({ element, onSave }: { element: BlogElement, onSave: (e: any) => void }) => {
  const [e, setE] = useState(element);
  const [csvRaw, setCsvRaw] = useState(() => {
    if (element.type === 'table') {
      return [element.headers.join(","), ...element.rows.map(r => r.join(","))].join("\n");
    }
    return "";
  });

  const updateField = (key: string, value: any) => {
    setE(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {Object.entries(e).map(([key, value]) => {
        if (key === 'type' || key === 'id') return null;

        return (
          <div key={key} className="space-y-3">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1">{key}</label>
            
            {typeof value === 'string' ? (
              key === 'text' || key === 'code' ? (
                <textarea 
                  value={value} 
                  onChange={v => updateField(key, v.target.value)} 
                  className="w-full h-48 rounded-2xl bg-black border border-white/10 p-5 text-sm text-gray-200 focus:border-indigo-500 outline-none transition-all leading-relaxed font-mono" 
                />
              ) : (
                <input 
                  value={value} 
                  onChange={v => updateField(key, v.target.value)} 
                  className="w-full rounded-2xl bg-black border border-white/10 px-5 py-4 text-sm text-gray-200 focus:border-indigo-500 outline-none transition-all" 
                />
              )
            ) : key === 'list' && Array.isArray(value) ? (
              <div className="space-y-4">
                {value.map((item: any, idx: number) => (
                  <div key={idx} className="relative p-6 rounded-4xl bg-white/2 border border-white/5 space-y-4 group/item hover:bg-white/5 transition-colors">
                    <button 
                      onClick={() => {
                        const newList = [...value];
                        newList.splice(idx, 1);
                        updateField('list', newList);
                      }}
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/20 text-gray-600 hover:text-red-400 opacity-0 group-hover/item:opacity-100 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Name</label>
                      <input 
                        placeholder="Author Name" 
                        value={item.name} 
                        onChange={v => {
                          const newList = [...value];
                          newList[idx] = { ...item, name: v.target.value };
                          updateField('list', newList);
                        }} 
                        className="w-full bg-transparent text-sm font-bold text-white outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">X Profile</label>
                      <input 
                        placeholder="https://x.com/username" 
                        value={item.xProfile} 
                        onChange={v => {
                          const newList = [...value];
                          newList[idx] = { ...item, xProfile: v.target.value };
                          updateField('list', newList);
                        }} 
                        className="w-full bg-transparent text-xs text-indigo-400 outline-none" 
                      />
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => updateField('list', [...value, { name: '', xProfile: '', avatar: '' }])}
                  className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-gray-300 hover:border-white/20 transition-all bg-white/2"
                >
                  + Add Author
                </button>
              </div>
            ) : key === 'headers' && Array.isArray(value) ? (
              <div className="space-y-2">
                <p className="text-[10px] text-gray-500 italic">Table headers and rows are now managed via the CSV input below.</p>
                <div className="flex gap-2">
                  {value.map((h, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">{h}</span>
                  ))}
                </div>
              </div>
            ) : key === 'rows' && Array.isArray(value) ? (
              <div className="space-y-4">
                <textarea 
                  placeholder="Paste CSV here (e.g. Header 1, Header 2\nRow 1 Col 1, Row 1 Col 2)"
                  value={csvRaw}
                  onChange={v => {
                    const newRaw = v.target.value;
                    setCsvRaw(newRaw);
                    const lines = newRaw.split("\n");
                    if (lines.length > 0) {
                      const firstLine = lines[0] ?? "";
                      const newHeaders = firstLine.split(",").map(h => h.trim());
                      const newRows = lines.slice(1).filter(l => l.trim() !== "").map(l => l.split(",").map(c => c.trim()));
                      setE(prev => ({ ...prev, headers: newHeaders, rows: newRows }));
                    }
                  }}
                  className="w-full h-48 rounded-2xl bg-black border border-white/10 p-5 text-sm text-indigo-300 focus:border-indigo-500 outline-none transition-all leading-relaxed font-mono" 
                />
                <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                  <p className="text-[10px] text-indigo-400/80 leading-relaxed uppercase tracking-widest font-bold">CSV Tips</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-1">First line is headers. Use commas to separate columns. Use new lines for rows.</p>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
      <button 
        onClick={() => onSave(e)} 
        className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-[11px] rounded-2xl hover:bg-gray-200 transition-all shadow-xl shadow-white/5 active:scale-[0.98]"
      >
        Update Document Element
      </button>
    </div>
  );
};

const createDefaultElement = (type: BlogElement['type']): BlogElement => {
  const id = `${type}-${Math.random().toString(36).substr(2, 9)}`;
  switch (type) {
    case 'title': return { id, type: 'title', text: 'New Section' };
    case 'subtitle': return { id, type: 'subtitle', text: 'New Subtitle' };
    case 'paragraph': return { id, type: 'paragraph', text: 'New paragraph content...' };
    case 'image': return { id, type: 'image', url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832', caption: 'New image' };
    case 'code': return { id, type: 'code', code: 'console.log("hello world");', language: 'typescript', fileName: 'script.ts' };
    case 'table': return { id, type: 'table', headers: ['Key', 'Value'], rows: [['Field Name', 'Value Data']] };
    case 'authors': return { id, type: 'authors', list: [{ name: 'Author Name', xProfile: 'https://x.com/profile' }] };
    case 'space': return { id, type: 'space', height: 'medium' };
    default: return { id, type: 'paragraph', text: '' };
  }
};
