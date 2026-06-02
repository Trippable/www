// Trippable backend (live). Overridable via VITE_API_URL at build time.
const RAW_API_URL = import.meta.env.VITE_API_URL ?? 'https://api.tripovik.ru/api/v1';

export const API_URL = RAW_API_URL.replace(/\/+$/, '');
