import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  let locale = "en";

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
    if (cookieLocale === "en" || cookieLocale === "hi") {
      locale = cookieLocale;
    }
  } catch (e) {
    // fallback to default
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
