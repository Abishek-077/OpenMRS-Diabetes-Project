# OpenMRS ESM Template App

![Node.js CI](https://github.com/openmrs/openmrs-esm-template-app/workflows/Node.js%20CI/badge.svg)

This repository provides a starter template for building **OpenMRS frontend modules** using the **OpenMRS 3 (O3) microfrontend architecture**. It is intended to help developers quickly scaffold, customize, and integrate new frontend features into the OpenMRS reference application.

If you are new to OpenMRS frontend development, this template gives you the essential structure, tooling, and conventions needed to begin building your own module.

For detailed guidance, see the [Creating a Frontend Module](https://openmrs.atlassian.net/wiki/x/rIIBCQ) documentation.

For more information, please see the [OpenMRS Frontend Developer Documentation](https://openmrs.atlassian.net/wiki/x/IABBHg).

The [Setup](https://openmrs.atlassian.net/wiki/x/PIIBCQ) section will help you get started with frontend module development.

## Overview

The OpenMRS ESM Template App is designed to act as a clean starting point for developers creating custom frontend modules. It includes:

- A basic application structure for OpenMRS microfrontends
- Sample components and routes
- Configuration schema examples
- Development and build tooling
- CI workflow setup

This template is especially useful for developers who want to focus on building features without having to set up the project structure from scratch.

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **Yarn** package manager
- A running **OpenMRS 3 backend** or access to the O3 reference application environment
- Basic familiarity with:
  - React
  - TypeScript
  - OpenMRS microfrontend architecture

## Running this code

Install dependencies and start the development server:

```sh
yarn
yarn start
