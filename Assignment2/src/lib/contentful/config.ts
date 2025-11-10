// Contentful configuration with defensive fallbacks so local builds don't explode
// If env vars are missing we expose an isConfigured flag consumers can use
function required(name: string): string | undefined {
  return process.env[name];
}

export const contentfulConfig = {
  space: required('CONTENTFUL_SPACE_ID'),
  accessToken: required('CONTENTFUL_ACCESS_TOKEN'),
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  previewAccessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
};

export const isContentfulConfigured = Boolean(
  contentfulConfig.space && contentfulConfig.accessToken
);

export const contentfulPreviewConfig = {
  ...contentfulConfig,
  host: 'preview.contentful.com',
  accessToken: required('CONTENTFUL_PREVIEW_ACCESS_TOKEN'),
};