export interface AllSettingsQueryResult<T> {
    allSettings: {
        edges: { node: T }[];
    };
}

export interface AllSettingsQueryResultList<T> {
    allSettings: {
        nodes: T[];
    };
}
