"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { ChevronDown, ChevronUp, Camera, Clock, Award, Eye, Check, X, AlertCircle } from 'lucide-react';

export interface TechniqueCardProps {
  title: string;
  description: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeRequired?: string;
  imageUrl?: string;
  tips?: string[];
  warnings?: string[];
  equipment?: { name: string; essential: boolean }[];
  tags?: string[];
  steps?: string[];
}

export function TechniqueCard({
  title,
  description,
  difficulty = 'intermediate',
  timeRequired,
  imageUrl,
  tips = [],
  warnings = [],
  equipment = [],
  tags = [],
  steps = []
}: TechniqueCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyText = () => {
    switch (difficulty) {
      case 'beginner':
        return '初学者';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return '未知';
    }
  };

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'beginner':
        return <Check className="w-3 h-3 mr-1" />;
      case 'intermediate':
        return <AlertCircle className="w-3 h-3 mr-1" />;
      case 'advanced':
        return <X className="w-3 h-3 mr-1" />;
      default:
        return <Award className="w-3 h-3 mr-1" />;
    }
  };

  return (
    <Card className="w-full overflow-hidden mb-6 border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all duration-300 group">
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          <div className="absolute top-3 right-3">
            <Badge className={`border ${getDifficultyColor()}`}>
              {getDifficultyIcon()}
              {getDifficultyText()}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white text-xl font-bold">{title}</h3>
            <p className="text-white/80 text-sm line-clamp-1">{description}</p>
          </div>
        </div>
      )}
      
      {!imageUrl && (
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
            {difficulty && (
              <Badge className={`border ${getDifficultyColor()}`}>
                {getDifficultyIcon()}
                {getDifficultyText()}
              </Badge>
            )}
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      )}
      
      <CardContent className={imageUrl ? "pt-3" : ""}>
        {timeRequired && (
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-3">
            <Clock className="w-4 h-4 mr-1 text-amber-500 dark:text-amber-400" />
            <span>{timeRequired}</span>
          </div>
        )}
        
        <Button 
          onClick={() => setExpanded(!expanded)} 
          variant="outline" 
          size="sm"
          className="w-full mt-2"
        >
          {expanded ? 
            <><ChevronUp className="w-4 h-4 mr-2" /> 收起详情</> : 
            <><ChevronDown className="w-4 h-4 mr-2" /> 查看详情</>}
        </Button>
      </CardContent>
      
      {expanded && (
        <CardFooter className="flex flex-col p-0">
          {tips.length > 0 && (
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 w-full">
              <h4 className="font-medium text-amber-600 dark:text-amber-500 mb-2 flex items-center">
                <Check className="w-4 h-4 mr-1" /> 专业提示
              </h4>
              <ul className="space-y-1">
                {tips.map((tip, index) => (
                  <li key={index} className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {warnings && warnings.length > 0 && (
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-red-50 dark:bg-red-900/20 w-full">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" /> 注意事项
              </h4>
              <ul className="space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-red-700 dark:text-red-300 flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
} 