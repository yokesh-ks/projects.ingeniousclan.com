'use client';

import { useState, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import projectsData from '@/data/projects.json';

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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects: Project[] = projectsData.projects;

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(p => p.category))];
    return ['All', ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Projects by Yokesh
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A curated collection of web apps, tools & experiments
            </p>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>© 2026 Yokesh KS. All rights reserved.</span>
            <span className="hidden md:block">•</span>
            <span className="flex items-center gap-1">
              Made with <span className="text-red-500 animate-pulse">♥</span> by
              <a
                href="https://www.yokesh.in/?utm_source=projects.yokesh.in&utm_medium=website&ref=projects.yokesh.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 ml-1"
              >
                Yokesh
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
