import axios from 'axios';

const API_BASE = '/api';

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
    return res.data;
  },

  getSavedDesigns: async () => {
    const res = await client.get('/designs');
    return res.data;
  },

  getDesignById: async (id) => {
    const res = await client.get(`/designs/${id}`);
    return res.data;
  },

  deleteDesign: async (id) => {
    const res = await client.delete(`/designs/${id}`);
    return res.data;
  },

  getDownloadUrl: (id) => `/api/designs/download/${id}`,

  // Core Feature 2: AI Fashion Image Analysis
  analyzeImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await client.post('/analyze/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  getAnalysisHistory: async () => {
    const res = await client.get('/analyze/history');
    return res.data;
  },

  getAnalysisDetail: async (id) => {
    const res = await client.get(`/analyze/${id}`);
    return res.data;
  },

  deleteAnalysis: async (id) => {
    const res = await client.delete(`/analyze/${id}`);
    return res.data;
  },
};
