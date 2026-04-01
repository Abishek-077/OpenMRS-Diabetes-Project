import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { labsMeta } from '../config/labs.meta';
import '../labs-dashboard.scss';

const LabsDashboardLink = () => {
    return (
        <ConfigurableLink
            to={`${window.getOpenmrsSpaBase()}${labsMeta.route}`}
            className="labsMenuItem"
        >
            <span className="labsMenuContent">
                <span>{labsMeta.title}</span>
            </span>
        </ConfigurableLink>
    );
};

export default LabsDashboardLink;