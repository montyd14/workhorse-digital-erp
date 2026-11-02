/** Lowercase a name for mid-sentence use, keeping acronyms (HVAC, CRM, ERP) intact. */
export function lowerKeepAcronyms(name: string) {
  return name
    .split(" ")
    .map((w) => (/^[A-Z0-9&/]+$/.test(w) && w.length > 1 ? w : w.toLowerCase()))
    .join(" ");
}
