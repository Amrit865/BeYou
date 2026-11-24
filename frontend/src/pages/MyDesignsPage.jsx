import React, { useState, useEffect } from 'react';
import { Download, Trash2, Sparkles, ScanEye, RefreshCw, AlertCircle, Calendar } from 'lucide-react';
import { api } from '../services/api';

export default function MyDesignsPage({ setActiveTab }) {
  const [activeTabSub, setActiveTabSub] = useState('designs'); // 'designs' or 'analyses'
  const [designs, setDesigns] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [savedDesigns, savedAnalyses] = await Promise.all([
        api.getSavedDesigns(),
        api.getAnalysisHistory(),
      ]);
      setDesigns(savedDesigns);
      setAnalyses(savedAnalyses);
    } catch (err) {
      setError('Failed to load saved items from local storage.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteDesign = async (id) => {
    if (!window.confirm('Are you sure you want to delete this design?')) return;
    try {
      await api.deleteDesign(id);
      setDesigns(designs.filter((d) => d.id !== id));
    } catch (err) {
      alert('Failed to delete design.');
    }
  };

  const handleDeleteAnalysis = async (id) => {
    if (!window.confirm('Are you sure you want to delete this analysis record?')) return;
    try {
      await api.deleteAnalysis(id);
      setAnalyses(analyses.filter((a) => a.id !== id));
    } catch (err) {
      alert('Failed to delete analysis record.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-atelier-beige pb-6 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-atelier-accent">
            Permanent Studio Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-atelier-charcoal mt-1">
            My Designs & Analyses
          </h1>
          <p className="text-sm text-atelier-taupe mt-1">
            Review, download, and manage your generated fashion designs and visual analysis reports.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-atelier-cream/80 p-1 rounded-2xl border border-atelier-sand/60">
          <button
            onClick={() => setActiveTabSub('designs')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTabSub === 'designs'
                ? 'bg-atelier-charcoal text-white shadow-sm'
                : 'text-atelier-charcoal/70 hover:text-atelier-charcoal'
            }`}
          >
            Generated Designs ({designs.length})
          </button>
          <button
            onClick={() => setActiveTabSub('analyses')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTabSub === 'analyses'
                ? 'bg-atelier-charcoal text-white shadow-sm'
                : 'text-atelier-charcoal/70 hover:text-atelier-charcoal'
            }`}
          >
            Image Analyses ({analyses.length})
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-20">
          <RefreshCw className="w-8 h-8 animate-spin text-atelier-accent mx-auto mb-3" />
          <p className="text-sm text-atelier-taupe">Loading saved designs...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 text-rose-800 rounded-2xl text-xs mb-6 border border-rose-200">
          {error}
        </div>
      )}

      {/* Generated Designs View */}
      {!loading && activeTabSub === 'designs' && (
        <>
          {designs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-dashed border-atelier-sand text-center max-w-md mx-auto my-12">
              <Sparkles className="w-10 h-10 text-atelier-taupe/40 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
                No Designs Generated Yet
              </h3>
              <p className="text-xs text-atelier-taupe mt-2 leading-relaxed">
                Use the AI Fashion Designer to synthesize realistic women's clothing designs. Saved creations appear here.
              </p>
              <button
                onClick={() => setActiveTab('designer')}
                className="mt-6 px-6 py-2.5 rounded-full bg-atelier-charcoal text-white text-xs font-semibold hover:bg-atelier-accent transition-colors"
              >
                Go to Fashion Designer
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className="bg-white rounded-3xl overflow-hidden border border-atelier-beige shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-atelier-cream/40 overflow-hidden">
                    <img
                      src={design.image_url}
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-atelier-charcoal/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                      {design.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-atelier-charcoal line-clamp-1">
                        {design.title}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="px-2 py-0.5 rounded bg-atelier-ivory text-[10px] text-atelier-charcoal border border-atelier-sand">
                          Style: {design.style}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-atelier-ivory text-[10px] text-atelier-charcoal border border-atelier-sand">
                          Colour: {design.colour}
                        </span>
                        {design.fabric && (
                          <span className="px-2 py-0.5 rounded bg-atelier-ivory text-[10px] text-atelier-charcoal border border-atelier-sand">
                            Fabric: {design.fabric}
                          </span>
                        )}
                      </div>
                      {design.description && (
                        <p className="text-xs text-atelier-taupe mt-2.5 line-clamp-2 italic">
                          "{design.description}"
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-atelier-cream flex items-center justify-between">
                      <a
                        href={api.getDownloadUrl(design.id)}
                        download
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-atelier-cream hover:bg-atelier-beige text-atelier-charcoal rounded-xl text-xs font-semibold transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                      <button
                        onClick={() => handleDeleteDesign(design.id)}
                        className="p-2 text-atelier-taupe hover:text-rose-600 transition-colors"
                        title="Delete Design"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Image Analyses View */}
      {!loading && activeTabSub === 'analyses' && (
        <>
          {analyses.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-dashed border-atelier-sand text-center max-w-md mx-auto my-12">
              <ScanEye className="w-10 h-10 text-atelier-taupe/40 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
                No Analyses Performed Yet
              </h3>
              <p className="text-xs text-atelier-taupe mt-2 leading-relaxed">
                Upload garment images in the Fashion Image Analysis module. Detailed visual reports are stored here.
              </p>
              <button
                onClick={() => setActiveTab('analysis')}
                className="mt-6 px-6 py-2.5 rounded-full bg-atelier-charcoal text-white text-xs font-semibold hover:bg-atelier-accent transition-colors"
              >
                Go to Image Analysis
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="bg-white rounded-3xl overflow-hidden border border-atelier-beige shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-atelier-cream/40 overflow-hidden">
                    <img
                      src={analysis.image_url}
                      alt={analysis.original_filename}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-atelier-charcoal/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                      {analysis.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-atelier-charcoal line-clamp-1">
                        {analysis.original_filename}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="px-2 py-0.5 rounded bg-atelier-ivory text-[10px] text-atelier-charcoal border border-atelier-sand">
                          Style: {analysis.fashion_style}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-atelier-ivory text-[10px] text-atelier-charcoal border border-atelier-sand">
                          Colour: {analysis.primary_colour}
                        </span>
                      </div>
                      <p className="text-xs text-atelier-taupe mt-2.5 line-clamp-3 leading-relaxed">
                        {analysis.overall_description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-atelier-cream flex items-center justify-between">
                      <span className="text-[10px] text-atelier-taupe flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(analysis.created_at).toLocaleDateString()}</span>
                      </span>
                      <button
                        onClick={() => handleDeleteAnalysis(analysis.id)}
                        className="p-2 text-atelier-taupe hover:text-rose-600 transition-colors"
                        title="Delete Analysis"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
