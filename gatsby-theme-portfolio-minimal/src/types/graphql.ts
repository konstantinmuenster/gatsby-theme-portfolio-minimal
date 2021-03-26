export interface SettingsQueryResult<T> {
    allSettings: {
        edges: T[];
    };
}
