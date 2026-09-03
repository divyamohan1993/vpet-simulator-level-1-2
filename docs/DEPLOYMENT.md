# Continuous deployment to Cloud Run `asia-east1`

The workflow at `.github/workflows/deploy-cloud-run.yml` deploys every successful push to `main` to the public Cloud Run service `vpet-simulator-level-1-2` in `asia-east1`.

## 1. Define deployment values

```bash
export PROJECT_ID="your-google-cloud-project-id"
export PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
export REGION="asia-east1"
export REPOSITORY="divyamohan1993/vpet-simulator-level-1-2"
export SERVICE_ACCOUNT_NAME="github-vpet-deployer"
export SERVICE_ACCOUNT="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
export POOL_ID="github-actions-pool"
export PROVIDER_ID="github-actions-provider"
```

Select the project and enable the required APIs:

```bash
gcloud config set project "$PROJECT_ID"

gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  serviceusage.googleapis.com
```

## 2. Create the GitHub deployment service account

```bash
gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" \
  --display-name="GitHub VPET Cloud Run deployer"
```

Grant deployment permissions:

```bash
for ROLE in \
  roles/run.admin \
  roles/run.sourceDeveloper \
  roles/serviceusage.serviceUsageConsumer
 do
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="$ROLE"
 done

# Cloud Run source deployments use the project's build service account.
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/run.builder"
```

Allow the deployment identity to act as the default Cloud Run runtime service account:

```bash
gcloud iam service-accounts add-iam-policy-binding \
  "${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/iam.serviceAccountUser"
```

## 3. Configure Workload Identity Federation

Create the pool:

```bash
gcloud iam workload-identity-pools create "$POOL_ID" \
  --location="global" \
  --display-name="GitHub Actions pool"
```

Create a provider restricted to this repository:

```bash
gcloud iam workload-identity-pools providers create-oidc "$PROVIDER_ID" \
  --location="global" \
  --workload-identity-pool="$POOL_ID" \
  --display-name="GitHub repository provider" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
  --attribute-condition="assertion.repository=='${REPOSITORY}'"
```

Permit identities from this repository to impersonate the service account:

```bash
gcloud iam service-accounts add-iam-policy-binding "$SERVICE_ACCOUNT" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${REPOSITORY}"
```

Obtain the provider resource name:

```bash
export WORKLOAD_IDENTITY_PROVIDER="$(gcloud iam workload-identity-pools providers describe "$PROVIDER_ID" \
  --location="global" \
  --workload-identity-pool="$POOL_ID" \
  --format='value(name)')"

echo "$WORKLOAD_IDENTITY_PROVIDER"
echo "$SERVICE_ACCOUNT"
```

## 4. Add GitHub repository variables

In **Repository → Settings → Secrets and variables → Actions → Variables**, create:

```text
GCP_PROJECT_ID                       your-google-cloud-project-id
GCP_WORKLOAD_IDENTITY_PROVIDER       projects/123456789/locations/global/workloadIdentityPools/github-actions-pool/providers/github-actions-provider
GCP_SERVICE_ACCOUNT                  github-vpet-deployer@your-google-cloud-project-id.iam.gserviceaccount.com
```

The workflow requests `id-token: write` only for the deployment job and exchanges the GitHub OIDC token through the configured provider. No long-lived cloud key is needed.

## 5. Optional JSON-key fallback

Workload Identity Federation is preferred. If it cannot be configured immediately, create the repository Actions secret `GCP_CREDENTIALS_JSON` containing a service-account JSON key with the required roles. Remove and revoke that key after federation is working.

The workflow automatically chooses federation when both federation variables are present; otherwise it uses the JSON secret.

## 6. Trigger and verify

Push to `main`, or manually run **Test and deploy to Cloud Run** from the Actions page. The workflow will:

1. run syntax and structural tests;
2. build the Docker image locally;
3. start the container and call `/healthz`;
4. authenticate to Google Cloud;
5. deploy source to Cloud Run in `asia-east1`;
6. direct 100% of traffic to the latest revision;
7. call the deployed `/healthz` and home page;
8. publish the production URL in the workflow summary.

Cloud-side verification:

```bash
gcloud run services describe vpet-simulator-level-1-2 \
  --region=asia-east1 \
  --project="$PROJECT_ID" \
  --format='value(status.url)'
```

Then:

```bash
SERVICE_URL="$(gcloud run services describe vpet-simulator-level-1-2 \
  --region=asia-east1 \
  --project="$PROJECT_ID" \
  --format='value(status.url)')"

curl --fail "${SERVICE_URL}/healthz"
```

## Failure boundaries

- Missing `GCP_PROJECT_ID`: the configuration-validation step fails with an exact instruction.
- Missing authentication configuration: deployment does not begin.
- Test, syntax, container-build, or local-health failure: no production deployment occurs.
- Cloud Run deployment failure: the prior healthy revision continues serving traffic.
- Post-deployment health failure: the workflow is marked failed and exposes the service URL for investigation.
