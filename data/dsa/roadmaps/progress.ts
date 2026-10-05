export const STRIVER_PROGRESS_KEY = "striver-a2z-progress";
export const STRIVER_PROGRESS_EVENT = "striver-a2z-progress-change";

export function subscribeToStriverProgress(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(STRIVER_PROGRESS_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(STRIVER_PROGRESS_EVENT, onChange);
  };
}

export function getStriverProgressSnapshot() {
  return localStorage.getItem(STRIVER_PROGRESS_KEY) ?? "[]";
}

export function notifyStriverProgressChanged() {
  window.dispatchEvent(new Event(STRIVER_PROGRESS_EVENT));
}
