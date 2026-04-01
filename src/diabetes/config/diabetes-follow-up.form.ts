export const diabetesFollowUpForm = {
    name: 'Diabetes Follow-up Form',
    description:
        'Follow-up form for ongoing diabetes monitoring, control assessment, treatment adherence, and complications review.',
    uuid: 'cdcebe23-130f-4e39-9d0f-1471ba2f05f2',
    version: '1.0',
    processor: 'EncounterFormProcessor',
    encounterType: 'd7151f82-c1f3-4152-a605-2f9ea7414a79',
    referencedForms: [],
    pages: [
        {
            label: 'Diabetes Follow-up',
            sections: [
                {
                    label: 'Current Symptoms and Status',
                    isExpanded: 'true',
                    questions: [],
                },
                {
                    label: 'Vitals and Monitoring',
                    isExpanded: 'true',
                    questions: [],
                },
                {
                    label: 'Treatment and Adherence',
                    isExpanded: 'true',
                    questions: [],
                },
                {
                    label: 'Complications Review',
                    isExpanded: 'true',
                    questions: [],
                },
                {
                    label: 'Foot Examination and Plan',
                    isExpanded: 'true',
                    questions: [],
                },
            ],
        },
    ],
};