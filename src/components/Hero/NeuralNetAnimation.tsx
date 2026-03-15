"use client";

import React, { useState, useEffect, useRef } from 'react';

type Node = {
  id: string;
  x: number;
  y: number;
  layer: 'input' | 'hidden' | 'output';
};

type Connection = {
  from: string;
  to: string;
};

const NeuralNetAnimation = () => {
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());
  
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  // Initialize network structure
  useEffect(() => {
    const width = 420;
    const height = 420;
    const padding = 40;
    const layerSpacing = (width - padding * 2) / 2;

    const layers = {
      input: 4,
      hidden: 6,
      output: 3
    };

    const newNodes: Node[] = [];
    const newConnections: Connection[] = [];

    // Create Nodes
    Object.entries(layers).forEach(([layerName, count], layerIdx) => {
      const x = padding + layerIdx * layerSpacing;
      const verticalGap = (height - padding * 2) / (count - 1 || 1);
      const startY = count === 1 ? height / 2 : padding;

      for (let i = 0; i < count; i++) {
        const node: Node = {
          id: `${layerName}-${i}`,
          x,
          y: count === 1 ? height / 2 : startY + i * verticalGap,
          layer: layerName as 'input' | 'hidden' | 'output'
        };
        newNodes.push(node);
      }
    });

    // Create Connections
    const inputNodes = newNodes.filter(n => n.layer === 'input');
    const hiddenNodes = newNodes.filter(n => n.layer === 'hidden');
    const outputNodes = newNodes.filter(n => n.layer === 'output');

    inputNodes.forEach(i => {
      hiddenNodes.forEach(h => {
        newConnections.push({ from: i.id, to: h.id });
      });
    });

    hiddenNodes.forEach(h => {
      outputNodes.forEach(o => {
        newConnections.push({ from: h.id, to: o.id });
      });
    });

    nodesRef.current = newNodes;
    connectionsRef.current = newConnections;
  }, []);

  // Animation Loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runPropagation = async () => {
      // Step 1: Random input node lights up
      const inputNodes = nodesRef.current.filter(n => n.layer === 'input');
      const randomInput = inputNodes[Math.floor(Math.random() * inputNodes.length)];
      
      setActiveNodes(new Set([randomInput.id]));
      await new Promise(r => setTimeout(r, 300));

      // Step 2: Connections from input to hidden animate
      const fromInputConnections = connectionsRef.current.filter(c => c.from === randomInput.id);
      for (let i = 0; i < fromInputConnections.length; i++) {
        const connId = `${fromInputConnections[i].from}->${fromInputConnections[i].to}`;
        setActiveConnections(prev => {
          const next = new Set(Array.from(prev as Set<string>));
          next.add(connId);
          return next;
        });
        await new Promise(r => setTimeout(r, 80));
      }

      // Step 3: Random hidden nodes light up
      const hiddenNodes = nodesRef.current.filter(n => n.layer === 'hidden');
      const randomHiddenCount = Math.floor(Math.random() * 2) + 1;
      const selectedHidden: string[] = [];
      for(let i=0; i<randomHiddenCount; i++) {
        selectedHidden.push(hiddenNodes[Math.floor(Math.random() * hiddenNodes.length)].id);
      }
      
      setActiveNodes(prev => {
        const next = new Set(Array.from(prev as Set<string>));
        selectedHidden.forEach(id => next.add(id));
        return next;
      });
      await new Promise(r => setTimeout(r, 300));

      // Step 4: Connections from hidden to output animate
      const fromHiddenConnections = connectionsRef.current.filter(c => selectedHidden.includes(c.from));
      for (let i = 0; i < fromHiddenConnections.length; i++) {
        const connId = `${fromHiddenConnections[i].from}->${fromHiddenConnections[i].to}`;
        setActiveConnections(prev => {
          const next = new Set(Array.from(prev as Set<string>));
          next.add(connId);
          return next;
        });
        await new Promise(r => setTimeout(r, 80));
      }

      // Step 5: 1 output node lights up
      const outputNodes = nodesRef.current.filter(n => n.layer === 'output');
      const randomOutput = outputNodes[Math.floor(Math.random() * outputNodes.length)];
      setActiveNodes(prev => {
        const next = new Set(Array.from(prev as Set<string>));
        next.add(randomOutput.id);
        return next;
      });
      await new Promise(r => setTimeout(r, 300));

      // Step 6: Fade back
      await new Promise(r => setTimeout(r, 400));
      setActiveNodes(new Set());
      setActiveConnections(new Set());

      // Step 7: Wait and repeat
      timeoutId = setTimeout(runPropagation, 800);
    };

    runPropagation();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <svg width="420" height="420" viewBox="0 0 420 420" style={{ overflow: 'visible' }}>
      {/* Connections (Background) */}
      {connectionsRef.current.map((conn) => {
        const fromNode = nodesRef.current.find(n => n.id === conn.from)!;
        const toNode = nodesRef.current.find(n => n.id === conn.to)!;
        const isActive = activeConnections.has(`${conn.from}->${conn.to}`);

        return (
          <line
            key={`${conn.from}-${conn.to}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="#1C6EF2"
            strokeWidth={isActive ? 1.5 : 1}
            strokeOpacity={isActive ? 0.5 : 0.12}
            style={{ transition: 'stroke-opacity 0.2s ease-out, stroke-width 0.2s ease-out' }}
          />
        );
      })}

      {/* Nodes */}
      {nodesRef.current.map((node) => {
        const isActive = activeNodes.has(node.id);
        return (
          <g key={node.id}>
            {/* Glow Ring */}
            {isActive && (
              <circle
                cx={node.x}
                cy={node.y}
                r="18"
                fill="#1C6EF2"
                fillOpacity="0.15"
                style={{ transition: 'fill-opacity 0.2s ease-out' }}
              />
            )}
            {/* Node Circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r="10"
              fill={isActive ? '#1C6EF2' : '#E8F0FE'}
              stroke="#1C6EF2"
              strokeWidth="1.5"
              style={{ transition: 'fill 0.2s ease-out' }}
            />
          </g>
        );
      })}

      {/* Labels */}
      <text x="40" y="415" fontSize="10" fontFamily="monospace" fill="#6B6B65" textAnchor="middle">INPUT</text>
      <text x="210" y="415" fontSize="10" fontFamily="monospace" fill="#6B6B65" textAnchor="middle">HIDDEN</text>
      <text x="380" y="415" fontSize="10" fontFamily="monospace" fill="#6B6B65" textAnchor="middle">OUTPUT</text>
    </svg>
  );
};

export default NeuralNetAnimation;
