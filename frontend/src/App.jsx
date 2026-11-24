import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ApiKeyModal from './components/ApiKeyModal';
import HomePage from './pages/HomePage';
import DesignerPage from './pages/DesignerPage';
import AnalysisPage from './pages/AnalysisPage';
import MyDesignsPage from './pages/MyDesignsPage';
import AboutPage from './pages/AboutPage';
import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [systemConfig, setSystemConfig] = useState(null);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  const fetchSystemConfig = async () => {
    try {
      const config = await api.getConfig();
      setSystemConfig(config);
    } catch (err) {
      console.warn('Backend not yet reachable, using fallback config defaults.');
      setSystemConfig({
        project_name: "BeYou – AI-Powered Women's Fashion Designer & Image Analysis System",
        tagline: "Design Your Style, Define Yourself.",
        version: "1.0.0",
        categories: ["Shirts", "Tops", "Dresses", "Jeans", "Pullovers"],
        styles: ["Casual", "Formal", "Partywear", "Minimalist"],
        colors: ["White", "Black", "Red", "Blue", "Pink", "Beige", "Green", "Custom"],
        has_openai_key: false,
        key_preview: "Not Configured",
        image_model: "dall-e-3",
        vision_model: "gpt-4o"
      });
    }
  };

  useEffect(() => {
    fetchSystemConfig();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-atelier-ivory text-atelier-charcoal font-sans selection:bg-atelier-sand selection:text-atelier-charcoal">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemConfig={systemConfig}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <HomePage setActiveTab={setActiveTab} />
        )}
        {activeTab === 'designer' && (
          <DesignerPage
            systemConfig={systemConfig}
            onOpenKeyModal={() => setIsKeyModalOpen(true)}
          />
        )}
        {activeTab === 'analysis' && (
          <AnalysisPage
            onOpenKeyModal={() => setIsKeyModalOpen(true)}
          />
        )}
        {activeTab === 'my-designs' && (
          <MyDesignsPage setActiveTab={setActiveTab} />
        )}
        {activeTab === 'about' && (
          <AboutPage
            systemConfig={systemConfig}
            onOpenKeyModal={() => setIsKeyModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        systemConfig={systemConfig}
        onKeyUpdated={fetchSystemConfig}
      />
    </div>
  );
}
