import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

interface RevealSensorProps {
    children(visible: boolean): React.ReactElement;
    once?: boolean;
    offset?: number;
}

export function RevealSensor(props: RevealSensorProps): React.ReactElement {
    const [visible, setVisible] = React.useState<boolean>(false);
    const once = props.once === undefined ? false : props.once;
    const offset = props.offset === undefined ? 100 : props.offset;

    function handleVisibilityChange(isVisible: boolean): void {
        if (visible && once) return;
        setVisible(isVisible);
    }

    return (
        <VisibilitySensor
            active={once ? !visible : true}
            onChange={handleVisibilityChange}
            minTopValue={offset}
            partialVisibility={true}
        >
            {props.children(visible)}
        </VisibilitySensor>
    );
}
