import React from 'react';

interface SplashScreenProviderProps {
    children: React.ReactElement;
    useSplashScreenAnimation: boolean;
}

interface SplashScreenContext {
    animationCompleted: boolean;
    setAnimationCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SplashScreenContext = React.createContext<SplashScreenContext | undefined>(undefined);

export function SplashScreenProvider(props: SplashScreenProviderProps): React.ReactElement {
    // If useSplashScreenAnimation=false, we skip the animation by setting the initialValue to true
    const initialValue = props.useSplashScreenAnimation ? false : true;
    const [animationCompleted, setAnimationCompleted] = React.useState<boolean>(initialValue);
    return (
        <SplashScreenContext.Provider value={{ animationCompleted, setAnimationCompleted }}>
            {props.children}
        </SplashScreenContext.Provider>
    );
}

export function useSplashScreenContext(): SplashScreenContext {
    const context = React.useContext(SplashScreenContext);
    if (context === undefined) {
        throw new Error('useSplashScreenContext must be used within a SplashScreenProvider');
    }
    return context;
}
