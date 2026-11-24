import React, { useState } from 'react';
import { X, Key, ShieldCheck, AlertCircle, Check } from 'lucide-react';
import { api } from '../services/api';

export default function ApiKeyModal({ isOpen, onClose, systemConfig, onKeyUpdated }) {
  if (!isOpen) return null;

  const [keyInput, setKeyInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.updateApiKey(keyInput.trim());
      setSuccess(true);
      if (onKeyUpdated) onKeyUpdated();
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to update API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-atelier-beige relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-atelier-taupe hover:text-atelier-charcoal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-atelier-cream text-atelier-charcoal flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-atelier-charcoal">
              OpenAI API Configuration
            </h3>
            <p className="text-xs text-atelier-taupe">
              Connect image generation & vision models
            </p>
          </div>
        </div>

        <p className="text-sm text-atelier-taupe mb-4 leading-relaxed">
          BeYou uses the OpenAI GPT Image API (DALL-E 3) for designing realistic garments and the OpenAI Vision model for analyzing uploaded fashion images.
        </p>

        {systemConfig?.has_openai_key && (
          <div className="mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center space-x-2 text-xs text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Currently configured: <strong className="font-mono">{systemConfig.key_preview}</strong></span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-center space-x-2 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center space-x-2 text-xs text-emerald-800">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>API Key updated and verified!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-atelier-charcoal mb-1.5">
              OpenAI API Key
            </label>
            <input
              type="password"
              placeholder="sk-..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-atelier-sand bg-atelier-ivory/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-atelier-charcoal text-sm font-mono"
              required
            />
            <p className="text-[11px] text-atelier-taupe mt-1.5">
              Keys are stored securely in your local <code className="font-mono">backend/.env</code> and never exposed to the frontend.
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-atelier-taupe hover:text-atelier-charcoal"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !keyInput.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-atelier-charcoal text-white hover:bg-atelier-accent disabled:opacity-50 transition-colors shadow-sm"
            >
              {loading ? 'Saving...' : 'Save API Key'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
