import Hotjar from "@hotjar/browser";

export function initHotjar() {
  const id = import.meta.env.VITE_HOTJAR_ID;
  const ver = import.meta.env.VITE_HOTJAR_VERSION || 6;

  if (id) {
    Hotjar.init(Number(id), Number(ver));
  } else {
    console.warn("⚠️  Hotjar ID missing");
  }
}