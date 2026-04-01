import React from 'react';
import { Button, Tile, Tag } from '@carbon/react';
import { Add, Document, Microscope, Notebook, Result } from '@carbon/icons-react';
import { navigate } from '@openmrs/esm-framework';
import styles from '../labs-dashboard.scss';
type LabForm = {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'Active' | 'Draft';
    route: string;
};

const spaBase = window.getOpenmrsSpaBase();

const labForms: Array<LabForm> = [
    {
        id: '1',
        title: 'Lab Request Form',
        description: 'Create and submit new laboratory investigation requests for patients.',
        category: 'Orders',
        status: 'Active',
        route: `${spaBase}labs/request-form`,
    },
    {
        id: '2',
        title: 'Lab Result Entry Form',
        description: 'Capture and manage laboratory test results from completed investigations.',
        category: 'Results',
        status: 'Active',
        route: `${spaBase}labs/result-entry`,
    },
    {
        id: '3',
        title: 'Specimen Collection Form',
        description: 'Record specimen collection details including specimen type, collection date, and collector.',
        category: 'Specimen',
        status: 'Draft',
        route: `${spaBase}labs/specimen-form`,
    },
    {
        id: '4',
        title: 'Lab Follow-up Form',
        description: 'Track repeat investigations, abnormal results, and pending actions.',
        category: 'Follow-up',
        status: 'Active',
        route: `${spaBase}labs/follow-up-form`,
    },
];

const LabsDashboard: React.FC = () => {
    const handleOpen = (route: string) => {
        navigate({ to: route });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>Laboratory Module</p>
                    <h1 className={styles.title}>Labs Dashboard</h1>
                    <p className={styles.subtitle}>
                        Manage lab requests, specimen workflows, results entry, and lab-related forms built through Form Builder.
                    </p>
                </div>

                <div className={styles.headerActions}>
                    <Button
                        kind="secondary"
                        renderIcon={Notebook}
                        onClick={() => handleOpen(`${spaBase}form-builder`)}
                    >
                        Open Form Builder
                    </Button>

                    <Button
                        renderIcon={Add}
                        onClick={() => handleOpen(`${spaBase}labs/request-form`)}
                    >
                        New Lab Request
                    </Button>
                </div>
            </div>

            <div className={styles.summaryGrid}>
                <Tile className={styles.summaryCard}>
                    <div className={styles.summaryTop}>
                        <Microscope size={20} />
                        <span className={styles.summaryLabel}>Pending Orders</span>
                    </div>
                    <div className={styles.bigNumber}>18</div>
                    <p className={styles.summaryNote}>Awaiting collection or lab processing</p>
                </Tile>

                <Tile className={styles.summaryCard}>
                    <div className={styles.summaryTop}>
                        <Result size={20} />
                        <span className={styles.summaryLabel}>Results Ready</span>
                    </div>
                    <div className={styles.bigNumber}>9</div>
                    <p className={styles.summaryNote}>Ready for review by clinicians</p>
                </Tile>

                <Tile className={styles.summaryCard}>
                    <div className={styles.summaryTop}>
                        <Document size={20} />
                        <span className={styles.summaryLabel}>Configured Forms</span>
                    </div>
                    <div className={styles.bigNumber}>{labForms.length}</div>
                    <p className={styles.summaryNote}>Available from your Form Builder workflow</p>
                </Tile>
            </div>

            <div className={styles.quickActionsSection}>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>

                <div className={styles.quickActionsGrid}>
                    <Tile className={styles.actionCard} onClick={() => handleOpen(`${spaBase}orders`)}>
                        <h3>View Lab Orders</h3>
                        <p>Review requested tests and current workflow state.</p>
                    </Tile>

                    <Tile className={styles.actionCard} onClick={() => handleOpen(`${spaBase}results`)}>
                        <h3>View Lab Results</h3>
                        <p>Access completed and pending laboratory results.</p>
                    </Tile>

                    <Tile className={styles.actionCard} onClick={() => handleOpen(`${spaBase}form-builder`)}>
                        <h3>Manage Forms</h3>
                        <p>Create or update laboratory schemas in Form Builder.</p>
                    </Tile>
                </div>
            </div>

            <div className={styles.formsSection}>
                <div className={styles.formsHeader}>
                    <div>
                        <h2 className={styles.sectionTitle}>Laboratory Forms</h2>
                        <p className={styles.sectionSubtitle}>
                            These can represent the forms you created using the OpenMRS Form Builder.
                        </p>
                    </div>
                </div>

                <div className={styles.formsGrid}>
                    {labForms.map((form) => (
                        <Tile key={form.id} className={styles.formCard}>
                            <div className={styles.formCardTop}>
                                <div>
                                    <h3 className={styles.formTitle}>{form.title}</h3>
                                    <p className={styles.formCategory}>{form.category}</p>
                                </div>
                                <Tag type={form.status === 'Active' ? 'green' : 'gray'}>{form.status}</Tag>
                            </div>

                            <p className={styles.formDescription}>{form.description}</p>

                            <div className={styles.formActions}>
                                <Button size="sm" onClick={() => handleOpen(form.route)}>
                                    Open Form
                                </Button>

                                <Button
                                    size="sm"
                                    kind="ghost"
                                    onClick={() => handleOpen(`${spaBase}form-builder`)}
                                >
                                    Edit in Builder
                                </Button>
                            </div>
                        </Tile>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LabsDashboard;