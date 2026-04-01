export const diabetesInitialAssessmentForm = {
    name: 'Diabetes Initial Assessment Form',
    description:
        'Initial clinical assessment form for patients diagnosed with or suspected to have diabetes mellitus.',
    uuid: 'PUT-DIABETES-INITIAL-FORM-UUID-HERE',
    version: '1.0',
    processor: 'EncounterFormProcessor',
    encounterType: '67a71486-1a54-468f-ac3e-7091a9a79584',
    referencedForms: [],
    pages: [
        {
            label: 'Diabetes Initial Assessment',
            sections: [
                {
                    label: 'Diagnosis Details',
                    isExpanded: 'true',
                    questions: [
                        // keep your real questions here
                    ],
                },
                {
                    label: 'Presenting Symptoms',
                    isExpanded: 'true',
                    questions: [],
                },
                {
                    label: 'Baseline Vitals and Measurements',
                    isExpanded: 'true',
                    questions: [],
                },
                {
                    label: 'Baseline Laboratory Findings',
                    isExpanded: 'true',
                    questions: [],
                },
                {
                    label: 'Initial Treatment Plan',
                    isExpanded: 'true',
                    questions: [],
                },
            ],
        },
    ],
};