import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { diabetesDashboardMeta } from '../config/diabetes-dashboard.meta';
import './diabetes-dashboard-link.scss';

const DiabetesDashboardLink: React.FC = () => {
    return (
        <ConfigurableLink
            to={diabetesDashboardMeta.route}
            className="diabetesMenuItem"
        >
            {diabetesDashboardMeta.title}
        </ConfigurableLink>
    );
};

export default DiabetesDashboardLink;