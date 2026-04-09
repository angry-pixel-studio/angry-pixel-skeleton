export type Assets = {
  images: {
    [key: string]: string;
  };
  fonts: {
    [key: string]: { name: string; url: string };
  };
  video: {
    [key: string]: string;
  };
  audio: {
    [key: string]: string;
  };
};

export const ASSETS: Assets = {
  images: {
    logo: 'image/logo.png',
  },
  fonts: {},
  video: {},
  audio: {},
};
