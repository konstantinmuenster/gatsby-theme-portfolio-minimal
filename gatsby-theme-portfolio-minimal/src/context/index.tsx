import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export enum Theme {
    Light = 'lightTheme',
    Dark = 'darkTheme',
}

export enum ActionType {
    SetTheme = 'SET_THEME',
    SetSplashScreenDone = 'SET_SPLASH_SCREEN_DONE',
}

type Dispatch = (action: Action) => void;
type GlobalState = { theme: Theme; splashScreenDone: boolean };
type Action = { type: ActionType.SetTheme; value: Theme } | { type: ActionType.SetSplashScreenDone; value: boolean };

interface GlobalStateProviderProps {
    children: React.ReactElement;
    defaultTheme: Theme;
    useDarkModeBasedOnUsersPreference: boolean;
    useSplashScreenAnimation: boolean;
}

const GlobalStateContext = React.createContext<{ globalState: GlobalState; dispatch: Dispatch } | undefined>(undefined);

export function GlobalStateProvider(props: GlobalStateProviderProps): React.ReactElement {
    const [globalState, dispatch] = React.useReducer(globalStateReducer, {
        theme: initializeTheme(props.defaultTheme, props.useDarkModeBasedOnUsersPreference),
        // If useSplashScreenAnimation=false, we skip the animation by setting the initial value to true
        splashScreenDone: props.useSplashScreenAnimation ? false : true,
    });
    return (
        <GlobalStateContext.Provider value={{ globalState, dispatch }}>{props.children}</GlobalStateContext.Provider>
    );
}

export function useGlobalState(): { globalState: GlobalState; dispatch: Dispatch } {
    const context = React.useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
}

function globalStateReducer(state: GlobalState, action: Action) {
    switch (action.type) {
        case ActionType.SetTheme: {
            return { ...state, theme: action.value };
        }
        case ActionType.SetSplashScreenDone: {
            return { ...state, splashScreenDone: action.value };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
}

function initializeTheme(defaultTheme: Theme, useDarkMode: boolean): Theme {
    const darkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)');
    let initialTheme = defaultTheme;
    if (useDarkMode && darkModeEnabled) {
        initialTheme = Theme.Dark;
    }
    return initialTheme;
}

export function alternTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.setAttribute('data-theme', Theme.Dark);
    } else {
        document.body.setAttribute('data-theme', Theme.Light);
    }
}

// 'Watchers' into the system theme preferences, so if the user change the theme of it system the pages changes too.
if (window.matchMedia) {
    const DarkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const LightSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
    DarkSchemeQuery.addEventListener('change', () => {
        alternTheme();
    });
    LightSchemeQuery.addEventListener('change', () => {
        alternTheme();
    });
}