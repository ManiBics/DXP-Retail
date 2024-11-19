import { Option } from "@mui/joy";

export const getLocale = (slug, url = "/") => {
  let locale = undefined;
  const newSlug = [];
  (slug ?? [""]).forEach((name) => {
    const localePattern = /^[a-z]{2}(-[A-Z]{2})?$/;
    const isValidLocale = localePattern.test(name);
    if (name === "index") return;
    if (isValidLocale) {
      locale = name;
      const newUrl = url.replace("/", "");
      if (newUrl) {
        newSlug.push(newUrl);
      }
      return;
    }
    newSlug.push(name);
  });
  return { locale, newSlug };
};

export function optionFrom1ToN(N) {
  let result = [
    <Option value={0} key={0}>
      0
    </Option>,
  ];
  for (let i = 1; i <= N; i++) {
    result.push(
      <Option value={i} key={i}>
        {i}
      </Option>
    );
  }
  return result;
}

export const localeToCurrency = (locale) => {
  return (
    {
      "en-US": "USD",
      "en-GB": "GBP",
      "ja-JP": "JPY",
      "fr-FR": "EUR",
      "fr-CA": "EUR",
      "de-DE": "EUR",
      // Add more locales as needed
    }[locale] || "USD"
  );
};

export function translatePrice(price, locale) {
  const currency = localeToCurrency(locale);
  if (!currency) {
    throw new Error(`Currency not found for locale: ${locale}`);
  }
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  return formatter.format(price);
}
