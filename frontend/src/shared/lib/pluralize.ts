export const pluralize = (
  count: number,
  one: string,
  few: string,
  many: string,
) => {
  const rule = new Intl.PluralRules("ru-RU").select(count);

  switch (rule) {
    case "one":
      return one;
    case "few":
      return few;
    default:
      return many;
  }
};
