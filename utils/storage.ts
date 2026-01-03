import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const FAVORITES_FILE = path.join(DATA_DIR, 'favorites.json');

export interface User {
  id: string;
  email: string;
  password: string; // Note: This is insecure - for demo purposes only
  name: string;
  createdAt: string;
}

export interface UserFavorites {
  [userId: string]: string[]; // userId -> array of restaurant IDs
}

// Ensure data directory and files exist
function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(FAVORITES_FILE)) {
    fs.writeFileSync(FAVORITES_FILE, JSON.stringify({}, null, 2));
  }
}

// User storage functions
export function getUsers(): User[] {
  ensureDataFiles();
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveUsers(users: User[]): void {
  ensureDataFiles();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function findUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.id === id);
}

export function createUser(email: string, password: string, name: string): User {
  const users = getUsers();
  const newUser: User = {
    id: generateId(),
    email,
    password, // WARNING: Storing plaintext passwords - insecure!
    name,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

// Favorites storage functions
export function getFavorites(): UserFavorites {
  ensureDataFiles();
  const data = fs.readFileSync(FAVORITES_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveFavorites(favorites: UserFavorites): void {
  ensureDataFiles();
  fs.writeFileSync(FAVORITES_FILE, JSON.stringify(favorites, null, 2));
}

export function getUserFavorites(userId: string): string[] {
  const favorites = getFavorites();
  return favorites[userId] || [];
}

export function addFavorite(userId: string, restaurantId: string): void {
  const favorites = getFavorites();
  if (!favorites[userId]) {
    favorites[userId] = [];
  }
  if (!favorites[userId].includes(restaurantId)) {
    favorites[userId].push(restaurantId);
    saveFavorites(favorites);
  }
}

export function removeFavorite(userId: string, restaurantId: string): void {
  const favorites = getFavorites();
  if (favorites[userId]) {
    favorites[userId] = favorites[userId].filter(id => id !== restaurantId);
    saveFavorites(favorites);
  }
}

// Helper function to generate simple IDs
function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
