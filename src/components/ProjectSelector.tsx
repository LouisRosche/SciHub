import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Clock, Target, Beaker, Leaf, Zap, Droplet, Dna } from 'lucide-react';
import { ProjectTemplate } from '../types/ngss';
import { projectTemplates } from '../data/project-templates';

interface ProjectSelectorProps {
  studentInterests: string[];
  onSelectProject: (projectId: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  studentInterests,
  onSelectProject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectTemplate | null>(null);

  const filteredProjects = projectTemplates.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = !selectedDomain || project.dci.some(dci => dci.includes(selectedDomain));
    return matchesSearch && matchesDomain;
  });

  const domainIcons: Record<string, React.ReactNode> = {
    'PS': <Zap className="w-5 h-5" />,
    'LS': <Leaf className="w-5 h-5" />,
    'ESS': <Droplet className="w-5 h-5" />,
    'ETS': <Beaker className="w-5 h-5" />
  };

  const domainColors: Record<string, string> = {
    'PS': 'bg-science-physics text-white',
    'LS': 'bg-science-biology text-white',
    'ESS': 'bg-science-earth text-white',
    'ETS': 'bg-science-chemistry text-white'
  };

  const getDomainFromDCI = (dci: string): string => {
    if (dci.includes('PS')) return 'PS';
    if (dci.includes('LS')) return 'LS';
    if (dci.includes('ESS')) return 'ESS';
    if (dci.includes('ETS')) return 'ETS';
    return 'PS';
  };

  if (selectedProject) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <button
          onClick={() => setSelectedProject(null)}
          className="text-primary-600 hover:text-primary-700 mb-4"
        >
          ← Back to Projects
        </button>

        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h1>
              <p className="text-gray-600 mt-2">{selectedProject.description}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${domainColors[getDomainFromDCI(selectedProject.dci[0])]}`}>
              {domainIcons[getDomainFromDCI(selectedProject.dci[0])]}
            </div>
          </div>

          {/* Driving Question */}
          <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-6">
            <h3 className="font-semibold text-primary-900 mb-2">Driving Question</h3>
            <p className="text-primary-800 text-lg">{selectedProject.drivingQuestion}</p>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" />
                Duration & Grade
              </h3>
              <p className="text-gray-700">Duration: {selectedProject.duration}</p>
              <p className="text-gray-700">Grade Level: {selectedProject.gradeLevel.join(', ')}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-600" />
                NGSS Standards
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.dci.map(dci => (
                  <span key={dci} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {dci}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Student Choices - PERSONALIZATION */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Dna className="w-5 h-5 text-purple-600" />
              Make It Your Own - You Get to Choose:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedProject.studentChoices.map((choice, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                  <ChevronRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-purple-900">{choice}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Notecard Prompts Preview */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Daily Notecard Prompts (Preview)</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedProject.dailyNotecardPrompts.slice(0, 5).map((prompt, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                  {prompt}
                </div>
              ))}
              {selectedProject.dailyNotecardPrompts.length > 5 && (
                <p className="text-sm text-gray-600 text-center">
                  + {selectedProject.dailyNotecardPrompts.length - 5} more prompts
                </p>
              )}
            </div>
          </div>

          {/* Materials */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Materials You'll Use</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedProject.materials.map((material, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  {material}
                </div>
              ))}
            </div>
          </div>

          {/* Start Project */}
          <div className="flex gap-4">
            <button
              onClick={() => onSelectProject(selectedProject.id)}
              className="flex-1 btn-primary py-4 text-lg"
            >
              Start This Project
            </button>
            <button
              onClick={() => setSelectedProject(null)}
              className="btn-secondary py-4"
            >
              Keep Looking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Science Project</h1>
        <p className="text-gray-600 mt-2">
          Select a project that matches your interests and get started on your learning journey!
        </p>
      </div>

      {/* Recommended Based on Interests */}
      {studentInterests.length > 0 && (
        <div className="card border-2 border-purple-300">
          <h2 className="text-xl font-semibold text-purple-900 mb-3">
            Recommended for You
          </h2>
          <p className="text-sm text-purple-700 mb-4">
            Based on your interests: {studentInterests.join(', ')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTemplates.slice(0, 2).map(project => (
              <div
                key={project.id}
                className="p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                onClick={() => setSelectedProject(project)}
              >
                <h3 className="font-semibold text-purple-900">{project.title}</h3>
                <p className="text-sm text-purple-700 mt-1 line-clamp-2">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDomain(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDomain === null ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              All
            </button>
            {Object.entries(domainIcons).map(([domain, icon]) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedDomain === domain ? domainColors[domain] : 'bg-gray-200 text-gray-700'
                }`}
              >
                {icon}
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => {
          const primaryDomain = getDomainFromDCI(project.dci[0]);
          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="card hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${domainColors[primaryDomain]}`}>
                  {domainIcons[primaryDomain]}
                </div>
                <span className="text-xs text-gray-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {project.duration}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Driving Question:</p>
                <p className="text-sm text-primary-700 italic">"{project.drivingQuestion}"</p>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {project.ccc.slice(0, 2).map(ccc => (
                    <span key={ccc} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {ccc}
                    </span>
                  ))}
                  {project.ccc.length > 2 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{project.ccc.length - 2}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <button className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="card text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
