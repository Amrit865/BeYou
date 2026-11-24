import React from 'react';
import { Sparkles, ScanEye, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HomePage({ setActiveTab }) {
  const categories = [
    { name: 'Shirts', desc: "Women's classic, formal, and relaxed tailored shirts" },
    { name: 'Tops', desc: "Modern blouses, casual tops, and minimalist silhouettes" },
    { name: 'Dresses', desc: "Occasion, casual, partywear, and formal women's dresses" },
    { name: 'Jeans', desc: "Everyday and stylized women's denim pants" },
    { name: 'Pullovers', desc: "Cozy knitwear, clean sweaters, and minimalist pullovers" },
  ];

  const styles = [
    { name: 'Casual', desc: 'Relaxed everyday aesthetics with comfortable drape' },
    { name: 'Formal', desc: 'Sharp tailoring, structured silhouettes, and executive elegance' },
    { name: 'Partywear', desc: 'Chic occasion-oriented silhouettes with evening flair' },
    { name: 'Minimalist', desc: 'Understated elegance with clean geometric lines' },
  ];

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center pt-8 pb-12 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-atelier-cream border border-atelier-sand text-xs font-semibold uppercase tracking-wider text-atelier-charcoal mb-6">
          <Sparkles className="w-3.5 h-3.5 text-atelier-accent" />
          <span>Women's Fashion AI Studio</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-atelier-charcoal leading-tight">
          Design Your Style, <br />
          <span className="italic font-normal text-atelier-taupe">Define Yourself.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-atelier-taupe font-normal max-w-2xl mx-auto leading-relaxed">
          BeYou is an intelligent, academically rigorous fashion designing application built exclusively for women's fashion, offering high-fidelity generative garment synthesis and deep vision analysis.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('designer')}
            className="flex items-center space-x-2 px-8 py-4 rounded-full bg-atelier-charcoal text-white text-sm font-semibold tracking-wide hover:bg-atelier-accent transition-all shadow-md group"
          >
            <span>Create New Design</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className="flex items-center space-x-2 px-8 py-4 rounded-full bg-white text-atelier-charcoal border border-atelier-sand text-sm font-semibold tracking-wide hover:bg-atelier-cream transition-all shadow-sm"
          >
            <ScanEye className="w-4 h-4 text-atelier-accent" />
            <span>Analyse Clothing Image</span>
          </button>
        </div>
      </section>

      {/* Two Core AI Modules Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-atelier-charcoal">
            Two Core AI Functionalities
          </h2>
          <p className="text-sm text-atelier-taupe mt-2">
            Focused, reliable, and strictly scoped without unnecessary clutter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: AI Fashion Image Generation */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-atelier-beige shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-atelier-cream flex items-center justify-center text-atelier-charcoal mb-6">
                <Sparkles className="w-6 h-6 text-atelier-accent" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-atelier-taupe">
                Core Capability 01
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-atelier-charcoal mt-1 mb-4">
                AI Fashion Image Generation
              </h3>
              <p className="text-sm text-atelier-taupe leading-relaxed mb-6">
                Generate realistic women's clothing designs tailored to your selected category, style, colour, fabric preference, and custom design descriptions using the state-of-the-art OpenAI GPT Image generation engine.
              </p>
              <ul className="space-y-2.5 text-xs text-atelier-charcoal/80 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Strict focus on individual women's garments (no whole outfits or male garments)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Believable fabric weave, natural drape, and accurate stitching</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Permanent local storage and direct image file downloading</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('designer')}
              className="w-full py-3.5 rounded-2xl bg-atelier-charcoal text-white text-xs font-semibold tracking-wider uppercase hover:bg-atelier-accent transition-colors flex items-center justify-center space-x-2"
            >
              <span>Launch Fashion Designer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: AI Fashion Image Analysis */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-atelier-beige shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-atelier-cream flex items-center justify-center text-atelier-charcoal mb-6">
                <ScanEye className="w-6 h-6 text-atelier-accent" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-atelier-taupe">
                Core Capability 02
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-atelier-charcoal mt-1 mb-4">
                AI Fashion Image Analysis
              </h3>
              <p className="text-sm text-atelier-taupe leading-relaxed mb-6">
                Upload existing clothing photos to extract structured computer vision intelligence: clothing category, primary and secondary colour palettes, surface patterns, fabric appearance, and intricate design details.
              </p>
              <ul className="space-y-2.5 text-xs text-atelier-charcoal/80 mb-8">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Powered by multimodal OpenAI Vision model (GPT-4o)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Strict validation: flags non-supported garments as "Unsupported Category"</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Factual, non-hallucinatory texture and structural analysis</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('analysis')}
              className="w-full py-3.5 rounded-2xl bg-atelier-cream text-atelier-charcoal border border-atelier-sand text-xs font-semibold tracking-wider uppercase hover:bg-atelier-beige transition-colors flex items-center justify-center space-x-2"
            >
              <span>Launch Image Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Scope Constraints Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-atelier-cream/80 border border-atelier-sand rounded-3xl p-8 sm:p-10">
          <div className="flex items-center space-x-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-atelier-accent" />
            <h3 className="font-serif text-2xl font-bold text-atelier-charcoal">
              Strict Project Scope & Categorical Integrity
            </h3>
          </div>
          <p className="text-sm text-atelier-taupe mb-8 leading-relaxed max-w-3xl">
            To maintain academic clarity and engineering reliability, BeYou adheres strictly to five defined women's clothing categories and four fashion styles. Unrelated garments (jackets, skirts, shoes) and e-commerce distractions are intentionally excluded.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((c) => (
              <div key={c.name} className="bg-white p-4 rounded-2xl border border-atelier-beige">
                <span className="text-xs font-bold uppercase tracking-wider text-atelier-charcoal">
                  {c.name}
                </span>
                <p className="text-xs text-atelier-taupe mt-1">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-atelier-beige flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-atelier-taupe">
              Supported Fashion Styles:
            </span>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
                <span key={s.name} className="px-3 py-1 rounded-full bg-white border border-atelier-sand text-xs font-medium text-atelier-charcoal">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
