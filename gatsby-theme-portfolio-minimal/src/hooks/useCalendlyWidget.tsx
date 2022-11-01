import React, { useEffect } from 'react';
import { Script } from 'gatsby';

declare global {
    const Calendly:
        | {
              initBadgeWidget: (props: unknown) => void;
          }
        | undefined;
}

type CalendlyWidgetProps = {
    username?: string;
    label?: string;
    colorButton?: string;
    colorText?: string;
};

export const useCalendlyWidget = (options?: CalendlyWidgetProps) => {
    const useCalendlyIntegration = options?.username;

    useEffect(() => {
        if (!useCalendlyIntegration) return;
        setTimeout(() => {
            Calendly?.initBadgeWidget({
                url: `https://calendly.com/${options?.username}`,
                text: options?.label ?? 'Schedule time with me',
                color: options?.colorButton ?? '#0069ff',
                textColor: options?.colorText ?? '#ffffff',
            });
        }, 1000);
    }, []);

    return useCalendlyIntegration ? (
        <>
            <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
            <Script
                id="calendlyScript"
                src="https://assets.calendly.com/assets/external/widget.js"
                type="text/javascript"
                async
            />
        </>
    ) : (
        <></>
    );
};
