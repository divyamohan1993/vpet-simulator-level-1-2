# Security policy

## Supported version

Only the current `main` branch is maintained.

## Reporting a vulnerability

Open a private GitHub security advisory for vulnerabilities that could expose candidate data, execute untrusted code, bypass content security controls, or compromise the deployment workflow. Do not include real learner recordings or personal data in a public issue.

## Data model

The application has no response-submission API and no server-side candidate database. Candidate responses are processed in the browser. The Node server serves static assets and a health endpoint only.

## Deployment identity

Use GitHub OIDC Workload Identity Federation. Avoid long-lived service-account keys. Keep the deployment service account limited to the roles documented in `docs/DEPLOYMENT.md` and restrict the workload identity provider to this repository.
