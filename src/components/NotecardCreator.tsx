import React, { useState } from 'react';
import { Camera, Save, Sparkles, BookOpen, Lightbulb, FlaskConical } from 'lucide-react';
import { DailyNotecard, NotecardPrompt, CCCType, SEPType } from '../types/ngss';
import { crosscuttingConcepts, scienceEngineeringPractices } from '../data/ngss-standards';

interface NotecardCreatorProps {
  currentProject?: string;
  suggestedPrompt?: NotecardPrompt;
  onSave: (notecard: Partial<DailyNotecard>) => void;
  onDraft: (notecard: Partial<DailyNotecard>) => void;
}

const NotecardCreator: React.FC<NotecardCreatorProps> = ({
  currentProject,
  suggestedPrompt,
  onSave,
  onDraft
}) => {
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');
  const [frontContent, setFrontContent] = useState('');
  const [backContent, setBackContent] = useState('');
  const [selectedCCC, setSelectedCCC] = useState<CCCType[]>([]);
  const [selectedSEP, setSelectedSEP] = useState<SEPType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selfAssessment, setSelfAssessment] = useState('');
  const [showScaffold, setShowScaffold] = useState(false);

  const handleSave = (status: 'draft' | 'submitted') => {
    const notecard: Partial<DailyNotecard> = {
      date: new Date(),
      projectId: currentProject,
      frontSide: {
        type: 'text',
        content: frontContent
      },
      backSide: {
        type: 'text',
        content: backContent
      },
      ccc: selectedCCC,
      sep: selectedSEP,
      tags,
      selfAssessment,
      status,
      prompt: suggestedPrompt?.text,
      reviewCount: 0,
      masteryLevel: 0
    };

    if (status === 'submitted') {
      onSave(notecard);
    } else {
      onDraft(notecard);
    }
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const toggleCCC = (ccc: CCCType) => {
    setSelectedCCC(prev =>
      prev.includes(ccc) ? prev.filter(c => c !== ccc) : [...prev, ccc]
    );
  };

  const toggleSEP = (sep: SEPType) => {
    setSelectedSEP(prev =>
      prev.includes(sep) ? prev.filter(s => s !== sep) : [...prev, sep]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Daily Notecard</h2>
            <p className="text-sm text-gray-600 mt-1">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <button
            onClick={() => setShowScaffold(!showScaffold)}
            className="btn-secondary flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            {showScaffold ? 'Hide' : 'Show'} Help
          </button>
        </div>

        {/* Today's Prompt */}
        {suggestedPrompt && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary-900">Today's Prompt</h3>
                <p className="text-primary-800 mt-1">{suggestedPrompt.text}</p>
              </div>
            </div>
          </div>
        )}

        {/* Scaffold Support */}
        {showScaffold && suggestedPrompt?.scaffold && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 space-y-3">
            <h4 className="font-semibold text-yellow-900">Helpful Hints</h4>

            {suggestedPrompt.scaffold.sentence_starters && (
              <div>
                <p className="text-sm font-medium text-yellow-800">Sentence Starters:</p>
                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                  {suggestedPrompt.scaffold.sentence_starters.map((starter, idx) => (
                    <li key={idx}>• {starter}</li>
                  ))}
                </ul>
              </div>
            )}

            {suggestedPrompt.scaffold.thinking_prompts && (
              <div>
                <p className="text-sm font-medium text-yellow-800">Think About:</p>
                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                  {suggestedPrompt.scaffold.thinking_prompts.map((prompt, idx) => (
                    <li key={idx}>• {prompt}</li>
                  ))}
                </ul>
              </div>
            )}

            {suggestedPrompt.scaffold.visual_suggestions && (
              <div>
                <p className="text-sm font-medium text-yellow-800">Visual Ideas:</p>
                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                  {suggestedPrompt.scaffold.visual_suggestions.map((suggestion, idx) => (
                    <li key={idx}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notecard Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Front Side */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Front Side (Visual)</h3>
            <button className="text-primary-600 hover:text-primary-700">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="notecard min-h-[300px] bg-white">
            <textarea
              value={frontContent}
              onChange={(e) => setFrontContent(e.target.value)}
              placeholder="Draw, sketch, create diagrams, paste images, or describe what you observed..."
              className="w-full h-full min-h-[280px] p-4 resize-none border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Use the blank side for: diagrams, sketches, models, data tables, graphs, or photos
          </p>
        </div>

        {/* Back Side */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Back Side (Written)</h3>
            <button className="text-primary-600 hover:text-primary-700">
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
          <div className="notecard notecard-lined min-h-[300px] bg-white">
            <textarea
              value={backContent}
              onChange={(e) => setBackContent(e.target.value)}
              placeholder="Write your explanation, observations, reasoning, or answer to the prompt..."
              className="w-full h-full min-h-[280px] p-4 resize-none border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg bg-transparent"
              style={{ lineHeight: '1.5rem' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Use the lined side for: explanations, claims with evidence, reflections, or answers
          </p>
        </div>
      </div>

      {/* NGSS Alignment */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-primary-600" />
          NGSS Alignment - What science did you use?
        </h3>

        {/* Crosscutting Concepts */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Crosscutting Concepts (CCC)</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(crosscuttingConcepts).map(([key, ccc]) => (
              <button
                key={key}
                onClick={() => toggleCCC(key as CCCType)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCCC.includes(key as CCCType)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={ccc.studentFriendly}
              >
                {ccc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Science & Engineering Practices */}
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Science & Engineering Practices (SEP)</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(scienceEngineeringPractices).map(([key, sep]) => (
              <button
                key={key}
                onClick={() => toggleSEP(key as SEPType)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedSEP.includes(key as SEPType)
                    ? 'bg-science-biology text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={sep.studentFriendly}
              >
                {sep.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tags and Self-Assessment */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tags */}
          <div>
            <label className="block font-medium text-gray-800 mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add a tag..."
                className="input-field flex-1"
              />
              <button onClick={addTag} className="btn-secondary">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Self-Assessment */}
          <div>
            <label className="block font-medium text-gray-800 mb-2">Self-Assessment</label>
            <textarea
              value={selfAssessment}
              onChange={(e) => setSelfAssessment(e.target.value)}
              placeholder="How well do you understand this? What questions do you still have?"
              className="input-field h-24 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleSave('draft')}
          className="btn-secondary flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Draft
        </button>

        <button
          onClick={() => handleSave('submitted')}
          className="btn-primary flex items-center gap-2 px-6 py-3 text-lg"
          disabled={!frontContent && !backContent}
        >
          <Save className="w-5 h-5" />
          Submit Today's Notecard
        </button>
      </div>
    </div>
  );
};

export default NotecardCreator;
