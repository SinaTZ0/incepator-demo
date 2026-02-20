import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

/**
 * Utility for composing className strings and automatically merging Tailwind
 * classes. Usage is identical to `clsx`, but inactive/duplicate Tailwind
 * utilities are removed by `twMerge`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
