"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ConceptComparisonProps {
  concepts: {
    id: string;
    name: string;
    description: string;
    characteristics: string[];
    examples: string[];
  }[];
}

export function ConceptComparison({ concepts }: ConceptComparisonProps) {
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>(
    concepts.length > 1 ? [concepts[0].id, concepts[1].id] : [concepts[0]?.id]
  );

  const toggleConcept = (id: string) => {
    if (selectedConcepts.includes(id)) {
      if (selectedConcepts.length > 1) {
        setSelectedConcepts(selectedConcepts.filter((c) => c !== id));
      }
    } else {
      setSelectedConcepts([...selectedConcepts, id]);
    }
  };

  const filteredConcepts = concepts.filter((c) => 
    selectedConcepts.includes(c.id)
  );

  return (
    <div className="my-10">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">选择概念进行比较：</h3>
        <div className="flex flex-wrap gap-2">
          {concepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => toggleConcept(concept.id)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedConcepts.includes(concept.id)
                  ? "bg-purple-600 text-white"
                  : "bg-accent/30 hover:bg-accent/60"
              }`}
            >
              {concept.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredConcepts.map((concept) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="border border-purple-200/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-purple">
              {concept.name}
            </h3>
            <p className="mb-4 text-muted-foreground">{concept.description}</p>

            <div className="mb-4">
              <h4 className="font-medium mb-2">特点：</h4>
              <ul className="list-disc list-inside space-y-1">
                {concept.characteristics.map((char, index) => (
                  <li key={index} className="text-sm">{char}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">代表案例：</h4>
              <ul className="list-disc list-inside space-y-1">
                {concept.examples.map((example, index) => (
                  <li key={index} className="text-sm">{example}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 