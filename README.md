
# Sera Frontend
![React](https://img.shields.io/badge/React-vite-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-build-green?logo=vite) ![Git Submodule](https://img.shields.io/badge/Git-Submodule-blue?logo=git) ![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker) ![WebSocket](https://img.shields.io/badge/WebSocket-Enabled-black?logo=websocket)

## Overview

Welcome to the **Sera Frontend** repository. This project is a React application built with Vite and includes a submodule located at `addons/fe_Builder` for extended frontend functionalities.

## Table of Contents

- [Sera Frontend](#sera-frontend)
  - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- React application with Vite for fast build times.
- Modular architecture with a submodule for extended functionalities.
- Pre-configured workflows for CI/CD.
- Organized component and asset structure.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Setup

1. **Clone the repository**:
    ```sh
    git clone --recurse-submodules https://github.com/Sera-ai/sera-frontend.git
    cd sera-frontend
    ```

2. **Initialize submodules**:
    ```sh
    git submodule update --init --recursive
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to see the application running.

## Project Structure

    sera-frontend/
    ├─── .github/
    │ └─── workflows/
    ├─── addons/
    │ └─── fe_Builder/ # Submodule for extended frontend functionalities
    ├─── certs/
    ├─── public/
    └─── src/
    ├─── assets/
    ├─── components/
    ├─── css/
    ├─── events/
    ├─── images/
    ├─── pages/
    │ ├─── global/
    │ └─── subpages/
    │ ├─── builder/
    │ ├─── events/
    │ ├─── inventory/
    │ └─── settings/
    ├─── provider/
    └─── utils/

- **.github/**: GitHub Actions workflows for CI/CD.
- **addons/fe_Builder/**: Git submodule for extended frontend functionalities.
- **certs/**: Certificates directory.
- **public/**: Static assets.
- **src/**: Main source code.
  - **assets/**: Asset files.
  - **components/**: React components organized by type.
  - **css/**: CSS stylesheets.
  - **events/**: Event handling.
  - **images/**: Image assets.
  - **pages/**: Page components organized by global and subpages.
  - **provider/**: Context providers.
  - **utils/**: Utility functions.
