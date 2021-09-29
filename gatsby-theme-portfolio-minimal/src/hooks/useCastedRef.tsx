import React from 'react';

export function useCastedRef<T>(): React.MutableRefObject<T> {
    return React.useRef<T>() as React.MutableRefObject<T>;
}
