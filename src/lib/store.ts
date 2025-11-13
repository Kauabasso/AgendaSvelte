// src/lib/store.ts
import { writable } from 'svelte/store';

const initial = (typeof localStorage !== 'undefined')
  ? localStorage.getItem('currentUser') || null
  : null;

export const currentUser = writable<string | null>(initial);

// mantém localStorage sincronizado
currentUser.subscribe((val) => {
  if (typeof localStorage === 'undefined') return;
  if (val) localStorage.setItem('currentUser', val);
  else localStorage.removeItem('currentUser');
});
