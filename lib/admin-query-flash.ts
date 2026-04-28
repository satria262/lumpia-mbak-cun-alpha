import type { AdminFlash } from "./admin-flash-shared";

type FlashSearchParams = {
  success?: string | string[];
  error?: string | string[];
};

function getQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function getFlashFromSearchParams(
  searchParams: FlashSearchParams | undefined,
): AdminFlash | null {
  const success = getQueryValue(searchParams?.success);
  const error = getQueryValue(searchParams?.error);

  if (success) {
    return { type: "success", message: success };
  }

  if (error) {
    return { type: "error", message: error };
  }

  return null;
}

export function buildFlashRedirectUrl(
  pathname: string,
  type: "success" | "error",
  message: string,
) {
  const params = new URLSearchParams({ [type]: message });
  return `${pathname}?${params.toString()}`;
}
