# Impact Reef

## Overview

Impact Reef is a Web3-based project designed to improve the impact evaluation framework within the Optimism ecosystem. The platform focuses on capturing qualitative input via endorsements and attestations using EAS (Ethereum Attestation Service) for public good projects. This approach provides evaluators with strong qualitative input, enhancing the robustness of impact assessments. This project is part of a broader mission by the Greenpill Dev Guild to elevate the visibility and effectiveness of impact metrics and their corresponding evaluations.

## Getting Started

This repository is structured as a monorepo using **pnpm**. All code is located under the `packages` directory, which includes subdirectories for `client` and `eas` (containing scripts for deploying schemas and attestations to EAS). These can be run simultaneously in a local environment to facilitate end-to-end development and testing.

### Prerequisites

Ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/en/download/current) version 18+ for running scripts and PNPM.
- [PNPM](https://pnpm.io/installation) version 6+ for package management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/greenpill-dev-guild/impact-reef.git
   ```
2. Navigate to the project directory:
   ```bash
   cd impact-reef
   ```
3. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```
4. Start the development environment:
   ```bash
   pnpm dev
   ```

### Tests

Tests can be run at both the package level and root level for the client using `pnpm run test`.

#### Testing Structure

- **Clients**: Tests are written using Vitest and Testing Library.

## Architecture

The repository is organized into packages, each containing code for different aspects of the application, from clients to EAS scripts. The `client` package focuses on the user-facing interface, while the `eas` package handles Ethereum attestation schemas and related scripts.

### Technologies Used

- **Language**:

  - [Typescript](https://www.typescriptlang.org/download): Used across both client and EAS scripts.

- **Core Libraries**:
  - [Next.js](https://nextjs.org): Framework used for building the client-side application.
  - [EAS (Ethereum Attestation Service)](https://attest.org): Used for creating and managing attestations on-chain.
