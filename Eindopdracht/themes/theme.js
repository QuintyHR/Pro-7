// Making the different themes
//First one is light mode
export const defaultTheme = {
    backgroundColor: '#fff',
    textColor: '#000',
    nav: {
      backgroundColor: '#44464D',
      active: '#ed5c5c',
      inActive: '#fff',
    },
    listBox: {
      backgroundColor: '#B3B9C9',
    },
    input: {
      textColor: '#000',
      backgroundColor: '#F5F5F5',
    },
    themeMode: 'default',
};

//This is dark mode
export const darkTheme = {
    backgroundColor: '#0f0f0f',
    textColor: '#fff',
    nav: {
      backgroundColor: '#ed5c5c',
      active: '#fff',
      inActive: '#202124',
    },
    listBox: {
      backgroundColor: '#323338',
    },
    input: {
      textColor: '#fff',
      backgroundColor: '#1A1A1A',
    },
    themeMode: 'dark',
};