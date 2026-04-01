/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */
import React, { useEffect } from 'react';
import { Button, Tile } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Boxes } from './boxes/slot/boxes.component';
import Greeter from './greeter/greeter.component';
import PatientGetter from './patient-getter/patient-getter.component';
import Resources from './resources/resources.component';
import PatientSearch from './patient-search/patient-search.component';
import DiabetesDashboard from './diabetes/pages/diabetes-dashboard.page';
import OrthancDashboardPage from './Orthanc/pages/orthanc-dashboard.page';
import LabsDashboardPage from './labs/pages/labs-dashboard.page';
import styles from './root.scss';

type ExternalSystem = {
  id: string;
  name: string;
  description: string;
  path?: string;
  port?: string;
};

const externalSystems: Array<ExternalSystem> = [
  {
    id: 'lab',
    name: 'Laboratory (OpenELIS)',
    description: 'Open lab diagnostics in OpenELIS.',
    path: '/openelis',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    description: 'Open the pharmacy system on port 8069.',
    port: '8069',
  },
  {
    id: 'orthanc',
    name: 'Orthanc',
    description: 'Open the Orthanc imaging viewer.',
    path: '/orthanc-container/ui/app/index.html#/',
  },
];

const getSystemUrl = (path?: string, port?: string) => {
  const { protocol, hostname } = window.location;
  const host = port ? `${hostname}:${port}` : hostname;
  return `${protocol}//${host}${path ?? ''}`;
};

const Root: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    let favicon = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');

    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <h3 className={styles.welcome}>{t('welcomeText', 'Welcome to NIDANHS')}</h3>

          <p className={styles.explainer}>
            {t('explainer', 'Use the quick access panel below to launch connected systems in your local deployment')}.
          </p>
        </div>
      </div>

      <Tile className={styles.quickAccessSection}>
        <div className={styles.quickAccessHeader}>
          <h4>Integrated Systems</h4>
          <p>Professional single-click access to Lab, Pharmacy, and Orthanc services.</p>
        </div>

        <div className={styles.quickAccessGrid}>
          {externalSystems.map((system) => (
            <Tile key={system.id} className={styles.systemCard}>
              <h5>{system.name}</h5>
              <p>{system.description}</p>
              <Button
                kind="primary"
                size="sm"
                onClick={() => window.open(getSystemUrl(system.path, system.port), '_blank', 'noopener,noreferrer')}
              >
                Open {system.name}
              </Button>
            </Tile>
          ))}
        </div>
      </Tile>

      <Greeter />
      <Boxes />
      <PatientGetter />
      <Resources />
      <PatientSearch />
      <DiabetesDashboard patientUuid="100008E" />
      <OrthancDashboardPage />
      <LabsDashboardPage />
    </div>
  );
};

export default Root;
