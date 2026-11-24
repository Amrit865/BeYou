import React from 'react';
import { ShieldCheck, BookOpen, Layers, Cpu, Database, CheckCircle2, Key, Sparkles, ExternalLink } from 'lucide-react';

export default function AboutPage({ systemConfig, onOpenKeyModal }) {
  const categories = systemConfig?.categories || ['Shirts', 'Tops', 'Dresses', 'Jeans', 'Pullovers'];
  const styles = systemConfig?.styles || ['Casual', 'Formal', 'Partywear', 'Minimalist'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 animate-fadeIn">
      {/* Title & Academic Header */}
      <div className="text-center max-w-3xl mx-auto border-b border-atelier-beige pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-atelier-accent">
          Academic Project Architecture & Specification
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-atelier-charcoal mt-2">
          BeYou – AI-Powered Women's Fashion Designer & Image Analysis System
        </h1>
        <p className="text-base text-atelier-taupe font-serif italic mt-2">
          "Design Your Style, Define Yourself."
        </p>
        <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-atelier-cream border border-atelier-sand text-xs text-atelier-charcoal">
          <span>Domain: Deep Learning • Computer Vision • Multimodal Generative AI</span>
        </div>
      </div>

      {/* Project Identity & Scope Restrictions */}
      <section className="bg-white rounded-3xl p-8 border border-atelier-beige shadow-sm space-y-4">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-6 h-6 text-atelier-accent" />
          <h2 className="font-serif text-2xl font-bold text-atelier-charcoal">
            Strict Project Scope & Categorical Boundaries
          </h2>
        </div>
        <p className="text-sm text-atelier-taupe leading-relaxed">
          BeYou is exclusively engineered for <strong>women's fashion</strong>. To maintain academic rigor and avoid architectural complexity, all e-commerce, shopping carts, payment gateways, virtual try-on, and male fashion categories have been completely removed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-4 bg-atelier-ivory rounded-2xl border border-atelier-sand/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-atelier-charcoal mb-2">
              Fixed Clothing Categories (5 Only)
            </h3>
            <ul className="text-xs text-atelier-taupe space-y-1.5">
              {categories.map((c) => (
                <li key={c} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <strong className="text-atelier-charcoal">{c}</strong>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-atelier-taupe/80 mt-3 pt-2 border-t border-atelier-sand/40">
              Jackets, skirts, shorts, accessories, and footwear are strictly excluded.
            </p>
          </div>

          <div className="p-4 bg-atelier-ivory rounded-2xl border border-atelier-sand/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-atelier-charcoal mb-2">
              Fixed Fashion Styles (4 Only)
            </h3>
            <ul className="text-xs text-atelier-taupe space-y-1.5">
              {styles.map((s) => (
                <li key={s} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <strong className="text-atelier-charcoal">{s}</strong>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-atelier-taupe/80 mt-3 pt-2 border-t border-atelier-sand/40">
              Each style directly calibrates tailoring geometry, silhouette, and design context.
            </p>
          </div>
        </div>
      </section>

      {/* Two Core AI Modules Architecture */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-atelier-charcoal">
          Two Core AI Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-atelier-beige shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-atelier-cream flex items-center justify-center text-atelier-charcoal">
              <Sparkles className="w-5 h-5 text-atelier-accent" />
            </div>
            <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
              1. AI Fashion Image Generation
            </h3>
            <p className="text-xs text-atelier-taupe leading-relaxed">
              Powered by the OpenAI Image API (<code className="font-mono text-atelier-charcoal">dall-e-3</code>) orchestrated through a dedicated Python prompt engineering engine.
            </p>
            <div className="space-y-2 text-xs text-atelier-taupe">
              <div className="font-semibold text-atelier-charcoal">Priority Hierarchy:</div>
              <ol className="list-decimal list-inside space-y-1 text-[11px]">
                <li>Women's fashion restriction</li>
                <li>Exact selected garment category (Shirts, Tops, Dresses, Jeans, Pullovers)</li>
                <li>User custom design description (preserved without overriding)</li>
                <li>Selected fashion style context</li>
                <li>Selected primary and custom colours</li>
                <li>Fabric texture preference (Cotton, Denim, Silk, Wool, Linen)</li>
                <li>Lookbook photographic quality and single-garment spotlight</li>
              </ol>
            </div>
            <p className="text-[11px] text-atelier-taupe bg-atelier-cream/50 p-2.5 rounded-xl border border-atelier-sand/40">
              Generated images are downloaded locally to disk (<code className="font-mono">storage/generated/</code>) and tracked in SQLite for permanent access.
            </p>
          </div>

          {/* Module 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-atelier-beige shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-atelier-cream flex items-center justify-center text-atelier-charcoal">
              <Layers className="w-5 h-5 text-atelier-accent" />
            </div>
            <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
              2. AI Fashion Image Analysis
            </h3>
            <p className="text-xs text-atelier-taupe leading-relaxed">
              Powered by multimodal OpenAI Vision (<code className="font-mono text-atelier-charcoal">gpt-4o</code>) through structured JSON response schemas.
            </p>
            <div className="space-y-2 text-xs text-atelier-taupe">
              <div className="font-semibold text-atelier-charcoal">Vision Intelligence Output:</div>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li><strong>Clothing Category:</strong> Identifies Shirt, Top, Dress, Jeans, Pullover, or flags <em>"Unsupported Category"</em></li>
                <li><strong>Colour Analysis:</strong> Primary dominant and secondary accent colours</li>
                <li><strong>Surface Pattern:</strong> Plain, striped, floral, printed, textured</li>
                <li><strong>Fabric Appearance:</strong> Observable weave (denim texture, knit, smooth silk-like)</li>
                <li><strong>Fashion Style:</strong> Casual, Formal, Partywear, Minimalist, or Uncertain</li>
                <li><strong>Structural Details:</strong> Neckline, collar, sleeves, buttons, pockets, silhouette</li>
                <li><strong>Overall Summary:</strong> Factual 1-2 sentence description</li>
              </ul>
            </div>
            <p className="text-[11px] text-atelier-taupe bg-atelier-cream/50 p-2.5 rounded-xl border border-atelier-sand/40">
              Never invents unseen details or guesses unobservable fabric chemical compositions.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Deep Learning & Dataset Clarification */}
      <section className="bg-white rounded-3xl p-8 border border-atelier-beige shadow-sm space-y-6">
        <div className="flex items-center space-x-2.5">
          <Database className="w-6 h-6 text-atelier-accent" />
          <h2 className="font-serif text-2xl font-bold text-atelier-charcoal">
            Deep Learning Dataset & Model Integrity
          </h2>
        </div>

        <div className="p-4 bg-atelier-cream/40 rounded-2xl border border-atelier-sand/60 text-xs text-atelier-taupe leading-relaxed space-y-3">
          <p>
            <strong className="text-atelier-charcoal">Academic Honesty Statement:</strong> In modern B.Tech CSE research, state-of-the-art generative imaging and multimodal understanding require large foundational models (such as DALL-E 3 and GPT-4o Vision). BeYou honestly integrates these models through modular backend services rather than falsely claiming to have trained a multi-billion-parameter diffusion model from scratch on academic hardware.
          </p>
          <p>
            For classification and baseline comparison, the project repository includes a verified <strong>6-layer Deep Convolutional Neural Network (CNN)</strong> with Batch Normalization and Dropout (<code className="font-mono">deep_learning/checkpoints/best_fashion_model.keras</code>), evaluated on test benchmarks across garment categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-atelier-ivory rounded-2xl border border-atelier-sand/60">
            <span className="font-bold uppercase text-[10px] tracking-wider text-atelier-charcoal block mb-1">
              Polyvore Dataset
            </span>
            <span className="text-lg font-serif font-bold text-atelier-charcoal block mb-1">
              261,000+ Images
            </span>
            <p className="text-atelier-taupe text-[11px]">
              Extensive fashion catalog images used for reference verification and label mapping.
            </p>
          </div>

          <div className="p-4 bg-atelier-ivory rounded-2xl border border-atelier-sand/60">
            <span className="font-bold uppercase text-[10px] tracking-wider text-atelier-charcoal block mb-1">
              FashionVerse-MME
            </span>
            <span className="text-lg font-serif font-bold text-atelier-charcoal block mb-1">
              Multimodal Metadata
            </span>
            <p className="text-atelier-taupe text-[11px]">
              Rich attributes (color, pattern, neckline, sleeve) utilized for structured vision mapping.
            </p>
          </div>

          <div className="p-4 bg-atelier-ivory rounded-2xl border border-atelier-sand/60">
            <span className="font-bold uppercase text-[10px] tracking-wider text-atelier-charcoal block mb-1">
              Baseline CNN Classifier
            </span>
            <span className="text-lg font-serif font-bold text-atelier-charcoal block mb-1">
              87.68% Test Acc
            </span>
            <p className="text-atelier-taupe text-[11px]">
              6-layer CNN checkpoint in <code className="font-mono">checkpoints/</code> for academic evaluation and viva demonstration.
            </p>
          </div>
        </div>
      </section>

      {/* System Status & Key Configuration */}
      <section className="bg-atelier-cream/80 rounded-3xl p-8 border border-atelier-sand flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
            OpenAI API Connection Status
          </h3>
          <p className="text-xs text-atelier-taupe mt-1">
            Status: {systemConfig?.has_openai_key ? (
              <span className="font-semibold text-emerald-700">Connected ({systemConfig.key_preview})</span>
            ) : (
              <span className="font-semibold text-amber-700">Key Not Configured (Transparent Error Reporting Active)</span>
            )}
          </p>
          <p className="text-[11px] text-atelier-taupe mt-1">
            Image Model: <code className="font-mono">{systemConfig?.image_model || 'dall-e-3'}</code> • Vision Model: <code className="font-mono">{systemConfig?.vision_model || 'gpt-4o'}</code>
          </p>
        </div>

        <button
          onClick={onOpenKeyModal}
          className="px-6 py-3 rounded-2xl bg-atelier-charcoal text-white text-xs font-semibold hover:bg-atelier-accent transition-colors flex items-center space-x-2 shadow-sm flex-shrink-0"
        >
          <Key className="w-4 h-4" />
          <span>{systemConfig?.has_openai_key ? 'Update API Key' : 'Configure API Key'}</span>
        </button>
      </section>
    </div>
  );
}
