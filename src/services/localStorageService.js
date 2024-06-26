// src/services/localStorageService.js

const ITEMS_KEY = 'spinWheelItems';

export const saveItems = (items) => {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
};

export const loadItems = () => {
  const savedItems = localStorage.getItem(ITEMS_KEY);
  return savedItems ? JSON.parse(savedItems) : [];
};

export const clearItems = () => {
  localStorage.removeItem(ITEMS_KEY);
};