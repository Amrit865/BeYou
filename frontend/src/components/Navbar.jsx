import React from 'react';
import { Sparkles, Key, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, systemConfig, onOpenKeyModal }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'designer', label: 'Fashion Designer' },
    { id: 'analysis', label: 'Image Analysis' },
    { id: 'my-designs', label: 'My Designs' },
    { id: 'about', label: 'About BeYou' },
  ];

  const hasKey = systemConfig?.has_openai_key;

  return (
    <header className="sticky top-0 z-50 bg-atelier-ivory/90 backdrop-blur-md border-b border-atelier-beige/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('home')}
            className="cursor-pointer group flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-full bg-atelier-charcoal text-atelier-ivory flex items-center justify-center font-serif text-xl font-bold tracking-wider group-hover:bg-atelier-accent transition-colors">
              B
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-atelier-charcoal">
                  BeYou
                </span>
                <span className="text-[10px] uppercase tracking-widest bg-atelier-beige text-atelier-charcoal px-2 py-0.5 rounded font-medium">
                  Women's Studio
                </span>
              </div>
              <p className="text-xs text-atelier-taupe tracking-wide hidden sm:block">
                Design Your Style, Define Yourself.
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-atelier-charcoal text-white shadow-sm'
                      : 'text-atelier-charcoal/80 hover:text-atelier-charcoal hover:bg-atelier-cream'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* API Key Status Pill & Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenKeyModal}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                hasKey
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
              title={hasKey ? 'OpenAI API Key Configured' : 'Configure OpenAI API Key'}
            >
              {hasKey ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">OpenAI Active</span>
                </>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5 text-amber-600" />
                  <span>Set API Key</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex overflow-x-auto py-2.5 space-x-1 border-t border-atelier-beige/40 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 whitespace-nowrap rounded-full text-xs font-medium ${
                  isActive
                    ? 'bg-atelier-charcoal text-white'
                    : 'text-atelier-charcoal/80 bg-atelier-cream/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
