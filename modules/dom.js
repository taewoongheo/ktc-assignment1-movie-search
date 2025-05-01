import { TEXT_TAG } from "./constants.js";

export function createTextElement(tag, className, text) {
  if (!TEXT_TAG.includes(tag)) return;
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  if (text) el.textContent = text;
  return el;
}

export function createImgElement(src, className) {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add(className);

  return img;
}

export function createContainer(tag = "div", className) {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  return el;
}
