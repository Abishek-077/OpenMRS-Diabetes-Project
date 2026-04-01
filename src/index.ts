/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell.
 */

import { defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

const moduleName = '@openmrs/esm-template-app';

/**
 * Translation loader
 */
export const importTranslation = require.context('../translations', false, /\.json$/, 'lazy');

/**
 * App startup
 */
export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

function createLifecycleOptions(featureName: string) {
  return {
    featureName,
    moduleName,
  };
}

/**
 * Root route
 */
export const root = getAsyncLifecycle(
  () => import('./root.component'),
  createLifecycleOptions('root'),
);

/**
 * Boxes / existing demo extensions
 */
export const redBox = getAsyncLifecycle(
  () => import('./boxes/extensions/red-box.component'),
  createLifecycleOptions('red-box'),
);

export const blueBox = getAsyncLifecycle(
  () => import('./boxes/extensions/blue-box.component'),
  createLifecycleOptions('blue-box'),
);

export const brandBox = getAsyncLifecycle(
  () => import('./boxes/extensions/brand-box.component'),
  createLifecycleOptions('brand-box'),
);

/**
 * Active visits widget
 */
export const activeWidgetTable = getAsyncLifecycle(
  () => import('./active-visits-widget/active-visits-table.component'),
  createLifecycleOptions('active-visits-widget'),
);

/**
 * Diabetes feature
 */
export const diabetesDashboardPage = getAsyncLifecycle(
  () => import('./diabetes/pages/diabetes-dashboard.page'),
  createLifecycleOptions('diabetes-dashboard-page'),
);

export const diabetesDashboardLink = getAsyncLifecycle(
  () => import('./diabetes/extensions/diabetes-dashboard-link.extension'),
  createLifecycleOptions('diabetes-dashboard-link'),
);

export const orthancDashboardPage = getAsyncLifecycle(
  () => import('./Orthanc/pages/orthanc-dashboard.page'),
  createLifecycleOptions('orthanc-dashboard-page'),
);

export const orthancDashboardLink = getAsyncLifecycle(
  () => import('./Orthanc/extensions/orthanc-link.extesnion'),
  createLifecycleOptions('orthanc-dashboard-link'),
);

export const labsDashboardPage = getAsyncLifecycle(
  () => import('./labs/pages/labs-dashboard.page'),
  createLifecycleOptions('labs-dashboard-page'),
);

export const labsDashboardLink = getAsyncLifecycle(
  () => import('./labs/extensions/labs-link.extension'),
  createLifecycleOptions('labs-dashboard-link'),
);