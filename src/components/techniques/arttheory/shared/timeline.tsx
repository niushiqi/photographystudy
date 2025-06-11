"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  significance: string;
  keyFigures: string[];
}

interface TimelineEraProps {
  id: string;
  name: string;
  period: string;
  color: string;
  events: TimelineEvent[];
}

interface TimelineProps {
  eras: TimelineEraProps[];
}

export function Timeline({ eras }: TimelineProps) {
  const [selectedEra, setSelectedEra] = useState<TimelineEraProps>(eras[0]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <div className="my-12">
      <div className="flex flex-wrap gap-3 mb-10">
        {eras.map((era) => (
          <button
            key={era.id}
            onClick={() => {
              setSelectedEra(era);
              setSelectedEvent(null);
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedEra.id === era.id
                ? `bg-${era.color}-600 text-white`
                : "bg-accent/30 hover:bg-accent/60"
            }`}
            style={{
              backgroundColor: selectedEra.id === era.id ? `var(--${era.color}-600)` : '',
              color: selectedEra.id === era.id ? 'white' : ''
            }}
          >
            {era.name} ({era.period})
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEra.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* 时间线 */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-purple-600 transform md:translate-x-px"></div>

          <div className="relative">
            {selectedEra.events.map((event, index) => (
              <div key={event.id} className="mb-12 relative">
                <div
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* 圆点标记 */}
                  <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-4 border-purple-600 bg-white transform -translate-x-2 md:-translate-x-2.5 z-10"></div>

                  {/* 内容区域 */}
                  <div
                    className={`pl-8 md:pl-0 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    } md:w-1/2`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div
                        className={`p-4 border border-purple-200/20 rounded-lg cursor-pointer transition-all ${
                          selectedEvent?.id === event.id
                            ? "bg-purple-100/10 border-purple-400/40 shadow-md"
                            : "hover:border-purple-300/30 hover:bg-purple-50/5"
                        }`}
                        onClick={() =>
                          setSelectedEvent(
                            selectedEvent?.id === event.id ? null : event
                          )
                        }
                      >
                        <span className="inline-block px-2 py-1 rounded bg-purple-600/10 text-purple-600 text-xs font-medium mb-2">
                          {event.year}
                        </span>
                        <h3 className="text-lg font-medium mb-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>

                        {selectedEvent?.id === event.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-purple-200/20"
                          >
                            <div className="mb-3">
                              <h4 className="text-sm font-medium mb-1">
                                历史意义：
                              </h4>
                              <p className="text-sm">{event.significance}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-1">
                                关键人物：
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {event.keyFigures.map((figure, i) => (
                                  <span
                                    key={i}
                                    className="inline-block px-2 py-1 bg-accent/30 rounded text-xs"
                                  >
                                    {figure}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 