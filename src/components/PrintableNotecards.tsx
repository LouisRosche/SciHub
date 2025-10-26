import React from 'react';
import { Printer, Download } from 'lucide-react';

const PrintableNotecards: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Controls - Hidden when printing */}
      <div className="no-print mb-6 card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Printable Notecard Templates</h1>
            <p className="text-gray-600 mt-1">
              Print these templates for students to create physical notecards
            </p>
          </div>
          <button onClick={handlePrint} className="btn-primary flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print Templates
          </button>
        </div>
      </div>

      {/* Print Instructions - Hidden when printing */}
      <div className="no-print card mb-6 bg-blue-50 border border-blue-200">
        <h2 className="font-semibold text-blue-900 mb-3">Printing Instructions</h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Print on cardstock (67-110 lb) for durability</li>
          <li>• Use landscape orientation for best results</li>
          <li>• Cut along the dotted lines to create individual 4x6 inch notecards</li>
          <li>• Each sheet contains 2 notecards (front and back sides)</li>
          <li>• Recommended: Print enough for one week at a time (5 cards per student)</li>
        </ul>
      </div>

      {/* NGSS Quick Reference - Hidden when printing */}
      <div className="no-print grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Front Side Ideas (Blank)</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Observations and sketches</li>
            <li>• Diagrams and models</li>
            <li>• Data tables and graphs</li>
            <li>• Visual representations</li>
            <li>• Photos or printed images</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Back Side Ideas (Lined)</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Explanations with evidence</li>
            <li>• Claims and reasoning</li>
            <li>• Reflections and questions</li>
            <li>• Connections to concepts</li>
            <li>• Written analysis</li>
          </ul>
        </div>
      </div>

      {/* Printable Templates */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .page-break {
            page-break-after: always;
          }
          @page {
            size: letter landscape;
            margin: 0.5in;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Template 1: Basic Blank & Lined */}
      <div className="page-break">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Front Side - Blank */}
          <div className="border-4 border-dashed border-gray-400 p-6 bg-white" style={{ height: '4in', width: '6in' }}>
            <div className="border-b-2 border-gray-300 pb-2 mb-4">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <strong>Name:</strong> _____________________
                </div>
                <div>
                  <strong>Date:</strong> ___________
                </div>
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm mb-2">
              FRONT SIDE - Visual / Drawing / Diagram
            </div>
            <div className="h-full border-2 border-gray-200 rounded bg-white">
              {/* Blank space for drawing */}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              NGSS: <span className="border-b border-gray-400 inline-block w-40"></span>
            </div>
          </div>

          {/* Back Side - Lined */}
          <div className="border-4 border-dashed border-gray-400 p-6 bg-white" style={{ height: '4in', width: '6in' }}>
            <div className="border-b-2 border-gray-300 pb-2 mb-4">
              <div className="text-center text-sm font-semibold">
                BACK SIDE - Written Explanation
              </div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-b border-gray-300" style={{ height: '0.375in' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Template 2: NGSS Structured */}
      <div className="page-break">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Front Side - With Prompts */}
          <div className="border-4 border-dashed border-gray-400 p-6 bg-white" style={{ height: '4in', width: '6in' }}>
            <div className="border-b-2 border-gray-300 pb-2 mb-3">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <strong>Name:</strong> _____________________
                </div>
                <div>
                  <strong>Date:</strong> ___________
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-700 mb-1">Today's Question/Observation:</div>
              <div className="border-b border-gray-400"></div>
            </div>
            <div className="text-xs text-gray-600 mb-2">
              <strong>Draw/Sketch:</strong> (What did you observe? What model can you create?)
            </div>
            <div className="h-48 border-2 border-gray-200 rounded bg-white">
              {/* Drawing space */}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <strong>CCC:</strong> ☐ Patterns ☐ Cause-Effect ☐ Systems
              </div>
              <div>
                <strong>SEP:</strong> ☐ Models ☐ Data ☐ Explain
              </div>
            </div>
          </div>

          {/* Back Side - Guided */}
          <div className="border-4 border-dashed border-gray-400 p-6 bg-white" style={{ height: '4in', width: '6in' }}>
            <div className="border-b-2 border-gray-300 pb-2 mb-3">
              <div className="text-center text-sm font-semibold">
                Written Explanation
              </div>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <strong>What I learned today:</strong>
                <div className="border-b border-gray-300 mt-1"></div>
                <div className="border-b border-gray-300 mt-2"></div>
              </div>
              <div>
                <strong>Why this matters / How it works:</strong>
                <div className="border-b border-gray-300 mt-1"></div>
                <div className="border-b border-gray-300 mt-2"></div>
                <div className="border-b border-gray-300 mt-2"></div>
              </div>
              <div>
                <strong>Evidence / Data I used:</strong>
                <div className="border-b border-gray-300 mt-1"></div>
                <div className="border-b border-gray-300 mt-2"></div>
              </div>
              <div>
                <strong>Questions I still have:</strong>
                <div className="border-b border-gray-300 mt-1"></div>
                <div className="border-b border-gray-300 mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template 3: Data Collection Focus */}
      <div className="page-break">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Front Side - Data Table */}
          <div className="border-4 border-dashed border-gray-400 p-6 bg-white" style={{ height: '4in', width: '6in' }}>
            <div className="border-b-2 border-gray-300 pb-2 mb-3">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <strong>Name:</strong> _____________________
                </div>
                <div>
                  <strong>Date:</strong> ___________
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">Investigation/Experiment:</div>
              <div className="border-b border-gray-400 mb-3"></div>
              <div className="text-xs font-semibold text-gray-700 mb-2">Data Table / Graph / Diagram:</div>
            </div>
            <div className="border-2 border-gray-400">
              <div className="grid grid-cols-3 gap-0 text-xs text-center">
                <div className="border-r border-b border-gray-400 p-1 bg-gray-100 font-semibold">Trial</div>
                <div className="border-r border-b border-gray-400 p-1 bg-gray-100 font-semibold">Measurement</div>
                <div className="border-b border-gray-400 p-1 bg-gray-100 font-semibold">Notes</div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="border-r border-b border-gray-400 p-2"></div>
                    <div className="border-r border-b border-gray-400 p-2"></div>
                    <div className="border-b border-gray-400 p-2"></div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Back Side - Analysis */}
          <div className="border-4 border-dashed border-gray-400 p-6 bg-white" style={{ height: '4in', width: '6in' }}>
            <div className="border-b-2 border-gray-300 pb-2 mb-3">
              <div className="text-center text-sm font-semibold">
                Data Analysis & Explanation
              </div>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <strong>Pattern I noticed in the data:</strong>
                <div className="border-b border-gray-300 mt-1"></div>
                <div className="border-b border-gray-300 mt-2"></div>
              </div>
              <div>
                <strong>What caused these results:</strong>
                <div className="border-b border-gray-300 mt-1"></div>
                <div className="border-b border-gray-300 mt-2"></div>
              </div>
              <div>
                <strong>My claim (what I conclude):</strong>
                <div className="border-b border-gray-300 mt-1"></div>
                <div className="border-b border-gray-300 mt-2"></div>
              </div>
              <div>
                <strong>Evidence that supports my claim:</strong>
                <div className="border-b border-gray-300 mt-1"></div>
                <div className="border-b border-gray-300 mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableNotecards;
