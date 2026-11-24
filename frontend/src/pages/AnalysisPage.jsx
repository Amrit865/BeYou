import React, { useState, useRef } from 'react';
import { 
  Upload, Image as ImageIcon, X, ScanEye, RefreshCw, AlertCircle, 
  CheckCircle2, ShieldCheck, Tag, Sparkles, Palette, Layers, 
  Shirt, Compass, Lightbulb, ChevronRight, BookmarkCheck, ExternalLink
} from 'lucide-react';
import { api } from '../services/api';

export default function AnalysisPage({ onOpenKeyModal }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    setError(null);
    setAnalysisResult(null);

    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError("Unsupported file format. Please upload a JPG, JPEG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds the 10 MB limit.");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select or upload an image first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.analyzeImage(selectedFile);
      if (!res.success) {
        setError(res.error_message || 'Image analysis could not be completed.');
        setAnalysisResult(null);
      } else {
        setAnalysisResult(res);
      }
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Error communicating with analysis service.';
      setError(msg);
      setAnalysisResult(null);
    } finally {
      setLoading(false);
    }
  };

  const renderDetailItem = (label, val) => {
    if (!val || val === 'N/A' || val === 'None' || val === 'none') return null;
    return (
      <div className="flex items-start justify-between py-2 border-b border-atelier-sand/30 last:border-0 text-xs">
        <span className="text-atelier-taupe font-medium">{label}:</span>
        <span className="text-atelier-charcoal font-semibold text-right max-w-[65%]">{val}</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left border-b border-atelier-beige pb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-atelier-accent">
          Enhanced Vision Intelligence
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-atelier-charcoal mt-1">
          AI Fashion Image Analysis
        </h1>
        <p className="text-sm text-atelier-taupe mt-1">
          8-Feature Multimodal Vision Suite: Clothing Detection, Fabric Texture, Palette & Pattern, Design Details, Style Recognition, Outfit Recommendations, Similar Designs, and Tailoring Enhancements.
        </p>
      </div>

      {/* Main Grid: Upload & Controls Left (4 cols), 8-Feature Report Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-atelier-beige shadow-sm space-y-6 sticky top-28">
            <h2 className="font-serif text-xl font-bold text-atelier-charcoal border-b border-atelier-cream pb-3">
              Image Input
            </h2>

            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files[0])}
              accept=".jpg,.jpeg,.png,.webp"
              className="hidden"
            />

            {!previewUrl ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[260px] ${
                  dragActive
                    ? 'border-atelier-charcoal bg-atelier-cream'
                    : 'border-atelier-sand hover:border-atelier-taupe bg-atelier-ivory/50'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-atelier-cream flex items-center justify-center text-atelier-charcoal mb-4 shadow-sm">
                  <Upload className="w-6 h-6 text-atelier-accent" />
                </div>
                <p className="text-sm font-semibold text-atelier-charcoal">
                  Click to browse or drag & drop
                </p>
                <p className="text-xs text-atelier-taupe mt-1">
                  JPG, JPEG, PNG, WEBP (Max 10 MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-atelier-cream border border-atelier-sand group">
                  <img
                    src={previewUrl}
                    alt="Upload preview"
                    className="w-full max-h-[320px] object-contain mx-auto"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 p-2 bg-atelier-charcoal/80 text-white rounded-full hover:bg-atelier-charcoal transition-colors shadow-md"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-atelier-taupe px-1">
                  <span className="truncate max-w-[200px] font-medium text-atelier-charcoal">
                    {selectedFile?.name}
                  </span>
                  <span>{(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAnalyze}
                disabled={loading || !selectedFile}
                className="w-full py-4 rounded-2xl bg-atelier-charcoal text-white text-xs font-semibold uppercase tracking-widest hover:bg-atelier-accent disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Extracting 8 Features...</span>
                  </>
                ) : (
                  <>
                    <ScanEye className="w-4 h-4 text-atelier-sand" />
                    <span>Analyse All 8 Features</span>
                  </>
                )}
              </button>

              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-atelier-taupe hover:text-atelier-charcoal transition-colors"
                >
                  Choose Different Image
                </button>
              )}
            </div>

            {/* Features Checklist */}
            <div className="p-4 bg-atelier-cream/60 rounded-2xl border border-atelier-sand/60 text-xs space-y-2">
              <span className="font-semibold text-atelier-charcoal block mb-1">
                8 Integrated Vision Features:
              </span>
              <ul className="grid grid-cols-2 gap-1.5 text-[11px] text-atelier-taupe">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Garment Detection</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Fabric & Texture</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Palette & Pattern</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Neckline & Sleeves</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Style Recognition</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Outfit Recommender</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Similar Designs</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Design Suggestions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: 8-Feature Report (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-rose-800 animate-fadeIn">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Analysis Notice</h4>
                  <p className="text-xs leading-relaxed">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-3xl p-12 border border-atelier-beige shadow-sm text-center flex flex-col items-center justify-center min-h-[520px] animate-pulse">
              <div className="w-16 h-16 rounded-full bg-atelier-cream flex items-center justify-center text-atelier-charcoal mb-4">
                <RefreshCw className="w-8 h-8 animate-spin text-atelier-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-atelier-charcoal">
                Multimodal Vision Processing
              </h3>
              <p className="text-xs text-atelier-taupe max-w-md mt-2 leading-relaxed">
                Extracting clothing detection vectors, color quantization harmonies, weave tactile patterns, structural collar/sleeve geometry, and generating outfit pairings...
              </p>
            </div>
          )}

          {!loading && !analysisResult && !error && (
            <div className="bg-white/60 rounded-3xl p-12 border border-dashed border-atelier-sand text-center flex flex-col items-center justify-center min-h-[520px]">
              <div className="w-16 h-16 rounded-full bg-atelier-cream flex items-center justify-center text-atelier-taupe mb-4">
                <ScanEye className="w-8 h-8 text-atelier-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-atelier-charcoal">
                Awaiting Fashion Image
              </h3>
              <p className="text-xs text-atelier-taupe max-w-md mt-2 leading-relaxed">
                Upload any women's clothing photograph on the left and click <strong>Analyse All 8 Features</strong> to generate a complete visual report.
              </p>
            </div>
          )}

          {!loading && analysisResult && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Hero Card: Feature 1 (Classification) & Feature 5 (Style) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-atelier-beige shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-atelier-cream pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-atelier-accent font-semibold">
                      Feature 01 & 05 • Detection & Style Recognition
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-atelier-charcoal mt-0.5">
                      {analysisResult.style_recognition?.style} {analysisResult.category}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {analysisResult.category} ({analysisResult.detection_confidence})
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-atelier-cream text-atelier-charcoal border border-atelier-sand">
                      {analysisResult.style_recognition?.style} Style
                    </span>
                  </div>
                </div>

                {/* Overall Editorial Summary */}
                <div className="p-4 bg-atelier-ivory rounded-2xl border border-atelier-sand/60">
                  <p className="text-xs text-atelier-charcoal font-serif text-base italic leading-relaxed">
                    "{analysisResult.overall_description}"
                  </p>
                </div>

                {/* Occasion Suitability Tags */}
                {analysisResult.style_recognition?.occasion_suitability?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] text-atelier-taupe font-medium">Ideal Occasions:</span>
                    {analysisResult.style_recognition.occasion_suitability.map((occ, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-atelier-cream/80 text-[11px] text-atelier-charcoal border border-atelier-sand/50">
                        {occ}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid 2: Feature 3 (Colour & Pattern) & Feature 2 (Fabric & Texture) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature 3: Colour & Pattern Analysis */}
                <div className="bg-white rounded-3xl p-6 border border-atelier-beige shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-atelier-cream pb-3">
                    <Palette className="w-5 h-5 text-atelier-accent" />
                    <h3 className="font-serif text-lg font-bold text-atelier-charcoal">
                      3. Colour & Pattern Analysis
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block mb-1.5 font-semibold">
                        Extracted Palette & Swatches
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.colour_pattern?.palette_swatches?.map((swatch, idx) => (
                          <div key={idx} className="flex items-center space-x-2 px-2.5 py-1.5 rounded-xl border border-atelier-sand/60 bg-atelier-ivory/50">
                            <span 
                              className="w-4 h-4 rounded-full border border-black/10 shadow-inner flex-shrink-0"
                              style={{ backgroundColor: swatch.hex_code }}
                            />
                            <span className="font-medium text-atelier-charcoal">{swatch.name}</span>
                            <span className="font-mono text-[10px] text-atelier-taupe">{swatch.hex_code}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-atelier-cream grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block">Harmony</span>
                        <span className="font-semibold text-atelier-charcoal">{analysisResult.colour_pattern?.color_harmony}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block">Surface Pattern</span>
                        <span className="font-semibold text-atelier-charcoal">{analysisResult.colour_pattern?.pattern}</span>
                      </div>
                    </div>

                    {analysisResult.colour_pattern?.pattern_description && (
                      <p className="text-[11px] text-atelier-taupe bg-atelier-cream/50 p-2.5 rounded-xl">
                        {analysisResult.colour_pattern.pattern_description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Feature 2: Fabric & Texture Detection */}
                <div className="bg-white rounded-3xl p-6 border border-atelier-beige shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-atelier-cream pb-3">
                    <Layers className="w-5 h-5 text-atelier-accent" />
                    <h3 className="font-serif text-lg font-bold text-atelier-charcoal">
                      2. Fabric & Texture Detection
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block font-semibold">
                        Observable Appearance
                      </span>
                      <span className="text-sm font-semibold text-atelier-charcoal">
                        {analysisResult.fabric_texture?.appearance}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-atelier-cream">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block">Texture Type</span>
                        <span className="font-semibold text-atelier-charcoal">{analysisResult.fabric_texture?.texture_type}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block">Surface Energy</span>
                        <span className="font-semibold text-atelier-charcoal">{analysisResult.fabric_texture?.surface_energy || 'Standard'}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-atelier-taupe block font-semibold">
                        Tactile Drape Description
                      </span>
                      <p className="text-[11px] text-atelier-taupe bg-atelier-cream/50 p-2.5 rounded-xl mt-1">
                        {analysisResult.fabric_texture?.tactile_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4: Neckline, Sleeves & Design Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-atelier-beige shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-atelier-cream pb-3">
                  <Shirt className="w-5 h-5 text-atelier-accent" />
                  <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
                    4. Neckline, Sleeves & Design Details
                  </h3>
                </div>

                <div className="divide-y divide-atelier-sand/30">
                  {renderDetailItem('Neckline Cut', analysisResult.design_details?.neckline)}
                  {renderDetailItem('Collar Type', analysisResult.design_details?.collar_type)}
                  {renderDetailItem('Sleeve Length & Cut', analysisResult.design_details?.sleeve_length)}
                  {renderDetailItem('Buttons & Closures', analysisResult.design_details?.buttons_closures)}
                  {renderDetailItem('Pockets Placement', analysisResult.design_details?.pockets)}
                  {renderDetailItem('Fit & Silhouette', analysisResult.design_details?.fit_and_silhouette)}
                  {renderDetailItem('Embellishments & Accents', analysisResult.design_details?.embellishments)}
                </div>
              </div>

              {/* Feature 6: AI Outfit Recommendations */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-atelier-beige shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-atelier-cream pb-3">
                  <Compass className="w-5 h-5 text-atelier-accent" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
                      6. AI Outfit Recommendations
                    </h3>
                    <p className="text-xs text-atelier-taupe">Coordinated ensemble pairings tailored for this garment</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {analysisResult.outfit_recommendations?.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-atelier-ivory rounded-2xl border border-atelier-sand/60 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-atelier-accent">
                          {rec.item_type}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <h4 className="font-semibold text-xs text-atelier-charcoal">
                        {rec.recommendation}
                      </h4>
                      <p className="text-[11px] text-atelier-taupe leading-relaxed">
                        {rec.styling_tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature 8: Fashion Design Improvement Suggestions */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-atelier-beige shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-atelier-cream pb-3">
                  <Lightbulb className="w-5 h-5 text-atelier-accent" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
                      8. Fashion Design Improvement Suggestions
                    </h3>
                    <p className="text-xs text-atelier-taupe">Designer-grade tailoring & aesthetic refinement proposals</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {analysisResult.improvement_suggestions?.map((sug, idx) => (
                    <div key={idx} className="p-4 bg-atelier-cream/50 rounded-2xl border border-atelier-sand/60 space-y-2">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white text-atelier-charcoal border border-atelier-sand">
                        {sug.aspect}
                      </span>
                      <p className="text-xs font-medium text-atelier-charcoal">
                        {sug.suggestion}
                      </p>
                      <p className="text-[11px] text-atelier-taupe pt-1 border-t border-atelier-sand/40">
                        <strong className="text-atelier-charcoal">Impact:</strong> {sug.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature 7: Similar Design Finder */}
              {analysisResult.similar_designs?.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-atelier-beige shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-atelier-cream pb-3">
                    <BookmarkCheck className="w-5 h-5 text-atelier-accent" />
                    <div>
                      <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
                        7. Similar Design Finder
                      </h3>
                      <p className="text-xs text-atelier-taupe">Matching silhouettes and palettes from your BeYou Studio library</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    {analysisResult.similar_designs.map((item, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden border border-atelier-sand/60 bg-atelier-ivory/50 flex flex-col justify-between group">
                        <div className="relative aspect-square bg-atelier-cream/60 overflow-hidden">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] font-medium uppercase">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-3">
                          <h5 className="font-serif text-xs font-bold text-atelier-charcoal line-clamp-1">{item.title}</h5>
                          <p className="text-[10px] text-atelier-taupe mt-1 line-clamp-2">{item.similarity_reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-atelier-cream bg-white p-6 rounded-3xl border border-atelier-beige">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-5 py-2.5 rounded-xl bg-atelier-cream text-xs font-semibold text-atelier-charcoal hover:bg-atelier-beige transition-colors"
                >
                  Analyse Another Image
                </button>
                <div className="text-[11px] text-atelier-taupe flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Vision Architecture: {analysisResult.model_used}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
