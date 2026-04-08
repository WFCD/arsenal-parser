export const marshall = (obj: object) => {
  const parsed = JSON.parse(JSON.stringify(obj));
  if (parsed.wikiaUrl) delete parsed.wikiaUrl;
  if (parsed.wikiaThumbnail) delete parsed.wikiaThumbnail;
  return parsed;
};
