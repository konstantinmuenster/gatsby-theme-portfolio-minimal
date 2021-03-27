export interface AllSettingsQueryResult<T> {
    allSettings: {
        edges: { node: T }[];
    };
}
