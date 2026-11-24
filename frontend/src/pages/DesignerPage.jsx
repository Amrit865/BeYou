import React, { useState, useEffect } from 'react';
import { Sparkles, Download, RefreshCw, PlusCircle, AlertCircle, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

export default function DesignerPage({ systemConfig, onOpenKeyModal }) {
  // Input States
  const [category, setCategory] = useState('Dresses');
  const [style, setStyle] = useState('Casual');
  const [colorChoice, setColorChoice] = useState('White');
  const [customColor, setCustomColor] = useState('');
  const [fabric, setFabric] = useState('No preference');
  const [description, setDescription] = useState('');

  // Execution States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const categories = systemConfig?.categories || ['Shirts', 'Tops', 'Dresses', 'Jeans', 'Pullovers'];
  const styles = systemConfig?.styles || ['Casual', 'Formal', 'Partywear', 'Minimalist'];
  const colors = systemConfig?.colors || ['White', 'Black', 'Red', 'Blue', 'Pink', 'Beige', 'Green', 'Custom'];
  
  // Fabric options filtered appropriately per garment
  const fabricMap = systemConfig?.fabrics_by_category || {
    Shirts: ['Cotton', 'Linen', 'Silk', 'No preference'],
    Tops: ['Cotton', 'Silk', 'Linen', 'No preference'],
    Dresses: ['Cotton', 'Silk', 'Linen', 'No preference'],
    Jeans: ['Denim', 'No preference'],
    Pullovers: ['Wool', 'Knitted fabric', 'No preference']
  };

  const currentFabrics = fabricMap[category] || ['Cotton', 'Silk', 'Linen', 'No preference'];

  // Reset fabric if not appropriate for newly selected category
  useEffect(() => {
    if (!currentFabrics.includes(fabric)) {
      setFabric('No preference');
    }
  }, [category]);

  const activeColor = colorChoice === 'Custom' ? (customColor.trim() || 'Custom') : colorChoice;

  // Sample prompt loaders
  const loadExample = (exCat, exStyle, exColor, exFabric, exDesc) => {
    setCategory(exCat);
    setStyle(exStyle);
    setColorChoice(exColor);
    setFabric(exFabric);
    setDescription(exDesc);
  };

  const handleGenerate = async (generateNew = true) => {
    setError(null);

    // Validation
    if (!category) {
      setError('Please select a clothing category.');
      return;
    }
    if (!style) {
      setError('Please select a fashion style.');
      return;
    }
    if (colorChoice === 'Custom' && !customColor.trim()) {
      setError('Please enter your custom colour specification.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        category,
        style,
        colour: activeColor,
        fabric: fabric === 'No preference' ? '' : fabric,
        description: description.trim(),
        generate_new: generateNew
      };

      const res = await api.generateDesign(payload);

      if (!res.success) {
        setError(res.error_message || 'Image generation could not be completed.');
        setResult(null);
      } else {
        setResult(res);
      }
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Error communicating with generation service.';
      setError(msg);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setResult(null);
    setError(null);
    setDescription('');
    setColorChoice('White');
    setCustomColor('');
    setFabric('No preference');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left border-b border-atelier-beige pb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-atelier-accent">
          Core Module 01
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-atelier-charcoal mt-1">
          AI Fashion Designer
        </h1>
        <p className="text-sm text-atelier-taupe mt-1">
          Synthesize bespoke women's garments using OpenAI's image generation engine with custom prompt architecture.
        </p>
      </div>

      {/* Main Grid: Form Left, Result Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-atelier-beige shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-atelier-charcoal border-b border-atelier-cream pb-3">
              Design Specifications
            </h2>

            {/* A. Clothing Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-atelier-charcoal mb-2">
                Clothing Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-atelier-sand bg-atelier-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-atelier-charcoal text-sm font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-atelier-taupe mt-1">
                Strictly limited to 5 women's garment categories.
              </p>
            </div>

            {/* B. Fashion Style */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-atelier-charcoal mb-2">
                Fashion Style <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {styles.map((s) => {
                  const isSelected = style === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        isSelected
                          ? 'bg-atelier-charcoal text-white border-atelier-charcoal shadow-sm'
                          : 'bg-atelier-cream/50 border-atelier-sand text-atelier-charcoal hover:bg-atelier-cream'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* C. Colour Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-atelier-charcoal mb-2">
                Colour <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {colors.map((c) => {
                  const isSelected = colorChoice === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColorChoice(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? 'bg-atelier-charcoal text-white border-atelier-charcoal'
                          : 'bg-white border-atelier-sand text-atelier-charcoal hover:bg-atelier-cream'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
              {colorChoice === 'Custom' && (
                <input
                  type="text"
                  placeholder="e.g., Midnight Navy with Champagne Accents"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-atelier-sand bg-white text-xs font-medium mt-1 focus:ring-1 focus:ring-atelier-charcoal focus:outline-none"
                />
              )}
            </div>

            {/* D. Fabric Preference */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-atelier-charcoal mb-2">
                Fabric Preference <span className="text-atelier-taupe font-normal lowercase">(optional)</span>
              </label>
              <select
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-atelier-sand bg-atelier-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-atelier-charcoal text-sm"
              >
                {currentFabrics.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-atelier-taupe mt-1">
                Filtered strictly for {category}.
              </p>
            </div>

            {/* E. Custom Design Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-atelier-charcoal">
                  Custom Description
                </label>
                <span className="text-[10px] text-atelier-taupe uppercase tracking-wider">
                  High Priority
                </span>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Create an elegant white women's formal shirt with a slim collar, full sleeves, pearl buttons and a clean professional appearance."
                className="w-full px-4 py-3 rounded-2xl border border-atelier-sand bg-atelier-ivory/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-atelier-charcoal text-xs leading-relaxed"
              />
            </div>

            {/* F. Generate Button */}
            <button
              onClick={() => handleGenerate(true)}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-atelier-charcoal text-white text-xs font-semibold uppercase tracking-widest hover:bg-atelier-accent disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Design...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-atelier-sand" />
                  <span>Generate Design</span>
                </>
              )}
            </button>

            {/* Quick Inspiration Loader */}
            <div className="pt-2 border-t border-atelier-cream">
              <span className="text-[11px] text-atelier-taupe block mb-2 font-medium">
                Try Pre-Configured Samples:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => loadExample('Shirts', 'Formal', 'White', 'Cotton', 'Full sleeves, elegant pointed collar, pearl buttons and fitted silhouette')}
                  className="px-2.5 py-1 rounded-md bg-atelier-cream/80 text-[11px] text-atelier-charcoal hover:bg-atelier-sand/50"
                >
                  Formal Shirt
                </button>
                <button
                  type="button"
                  onClick={() => loadExample('Dresses', 'Partywear', 'Black', 'Silk', 'Modern A-line partywear dress with subtle sweetheart neckline and delicate waist detailing')}
                  className="px-2.5 py-1 rounded-md bg-atelier-cream/80 text-[11px] text-atelier-charcoal hover:bg-atelier-sand/50"
                >
                  Partywear Dress
                </button>
                <button
                  type="button"
                  onClick={() => loadExample('Pullovers', 'Minimalist', 'Beige', 'Wool', 'Clean crewneck pullover in fine-gauge knit with ribbed cuffs and relaxed fit')}
                  className="px-2.5 py-1 rounded-md bg-atelier-cream/80 text-[11px] text-atelier-charcoal hover:bg-atelier-sand/50"
                >
                  Minimalist Pullover
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results Area (7 cols) */}
        <div className="lg:col-span-7">
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-rose-800 mb-6 animate-fadeIn">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Generation Error</h4>
                  <p className="text-xs leading-relaxed">{error}</p>
                  {error.toLowerCase().includes('api key') && (
                    <button
                      onClick={onOpenKeyModal}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-medium hover:bg-rose-700 transition-colors mt-2"
                    >
                      <span>Configure OpenAI Key</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-3xl p-12 border border-atelier-beige shadow-sm text-center flex flex-col items-center justify-center min-h-[460px] animate-pulse">
              <div className="w-16 h-16 rounded-full bg-atelier-cream flex items-center justify-center text-atelier-charcoal mb-4">
                <RefreshCw className="w-8 h-8 animate-spin text-atelier-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-atelier-charcoal">
                Synthesizing Fashion Garment
              </h3>
              <p className="text-xs text-atelier-taupe max-w-sm mt-2 leading-relaxed">
                Applying women's fashion constraints, texture weave rendering, and studio lookbook photography parameters via OpenAI Image API...
              </p>
            </div>
          )}

          {!loading && !result && !error && (
            <div className="bg-white/60 rounded-3xl p-12 border border-dashed border-atelier-sand text-center flex flex-col items-center justify-center min-h-[460px]">
              <div className="w-16 h-16 rounded-full bg-atelier-cream flex items-center justify-center text-atelier-taupe mb-4">
                <Sparkles className="w-7 h-7 text-atelier-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-atelier-charcoal">
                Studio Canvas Ready
              </h3>
              <p className="text-xs text-atelier-taupe max-w-md mt-2 leading-relaxed">
                Configure your desired clothing category, style, and design requirements on the left, then click <strong>Generate Design</strong> to produce an editorial-grade fashion concept plate.
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-atelier-beige shadow-sm space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-atelier-cream pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-atelier-accent font-semibold">
                    {result.category} • {result.style}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-atelier-charcoal">
                    {result.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={result.download_url || `/api/designs/download/${result.id}`}
                    download
                    className="flex items-center space-x-1.5 px-4 py-2 bg-atelier-charcoal text-white rounded-xl text-xs font-semibold hover:bg-atelier-accent transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Image</span>
                  </a>
                </div>
              </div>

              {/* Generated Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden bg-atelier-cream/50 border border-atelier-sand/60 group">
                <img
                  src={result.image_url}
                  alt={result.title}
                  className="w-full h-auto max-h-[540px] object-contain mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-atelier-ivory p-4 rounded-2xl border border-atelier-sand/60">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block">
                    Category
                  </span>
                  <span className="text-xs font-semibold text-atelier-charcoal">
                    {result.category}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block">
                    Style
                  </span>
                  <span className="text-xs font-semibold text-atelier-charcoal">
                    {result.style}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block">
                    Colour
                  </span>
                  <span className="text-xs font-semibold text-atelier-charcoal">
                    {result.colour}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block">
                    Fabric
                  </span>
                  <span className="text-xs font-semibold text-atelier-charcoal">
                    {result.fabric || 'No preference'}
                  </span>
                </div>
              </div>

              {result.description && (
                <div className="p-4 bg-atelier-cream/40 rounded-2xl border border-atelier-sand/40">
                  <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block mb-1">
                    Custom User Brief
                  </span>
                  <p className="text-xs text-atelier-charcoal italic">
                    "{result.description}"
                  </p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-atelier-cream">
                <button
                  type="button"
                  onClick={() => handleGenerate(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-atelier-sand text-xs font-semibold text-atelier-charcoal hover:bg-atelier-cream transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Generate Another Variation</span>
                </button>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-atelier-cream text-xs font-semibold text-atelier-charcoal hover:bg-atelier-beige transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Create New Design</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
