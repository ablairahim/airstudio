// Simple utility function for combining class names
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

// We can add clsx and tailwind-merge later when TypeScript resolves them
// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
// 
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// } 