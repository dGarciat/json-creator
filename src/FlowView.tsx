import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, Node, Edge } from 'react-flow-renderer';
import { Step } from './models';

interface FlowViewProps {
  steps: Step[];
}

const getNodesAndEdges = (steps: Step[]): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = steps.map((step, idx) => ({
    id: step.id,
    data: { label: `${step.order}_${step.type}` },
    position: { x: 100, y: idx * 100 },
    style: { minWidth: 200, padding: 10, borderRadius: 8, border: '2px solid #1976d2', background: '#fff' }
  }));
  const edges: Edge[] = steps.slice(1).map((step, idx) => ({
    id: `e${steps[idx].id}-${step.id}`,
    source: steps[idx].id,
    target: step.id,
    animated: true,
    style: { stroke: '#1976d2', strokeWidth: 2 }
  }));
  return { nodes, edges };
};

const FlowView: React.FC<FlowViewProps> = ({ steps }) => {
  const { nodes, edges } = getNodesAndEdges(steps);
  return (
    <div style={{ height: '60vh', minHeight: 400, width: '100%', background: '#f4f6fb', borderRadius: 8 }}>
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
