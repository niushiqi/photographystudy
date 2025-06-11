"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface ArtistProps {
  name: string;
  period: string;
  nationality: string;
  knownFor: string;
  description: string;
  contribution: string;
  keyWorks: string[];
  techniques: string[];
}

interface ArtistExplorerProps {
  artist: ArtistProps;
  delay?: number;
}

export function ArtistExplorer({ artist, delay = 0 }: ArtistExplorerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-8 bg-accent/10 rounded-lg p-6 border border-accent/20"
    >
      <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-2 py-1 bg-purple-900/30 rounded text-xs">{artist.period}</span>
        <span className="px-2 py-1 bg-purple-900/30 rounded text-xs">{artist.nationality}</span>
        <span className="px-2 py-1 bg-purple-600/30 rounded text-xs font-medium">
          擅长：{artist.knownFor}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm mb-2">{artist.description}</p>
        <p className="text-sm text-muted-foreground">{artist.contribution}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">代表作品：</h4>
          <ul className="list-disc list-inside space-y-1">
            {artist.keyWorks.map((work, index) => (
              <li key={index} className="text-xs text-muted-foreground">{work}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">技术特点：</h4>
          <div className="flex flex-wrap gap-1">
            {artist.techniques.map((technique, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-accent/30 rounded-full">
                {technique}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 