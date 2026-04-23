"use client"

import { useEffect, useRef, useState } from "react"
import { Package, ShoppingCart, MessageSquareQuote, Settings, ArrowRight, Layers } from "lucide-react"

interface Node {
  id: string
  label: string
  icon: React.ReactNode
  x: number
  y: number
  color: string
  description: string
}

interface Connection {
  from: string
  to: string
  label: string
  type: "data" | "oversight"
}

const nodes: Node[] = [
  {
    id: "products",
    label: "Product Catalog",
    icon: <Package className="w-6 h-6" />,
    x: 50,
    y: 35,
    color: "#6366f1",
    description: "Manage inventory, pricing & details"
  },
  {
    id: "orders",
    label: "Order Logs",
    icon: <ShoppingCart className="w-6 h-6" />,
    x: 50,
    y: 75,
    color: "#10b981",
    description: "Track purchases & transactions"
  },
  {
    id: "testimonials",
    label: "Customer Testimonials",
    icon: <MessageSquareQuote className="w-6 h-6" />,
    x: 80,
    y: 55,
    color: "#f59e0b",
    description: "Reviews & customer feedback"
  },
  {
    id: "config",
    label: "Website Configuration",
    icon: <Settings className="w-6 h-6" />,
    x: 20,
    y: 55,
    color: "#ec4899",
    description: "Global settings & preferences"
  }
]

const connections: Connection[] = [
  { from: "orders", to: "products", label: "References", type: "data" },
  { from: "testimonials", to: "products", label: "Linked to", type: "data" },
  { from: "config", to: "products", label: "Oversees", type: "oversight" },
  { from: "config", to: "orders", label: "Oversees", type: "oversight" },
  { from: "config", to: "testimonials", label: "Oversees", type: "oversight" }
]

function SchemaNode({ node, isHovered, onHover }: { 
  node: Node
  isHovered: boolean
  onHover: (id: string | null) => void 
}) {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer group"
      style={{ 
        left: `${node.x}%`, 
        top: `${node.y}%`,
        zIndex: isHovered ? 20 : 10
      }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{ backgroundColor: node.color, transform: "scale(1.2)" }}
      />
      
      {/* Main card */}
      <div 
        className={`relative bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 min-w-[180px] transition-all duration-300 ${
          isHovered ? "scale-110 shadow-2xl border-slate-600" : "shadow-lg hover:shadow-xl"
        }`}
        style={{
          boxShadow: isHovered ? `0 25px 50px -12px ${node.color}40` : undefined
        }}
      >
        {/* Icon container */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${node.color}20`, color: node.color }}
        >
          {node.icon}
        </div>
        
        {/* Label */}
        <h3 className="text-white font-semibold text-sm mb-1">{node.label}</h3>
        
        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed">{node.description}</p>
        
        {/* Status indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Active</span>
        </div>
      </div>
    </div>
  )
}

function ConnectionLine({ 
  from, 
  to, 
  connection,
  hoveredNode 
}: { 
  from: Node
  to: Node
  connection: Connection
  hoveredNode: string | null
}) {
  const isHighlighted = hoveredNode === from.id || hoveredNode === to.id
  const isOversight = connection.type === "oversight"
  
  // Calculate control points for curved lines
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  
  // Offset for curve
  const dx = to.x - from.x
  const dy = to.y - from.y
  const offset = isOversight ? 8 : 5
  const ctrlX = midX + (dy > 0 ? -offset : offset)
  const ctrlY = midY + (dx > 0 ? offset : -offset)
  
  return (
    <g className={`transition-opacity duration-300 ${isHighlighted ? "opacity-100" : "opacity-40"}`}>
      {/* Main path */}
      <path
        d={`M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`}
        fill="none"
        stroke={isOversight ? "#ec4899" : isHighlighted ? "#6366f1" : "#475569"}
        strokeWidth={isHighlighted ? 2 : 1.5}
        strokeDasharray={isOversight ? "6 4" : "none"}
        className="transition-all duration-300"
      />
      
      {/* Arrow marker */}
      <circle
        cx={to.x}
        cy={to.y}
        r={3}
        fill={isOversight ? "#ec4899" : isHighlighted ? "#6366f1" : "#475569"}
        className="transition-all duration-300"
      />
      
      {/* Label */}
      {isHighlighted && (
        <g>
          <rect
            x={ctrlX - 28}
            y={ctrlY - 10}
            width={56}
            height={20}
            rx={4}
            fill="#1e293b"
            stroke="#334155"
            strokeWidth={1}
          />
          <text
            x={ctrlX}
            y={ctrlY + 4}
            textAnchor="middle"
            className="text-[9px] fill-slate-300 font-medium"
          >
            {connection.label}
          </text>
        </g>
      )}
    </g>
  )
}

export default function AdminSchemaPage() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const getNodeById = (id: string) => nodes.find(n => n.id === id)!
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-full mb-6 backdrop-blur-sm">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-slate-300">Data Architecture</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Admin Data Schema
          </h1>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Visual representation of the core data entities powering your business website administration
          </p>
        </div>
        
        {/* Schema visualization */}
        <div className={`relative w-full max-w-5xl mx-auto aspect-[16/10] bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800/50 shadow-2xl overflow-hidden transition-all duration-700 delay-200 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {/* SVG connections layer */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {connections.map((conn, i) => (
              <ConnectionLine
                key={i}
                from={getNodeById(conn.from)}
                to={getNodeById(conn.to)}
                connection={conn}
                hoveredNode={hoveredNode}
              />
            ))}
          </svg>
          
          {/* Nodes layer */}
          {nodes.map(node => (
            <SchemaNode
              key={node.id}
              node={node}
              isHovered={hoveredNode === node.id}
              onHover={setHoveredNode}
            />
          ))}
          
          {/* Center decoration */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-slate-700/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-slate-700/40 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-slate-700/50" />
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className={`flex flex-wrap items-center justify-center gap-8 mt-12 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-indigo-500" />
              <ArrowRight className="w-3 h-3 text-indigo-500" />
            </div>
            <span className="text-sm text-slate-400">Data Connection</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-pink-500 border-dashed" style={{ borderTop: "2px dashed #ec4899", height: 0 }} />
              <ArrowRight className="w-3 h-3 text-pink-500" />
            </div>
            <span className="text-sm text-slate-400">Oversight / Control</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-400">Active Entity</span>
          </div>
        </div>
        
        {/* Entity cards grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {nodes.map((node, i) => (
            <div 
              key={node.id}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/40 rounded-xl p-5 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 group cursor-pointer"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${node.color}20`, color: node.color }}
              >
                {node.icon}
              </div>
              
              <h3 className="text-white font-semibold mb-2">{node.label}</h3>
              <p className="text-slate-400 text-sm">{node.description}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-700/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Table Status</span>
                  <span className="text-emerald-400 font-medium">Healthy</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer info */}
        <div className={`text-center mt-16 transition-all duration-700 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <p className="text-slate-500 text-sm">
            Hover over nodes to explore relationships • All entities are interconnected for seamless data flow
          </p>
        </div>
      </div>
    </div>
  )
}
