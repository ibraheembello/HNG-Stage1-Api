import axios from 'axios';

export type Profile = {
  id: string;
  name: string;
  gender: string;
  gender_probability: number;
  sample_size: number;
  age: number;
  age_group: string;
  country_id: string;
  country_probability: number;
  created_at: string;
}

const API_BASE_URL = 'https://hng-stage1-api.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProfiles = async (params?: { gender?: string; country_id?: string; age_group?: string }) => {
  const response = await api.get('/profiles', { params });
  return response.data;
};

export const createProfile = async (name: string) => {
  const response = await api.post('/profiles', { name });
  return response.data;
};

export const deleteProfile = async (id: string) => {
  const response = await api.delete(`/profiles/${id}`);
  return response.data;
};

export default api;
