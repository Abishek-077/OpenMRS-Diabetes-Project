import React from 'react';
import { Tile } from '@carbon/react';
import { FormEngine } from '@openmrs/esm-form-engine-lib';

interface DiabetesFormRendererProps {
    patientUuid: string;
    formUuid: string;
    title?: string;
    onClose?: () => void;
}

const DiabetesFormRenderer: React.FC<DiabetesFormRendererProps> = ({
    patientUuid,
    formUuid,
    title,
    onClose,
}) => {
    const handleSubmit = (encounters: Array<any>) => {
        console.log('Form submitted successfully:', encounters);
        onClose?.();
    };

    if (!patientUuid) {
        return (
            <Tile>
                <h3>No patient selected</h3>
                <p>A patient UUID is required to render this form.</p>
            </Tile>
        );
    }

    if (!formUuid) {
        return (
            <Tile>
                <h3>No form UUID provided</h3>
                <p>This form cannot be loaded until it has been saved in Form Builder.</p>
            </Tile>
        );
    }

    return (
        <Tile>
            {title ? <h2 style={{ marginBottom: '1rem' }}>{title}</h2> : null}

            <FormEngine
                patientUUID={patientUuid}
                formUUID={formUuid}
                mode="enter"
                onSubmit={handleSubmit}
                onCancel={onClose}
            />
        </Tile>
    );
};

export default DiabetesFormRenderer;