import { fhirBaseUrl, openmrsFetch } from '@openmrs/esm-framework';

export interface FhirHumanName {
    given?: string[];
    family?: string;
}

export interface FhirPatient {
    id: string;
    gender?: string;
    birthDate?: string;
    name?: FhirHumanName[];
}

export interface FhirPatientEntry {
    resource: FhirPatient;
}

export interface FhirPatientBundle {
    entry?: FhirPatientEntry[];
}

export async function searchPatients(query: string): Promise<FhirPatient[]> {
    if (!query?.trim()) {
        return [];
    }

    const url = `${fhirBaseUrl}/Patient?name=${encodeURIComponent(query)}&_summary=data`;

    const response = await openmrsFetch<{ entry?: FhirPatientEntry[] }>(url);

    return response?.data?.entry?.map((entry) => entry.resource) ?? [];
}

export function getPatientDisplayName(patient: FhirPatient): string {
    const firstName = patient?.name?.[0];
    if (!firstName) return 'Unknown patient';

    const given = firstName.given?.join(' ') ?? '';
    const family = firstName.family ?? '';

    return `${given} ${family}`.trim() || 'Unknown patient';
}