import type { Industry } from "../types";
import { vending } from "./vending";
import { laundromats } from "./laundromats";
import { pressureWashing } from "./pressure-washing";
import { poolService } from "./pool-service";
import { hvacPlumbing } from "./hvac-plumbing";
import { junkRemoval } from "./junk-removal";
import { mobileDetailing } from "./mobile-detailing";

/**
 * Adding an industry = add a file in this folder and list it here.
 * Everything else (landing page, sitemap, form dropdown, internal links) follows.
 */
export const industries: Industry[] = [
  vending,
  laundromats,
  pressureWashing,
  poolService,
  hvacPlumbing,
  junkRemoval,
  mobileDetailing,
].sort((a, b) => a.priority - b.priority);

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function industriesForService(service: Industry["solutions"][number]["service"]) {
  return industries.filter((i) => i.solutions.some((s) => s.service === service));
}
