'use client';

import { ExternalLink, Package, BookOpen, FileText, MapPin, Code } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  status: string;
  category: string;
  tags: string[];
  icon: string;
  gradient: string;
  favicon_url?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIconComponent = (iconName: string) => {
    const iconKey = iconName.replace('lucide:', '');
    switch (iconKey) {
      case 'package':
        return Package;
      case 'book-open':
        return BookOpen;
      case 'file-text':
        return FileText;
      case 'map-pin':
        return MapPin;
      case 'code':
        return Code;
      default:
        return Code;
    }
  };

  const IconComponent = getIconComponent(project.icon);

  return (
    <div
      className={`relative group bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200 dark:border-gray-700 ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">

          {project.favicon_url ? (
            <Image
              src={project.favicon_url}
              alt={`${project.title} favicon`}
              width={48}
              height={48}
              className="rounded"
              onError={(e) => {
                // Fallback to icon if favicon fails to load
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                const fallbackIcon = document.createElement('div');
                fallbackIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16,18 22,12 16,6"></polyline><polyline points="8,6 2,12 8,18"></polyline></svg>';
                target.parentElement?.appendChild(fallbackIcon);
              }}
            />
          ) : (
            <div className={`p-3 rounded-lg bg-gradient-to-br ${project.gradient} text-white flex items-center justify-center`}>

              <IconComponent size={24} />
            </div>
          )}

          <span className={`px-3 py-1 text-xs font-medium rounded-full ${project.status === 'live'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
          {project.title}
        </h3>

        {/* Category */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {project.category}
        </p>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Visit Project
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
