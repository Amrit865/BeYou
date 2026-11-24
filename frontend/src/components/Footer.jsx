import React from 'react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-atelier-cream border-t border-atelier-beige mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-atelier-charcoal">
                BeYou
              </span>
              <span className="text-xs uppercase tracking-widest bg-atelier-sand/60 text-atelier-charcoal px-2 py-0.5 rounded font-medium">
                Women's Fashion
              </span>
            </div>
            <p className="text-sm text-atelier-taupe max-w-md">
              "Design Your Style, Define Yourself." AI-powered women's fashion design synthesis and multimodal vision inspection system.
            </p>
            <p className="text-xs text-atelier-taupe/80">
              Academic Major Project • B.Tech CSE (AI & Machine Learning)
            </p>
          </div>

          {/* Fixed Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-atelier-charcoal mb-3">
              Approved Categories (5)
            </h4>
            <ul className="text-sm text-atelier-taupe space-y-1.5">
              <li>• Shirts</li>
              <li>• Tops</li>
              <li>• Dresses</li>
              <li>• Jeans</li>
              <li>• Pullovers</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-atelier-charcoal mb-3">
              Core Modules
            </h4>
            <ul className="text-sm text-atelier-taupe space-y-1.5">
              <li>
                <button onClick={() => setActiveTab('designer')} className="hover:text-atelier-charcoal transition-colors">
                  AI Fashion Designer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analysis')} className="hover:text-atelier-charcoal transition-colors">
                  Fashion Image Analysis
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('my-designs')} className="hover:text-atelier-charcoal transition-colors">
                  My Designs Library
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-atelier-charcoal transition-colors">
                  Technical Architecture
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-atelier-beige/80 flex flex-col sm:flex-row items-center justify-between text-xs text-atelier-taupe">
          <p>© {new Date().getFullYear()} BeYou Fashion System. Exclusively for Women's Fashion.</p>
          <p className="mt-2 sm:mt-0">Powered by OpenAI GPT Image & Vision Architecture.</p>
        </div>
      </div>
    </footer>
  );
}
