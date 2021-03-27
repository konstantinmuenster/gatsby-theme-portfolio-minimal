import React from 'react';

export enum Theme {
    Light = 'lightTheme',
    Dark = 'darkTheme',
}

interface ThemeProviderProps {
    children: React.ReactElement;
    defaultTheme: Theme;
    enableUsersPreference: boolean;
}

interface ThemeContext {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = React.createContext<ThemeContext | undefined>(undefined);

export function ThemeProvider(props: ThemeProviderProps): React.ReactElement {
    let initialTheme = props.defaultTheme;
    if (props.enableUsersPreference && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initialTheme = Theme.Dark;
    }
    const [theme, setTheme] = React.useState<Theme>(initialTheme);
    return <ThemeContext.Provider value={{ theme, setTheme }}>{props.children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContext {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}
