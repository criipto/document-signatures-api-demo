const STORAGE_KEY = 'signatures_demo_credentials';

export function setCredentials(clientId : string, clientSecret : string) {
  sessionStorage.setItem(STORAGE_KEY, btoa(`${clientId}:${clientSecret}`));
}

export function getCredentials() {
  return sessionStorage.getItem(STORAGE_KEY);
}

export function removeCredentials() {
  sessionStorage.removeItem(STORAGE_KEY);
}