import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";



export function debounce<T extends (...args: any[]) => void>(func: T, delay = 300) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }
  
  export const formatDate = (date: string | Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  
  export const truncate = (text: string, maxLength = 100) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
