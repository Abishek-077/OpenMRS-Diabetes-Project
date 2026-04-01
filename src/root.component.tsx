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
          <h3 className={styles.welcome}>
            {t('welcomeText', 'Welcome to the O3 Template app')}
          </h3>

          <p className={styles.explainer}>
            {t(
              'explainer',
              'The following examples demonstrate some key features of the O3 framework',
            )}
            .
          </p>
        </div>
      </div>

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
