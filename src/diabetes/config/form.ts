import { makeUrl } from '@openmrs/esm-framework';
import { diabetesInitialAssessmentForm } from './diabetes-initial-assessment.form';
import { diabetesFollowUpForm } from './diabetes-follow-up.form';

export const diabetesForms = [
    {
        id: 'diabetes-initial-assessment',
        name: diabetesInitialAssessmentForm.name,
        description: diabetesInitialAssessmentForm.description,
        uuid: '64a0a025-8769-4097-b8a0-1f111532bee4',
        version: diabetesInitialAssessmentForm.version,
        processor: diabetesInitialAssessmentForm.processor,
        encounterType: diabetesInitialAssessmentForm.encounterType,
        category: 'Initial Assessment',
        status: 'Active' as const,
        pageLabel: diabetesInitialAssessmentForm.pages[0]?.label ?? '',
        sectionCount: diabetesInitialAssessmentForm.pages[0]?.sections?.length ?? 0,
        route: makeUrl('/spa/form-builder/edit/64a0a025-8769-4097-b8a0-1f111532bee4'),
    },
    {
        id: 'diabetes-follow-up',
        name: diabetesFollowUpForm.name,
        description: diabetesFollowUpForm.description,
        uuid: 'cdcebe23-130f-4e39-9d0f-1471ba2f05f2',
        version: diabetesFollowUpForm.version,
        processor: diabetesFollowUpForm.processor,
        encounterType: diabetesFollowUpForm.encounterType,
        category: 'Follow-up',
        status: 'Active' as const,
        pageLabel: diabetesFollowUpForm.pages[0]?.label ?? '',
        sectionCount: diabetesFollowUpForm.pages[0]?.sections?.length ?? 0,
        route: makeUrl('/spa/form-builder/edit/cdcebe23-130f-4e39-9d0f-1471ba2f05f2'),
    },
];

export { diabetesInitialAssessmentForm, diabetesFollowUpForm };