import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { orthancMeta } from '../config/orthanc.meta';
import './orthanc-dashboard-link.scss';

const OrthancDashboardLink = () => {
    return (
        <ConfigurableLink to={orthancMeta.route} className="orthancMenuItem">
            <span className="orthancMenuContent">
                <span>{orthancMeta.title}</span>
            </span>
        </ConfigurableLink>
    );
};

export default OrthancDashboardLink;