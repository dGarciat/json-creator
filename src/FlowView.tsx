import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, Node, Edge } from 'react-flow-renderer';
import { Step } from './models';

interface FlowViewProps {
  steps: Step[];
  selectedStepId?: string;
  stepsByPhase?: Record<string, Step[]>;
}

const phaseColors = [
  '#ffe0b2', // Phase 1 - orange
  '#e3f2fd', // Phase 2 - blue
  '#c8e6c9', // Phase 3 - green
  '#f8bbd0', // Phase 4 - pink
  '#fff9c4', // Phase 5 - yellow
  '#d1c4e9', // Phase 6 - purple
  '#b2dfdb', // Phase 7 - teal
];

const getNodesAndEdges = (steps: Step[], selectedStepId?: string, stepsByPhase?: Record<string, Step[]>): { nodes: Node[]; edges: Edge[] } => {
  // Build a map: stepId -> phaseIdx
  let stepPhaseMap: Record<string, number> = {};
  if (stepsByPhase) {
    Object.entries(stepsByPhase).forEach(([phase, steps], idx) => {
      steps.forEach(s => {
        stepPhaseMap[s.id] = idx;
      });
    });
  }
  const nodes: Node[] = steps.map((step, idx) => {
    const isSelected = step.id === selectedStepId;
    const phaseIdx = stepPhaseMap[step.id] ?? 0;
    const baseColor = phaseColors[phaseIdx % phaseColors.length];
    return {
      id: step.id,
      data: {
        label: (
          <span style={{
            fontWeight: isSelected ? 800 : 500,
            color: isSelected ? '#ff9800' : '#1976d2',
            fontSize: isSelected ? 18 : 15,
            letterSpacing: 1,
          }}>{`${step.order}. ${step.type}`}</span>
        )
      },
      position: { x: 100, y: idx * 100 },
      style: {
        minWidth: 200,
        padding: 12,
        borderRadius: 10,
        border: isSelected
          ? '4px dashed #ff9800'
          : `2px solid ${baseColor}`,
        background: isSelected ? '#fffbe6' : baseColor,
        boxShadow: isSelected ? '0 0 0 6px #ff980088' : '0 1px 4px #bbb8',
        animation: isSelected ? 'blinker 0.9s linear infinite' : undefined,
        transition: 'border 0.2s, box-shadow 0.2s, background 0.2s',
        zIndex: isSelected ? 10 : 1,
      },
    };
  });
  const edges: Edge[] = steps.slice(1).map((step, idx) => ({
    id: `e${steps[idx].id}-${step.id}`,
    source: steps[idx].id,
    target: step.id,
    animated: true,
    style: { stroke: '#1976d2', strokeWidth: 2 }
  }));
  return { nodes, edges };
};


const FlowView: React.FC<FlowViewProps> = ({ steps, selectedStepId, stepsByPhase }) => {
  // Grouping logic: if stepsByPhase provided, use it, else fall back to flat steps
  let grouped: Array<{ phase: string; steps: Step[] }> = [];
  if (stepsByPhase) {
    grouped = Object.entries(stepsByPhase)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([phase, steps]) => ({ phase, steps }));
  } else {
    grouped = [{ phase: '1', steps }];
  }

  // Calculate nodes and edges for all steps
  const allSteps = grouped.flatMap(g => g.steps);
  const { nodes, edges } = getNodesAndEdges(allSteps, selectedStepId, stepsByPhase);


  return (
    <div style={{ height: '60vh', minHeight: 400, width: '100%', background: '#f4f6fb', borderRadius: 8, position: 'relative' }}>
      <style>{`
        @keyframes blinker {
          50% { border-color: #fff; box-shadow: 0 0 0 8px #ff980044; }
        }
      `}</style>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={2}
      >
        <MiniMap nodeColor={() => '#1976d2'} />
        <Controls />
        <Background gap={16} color="#e3e3e3" />
      </ReactFlow>
    </div>
  );
};

export default FlowView;
