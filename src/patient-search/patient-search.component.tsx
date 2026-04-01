import React, { useState } from 'react';
import { Button, Search, Tile, InlineLoading } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { getPatientDisplayName, searchPatients, type FhirPatient } from './patient-search.resource';
import styles from './patient-search.scss';

const PatientSearch: React.FC = () => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [patients, setPatients] = useState<FhirPatient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        const trimmed = query.trim();

        if (!trimmed) {
            setPatients([]);
            setError('');
            setSearched(false);
            return;
        }

        try {
            setLoading(true);
            setError('');
            setSearched(true);

            const results = await searchPatients(trimmed);
            setPatients(results);
        } catch (err) {
            console.error('Failed to search patients', err);
            setError(t('searchFailed', 'Failed to search patients'));
            setPatients([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h2>{t('patientSearch', 'Patient Search')}</h2>
            <p>{t('patientSearchDescription', 'Search for patients by name using the OpenMRS FHIR API.')}</p>

            <div className={styles.controls}>
                <Search
                    id="patient-search-input"
                    size="lg"
                    labelText={t('searchPatients', 'Search patients')}
                    placeholder={t('searchPlaceholder', 'Enter patient name')}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Button onClick={handleSearch} disabled={loading || !query.trim()}>
                    {t('search', 'Search')}
                </Button>
            </div>

            {loading && (
                <div className={styles.loading}>
                    <InlineLoading description={t('loading', 'Loading...')} />
                </div>
            )}

            {error && (
                <Tile className={styles.error}>
                    {error}
                </Tile>
            )}

            {!loading && searched && !error && patients.length === 0 && (
                <Tile className={styles.empty}>
                    {t('noPatientsFound', 'No patients found')}
                </Tile>
            )}

            {!loading && patients.length > 0 && (
                <div className={styles.results}>
                    {patients.map((patient) => (
                        <Tile key={patient.id} className={styles.patientCard}>
                            <h4>{getPatientDisplayName(patient)}</h4>
                            <p><strong>{t('gender', 'Gender')}:</strong> {patient.gender || '-'}</p>
                            <p><strong>{t('birthDate', 'Birth date')}:</strong> {patient.birthDate || '-'}</p>
                            <p><strong>{t('patientId', 'Patient ID')}:</strong> {patient.id}</p>
                        </Tile>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientSearch;