import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getOptionalParam = (
  param: string | undefined,
  paramName: string
) => {
  return param && param !== "undefined" ? { [paramName]: param } : {};
};

type NativeAttributes = string | number | object | undefined;

export const removeUndefinedParams = <
  T extends Record<string, NativeAttributes>,
>(
  params: T
): T => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  ) as T;
};

export const transformToKebabCase = (str: string) => {
  return str
    .replace(/[^a-zA-Z0-9\s-]/g, "-") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/([A-Z])/g, "-$1") // Add hyphen before capital letters
    .toLowerCase() // Convert to lowercase
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const decapitalize = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
