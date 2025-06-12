import React from 'react';
import { motion } from 'framer-motion';

// 知识节点类型定义
interface KnowledgeNode {
  id: string;
  title: string;
  category: string;
  level: 'basic' | 'intermediate' | 'advanced';
  relatedNodes: string[];
  position: { x: number; y: number };
}

// 知识图谱数据
const knowledgeGraph: KnowledgeNode[] = [
  {
    id: 'dynamic-range',
    title: '动态范围',
    category: '传感器特性',
    level: 'intermediate',
    relatedNodes: ['exposure', 'sensors', 'raw-processing'],
    position: { x: 250, y: 200 }
  },
  {
    id: 'depth-of-field',
    title: '景深',
    category: '光学特性',
    level: 'intermediate',
    relatedNodes: ['aperture', 'focal-length', 'focus-distance'],
    position: { x: 450, y: 150 }
  },
  {
    id: 'lens-optics',
    title: '镜头光学',
    category: '镜头特性',
    level: 'advanced',
    relatedNodes: ['depth-of-field', 'distortion', 'aberration'],
    position: { x: 650, y: 250 }
  },
  {
    id: 'sensors',
    title: '数字传感器',
    category: '传感器特性',
    level: 'intermediate',
    relatedNodes: ['dynamic-range', 'iso', 'noise'],
    position: { x: 150, y: 300 }
  },
  {
    id: 'exposure',
    title: '曝光理论',
    category: '基础原理',
    level: 'basic',
    relatedNodes: ['dynamic-range', 'metering', 'iso'],
    position: { x: 350, y: 100 }
  },
  {
    id: 'metering',
    title: '测光系统',
    category: '相机系统',
    level: 'intermediate',
    relatedNodes: ['exposure', 'dynamic-range'],
    position: { x: 550, y: 100 }
  },
  {
    id: 'autofocus',
    title: '自动对焦',
    category: '相机系统',
    level: 'advanced',
    relatedNodes: ['focus-distance', 'lens-optics'],
    position: { x: 750, y: 150 }
  },
  {
    id: 'aperture',
    title: '光圈',
    category: '基础原理',
    level: 'basic',
    relatedNodes: ['depth-of-field', 'exposure'],
    position: { x: 350, y: 300 }
  },
  {
    id: 'focal-length',
    title: '焦距',
    category: '光学特性',
    level: 'basic',
    relatedNodes: ['depth-of-field', 'lens-optics'],
    position: { x: 550, y: 300 }
  },
  {
    id: 'raw-processing',
    title: 'RAW处理',
    category: '后期处理',
    level: 'advanced',
    relatedNodes: ['dynamic-range', 'color-science'],
    position: { x: 100, y: 150 }
  },
];

// 获取节点之间的连接线
const getConnections = () => {
  const connections: { from: string; to: string }[] = [];
  
  knowledgeGraph.forEach(node => {
    node.relatedNodes.forEach(relatedId => {
      // 避免重复连接
      const exists = connections.some(
        conn => (conn.from === node.id && conn.to === relatedId) || 
               (conn.from === relatedId && conn.to === node.id)
      );
      
      if (!exists && knowledgeGraph.some(n => n.id === relatedId)) {
        connections.push({ from: node.id, to: relatedId });
      }
    });
  });
  
  return connections;
};

interface TechNavigationProps {
  activeNodeId?: string;
  onNodeClick?: (nodeId: string) => void;
}

const TechNavigation: React.FC<TechNavigationProps> = ({ 
  activeNodeId,
  onNodeClick 
}) => {
  const connections = getConnections();
  
  // 根据技术水平获取节点颜色
  const getNodeColor = (level: string, isActive: boolean) => {
    if (isActive) return 'rgba(139, 92, 246, 1)'; // 紫色
    
    switch(level) {
      case 'basic': return 'rgba(79, 70, 229, 0.8)';
      case 'intermediate': return 'rgba(139, 92, 246, 0.8)';
      case 'advanced': return 'rgba(190, 24, 93, 0.8)';
      default: return 'rgba(139, 92, 246, 0.8)';
    }
  };
  
  // 获取节点大小
  const getNodeSize = (node: KnowledgeNode, isActive: boolean) => {
    if (isActive) return 25;
    switch(node.level) {
      case 'basic': return 18;
      case 'intermediate': return 22;
      case 'advanced': return 20;
      default: return 20;
    }
  };

  return (
    <div className="w-full relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/10 to-purple-500/10 border border-purple-200/20">
      <div className="p-4 border-b border-purple-200/20">
        <h3 className="text-lg font-medium text-purple-900 dark:text-purple-100">技术知识图谱</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">探索摄影技术概念间的关联</p>
      </div>
      
      <div className="relative h-[400px] w-full">
        {/* 连接线 */}
        <svg className="absolute inset-0 w-full h-full">
          {connections.map((conn, index) => {
            const fromNode = knowledgeGraph.find(n => n.id === conn.from);
            const toNode = knowledgeGraph.find(n => n.id === conn.to);
            
            if (!fromNode || !toNode) return null;
            
            const isActiveConnection = 
              activeNodeId === fromNode.id || 
              activeNodeId === toNode.id;
            
            return (
              <line
                key={`conn-${index}`}
                x1={fromNode.position.x}
                y1={fromNode.position.y}
                x2={toNode.position.x}
                y2={toNode.position.y}
                stroke={isActiveConnection ? "rgba(139, 92, 246, 0.7)" : "rgba(139, 92, 246, 0.2)"}
                strokeWidth={isActiveConnection ? 2 : 1}
              />
            );
          })}
        </svg>
        
        {/* 知识节点 */}
        {knowledgeGraph.map(node => {
          const isActive = activeNodeId === node.id;
          const nodeSize = getNodeSize(node, isActive);
          
          return (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ 
                left: node.position.x,
                top: node.position.y,
              }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onNodeClick && onNodeClick(node.id)}
            >
              <motion.div 
                className="rounded-full shadow-md flex items-center justify-center"
                style={{ 
                  width: nodeSize * 2, 
                  height: nodeSize * 2,
                  backgroundColor: getNodeColor(node.level, isActive),
                }}
                animate={{ 
                  scale: isActive ? [1, 1.1, 1] : 1,
                  transition: { 
                    repeat: isActive ? Infinity : 0, 
                    duration: 2
                  }
                }}
              >
                <span className="text-xs text-white">{node.level.charAt(0).toUpperCase()}</span>
              </motion.div>
              
              <div className={`mt-1 px-2 py-1 rounded text-center ${isActive ? 'bg-purple-100 dark:bg-purple-900/40' : ''}`}>
                <span className={`text-xs font-medium ${isActive ? 'text-purple-900 dark:text-purple-100' : 'text-gray-700 dark:text-gray-300'}`}>
                  {node.title}
                </span>
              </div>
            </motion.div>
          );
        })}
        
        {/* 图例 */}
        <div className="absolute bottom-4 right-4 bg-white/70 dark:bg-gray-800/70 p-2 rounded shadow-sm backdrop-blur-sm">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-600 mr-1"></div>
              <span>基础</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-600 mr-1"></div>
              <span>进阶</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-pink-600 mr-1"></div>
              <span>高级</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechNavigation; 