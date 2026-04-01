import React, { useState } from 'react';
import { Button, Tile } from '@carbon/react';
import { Add, Document, Notebook, WatsonHealthStackedScrolling_1 } from '@carbon/icons-react';
import styles from '../diabetes-dashboard.scss';
import DiabetesFormRenderer from '../components/diabetes-form-renderer.component';

type ActiveForm = 'initial' | 'followup' | null;

interface DiabetesDashboardProps {
    patientUuid?: string;
}

const DIABETES_INITIAL_FORM_UUID = '64a0a025-8769-4097-b8a0-1f111532bee4';
const DIABETES_FOLLOWUP_FORM_UUID = 'cdcebe23-130f-4e39-9d0f-1471ba2f05f2';

const DiabetesDashboard: React.FC<DiabetesDashboardProps> = ({ patientUuid }) => {
    const [activeForm, setActiveForm] = useState<ActiveForm>(null);

    const renderActiveForm = () => {
        if (!patientUuid) {
            return (
                <Tile className={styles.section}>
                    <h3>No patient selected</h3>
                    <p>Select or pass a patient UUID before rendering a clinical form.</p>
                </Tile>
            );
        }

        if (activeForm === 'initial') {
            return (
                <DiabetesFormRenderer
                    patientUuid={patientUuid}
                    formUuid={DIABETES_INITIAL_FORM_UUID}
                    title="Diabetes Initial Assessment"
                    onClose={() => setActiveForm(null)}
                />
            );
        }

        if (activeForm === 'followup') {
            return (
                <DiabetesFormRenderer
                    patientUuid={patientUuid}
                    formUuid={DIABETES_FOLLOWUP_FORM_UUID}
                    title="Diabetes Follow-up Form"
                    onClose={() => setActiveForm(null)}
                />
            );
        }

        return null;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>Chronic Care Module</p>
                    <h1 className={styles.title}>Diabetes Dashboard</h1>
                    <p className={styles.subtitle}>
                        Manage diabetes assessment, follow-up visits, treatment review, and longitudinal care forms.
                    </p>
                </div>

                <div className={styles.headerActions}>
                    <Button kind="secondary" renderIcon={Notebook} onClick={() => setActiveForm('followup')}>
                        Open Follow-up Form
                    </Button>

                    <Button renderIcon={Add} onClick={() => setActiveForm('initial')}>
                        New Initial Assessment
                    </Button>
                </div>
            </div>

            <div className={styles.summaryGrid}>
                <Tile className={styles.summaryCard}>
                    <div className={styles.summaryTop}>
                        <Document size={20} />
                        <span className={styles.summaryLabel}>Configured Forms</span>
                    </div>
                    <div className={styles.bigNumber}>2</div>
                    <p className={styles.summaryNote}>Initial and follow-up diabetes workflows</p>
                </Tile>

                <Tile className={styles.summaryCard}>
                    <div className={styles.summaryTop}>
                        <WatsonHealthStackedScrolling_1 size={20} />
                        <span className={styles.summaryLabel}>Active Follow-ups</span>
                    </div>
                    <div className={styles.bigNumber}>24</div>
                    <p className={styles.summaryNote}>Patients requiring ongoing monitoring</p>
                </Tile>

                <Tile className={styles.summaryCard}>
                    <div className={styles.summaryTop}>
                        <Notebook size={20} />
                        <span className={styles.summaryLabel}>Care Reviews Due</span>
                    </div>
                    <div className={styles.bigNumber}>8</div>
                    <p className={styles.summaryNote}>Pending reassessment and treatment review</p>
                </Tile>
            </div>

            <div className={styles.quickActionsSection}>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>

                <div className={styles.quickActionsGrid}>
                    <Tile className={styles.actionCard} onClick={() => setActiveForm('initial')}>
                        <h3>Initial Assessment</h3>
                        <p>Capture diagnosis, symptoms, baseline vitals, labs, and initial treatment plan.</p>
                    </Tile>

                    <Tile className={styles.actionCard} onClick={() => setActiveForm('followup')}>
                        <h3>Follow-up Visit</h3>
                        <p>Document monitoring, adherence, complications, foot examination, and next review.</p>
                    </Tile>
                </div>
            </div>

            {activeForm && <div className={styles.formSection}>{renderActiveForm()}</div>}
        </div>
    );
};

export default DiabetesDashboard;