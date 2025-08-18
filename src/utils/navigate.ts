let navigator: ((path: string) => void) | null = null;

export const setNavigator = (navFn: (path: string) => void) => {
  navigator = navFn;
};

export const navigate = (path: string) => {
  if (navigator) {
    navigator(path);
  } else {
    console.warn('Navigator belum disetel');
  }
};
