
const LOCAL_STORAGE_KEY = 'savedMessages';

export const loadMessages = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveMessages = (messages) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
};