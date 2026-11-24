import axios from 'axios';

const rawApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const API_BASE = rawApiUrl ? `${rawApiUrl}/api` : '/api';

export const formatImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  return rawApiUrl ? `${rawApiUrl}${url.startsWith('/') ? '' : '/'}${url}` : url;
};

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000, // 90s for image generation and vision calls
});

export const api = {
  // System Configuration
  getConfig: async () => {
    const res = await client.get('/config');
    return res.data;
  },

  updateApiKey: async (apiKey) => {
    const res = await client.post('/config/key', { api_key: apiKey });
    return res.data;
  },

  // Core Feature 1: AI Fashion Designer
  generateDesign: async (payload) => {
    const res = await client.post('/designs/generate', payload);
    if (res.data && res.data.image_url) {
      res.data.image_url = formatImageUrl(res.data.image_url);
    }
    return res.data;
  },

  getSavedDesigns: async () => {
    const res = await client.get('/designs');
    if (Array.isArray(res.data)) {
      return res.data.map((d) => ({
        ...d,
        image_url: formatImageUrl(d.image_url),
      }));
    }
    return res.data;
  },

  getDesignById: async (id) => {
    const res = await client.get(`/designs/${id}`);
    if (res.data && res.data.image_url) {
      res.data.image_url = formatImageUrl(res.data.image_url);
    }
    return res.data;
  },

  deleteDesign: async (id) => {
    const res = await client.delete(`/designs/${id}`);
    return res.data;
  },

  getDownloadUrl: (id) => `${API_BASE}/designs/download/${id}`,

  // Core Feature 2: AI Fashion Image Analysis
  analyzeImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await client.post('/analyze/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.data) {
      if (res.data.image_url) res.data.image_url = formatImageUrl(res.data.image_url);
      if (Array.isArray(res.data.similar_designs)) {
        res.data.similar_designs = res.data.similar_designs.map((item) => ({
          ...item,
          image_url: formatImageUrl(item.image_url),
        }));
      }
    }
    return res.data;
  },

  getAnalysisHistory: async () => {
    const res = await client.get('/analyze/history');
    if (Array.isArray(res.data)) {
      return res.data.map((a) => ({
        ...a,
        image_url: formatImageUrl(a.image_url),
      }));
    }
    return res.data;
  },

  getAnalysisDetail: async (id) => {
    const res = await client.get(`/analyze/${id}`);
    if (res.data) {
      if (res.data.image_url) res.data.image_url = formatImageUrl(res.data.image_url);
      if (Array.isArray(res.data.similar_designs)) {
        res.data.similar_designs = res.data.similar_designs.map((item) => ({
          ...item,
          image_url: formatImageUrl(item.image_url),
        }));
      }
    }
    return res.data;
  },

  deleteAnalysis: async (id) => {
    const res = await client.delete(`/analyze/${id}`);
    return res.data;
  },

  getImageUrl: formatImageUrl,
};
