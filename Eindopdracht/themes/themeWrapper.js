import { useTheme } from "./themeProvider";

//Extra component used in the navigation
const ThemeWrapper = ({ children }) => {
    const { isLoadingTheme } = useTheme();

    if(isLoadingTheme) return null;

    return children;
}

export default ThemeWrapper; 