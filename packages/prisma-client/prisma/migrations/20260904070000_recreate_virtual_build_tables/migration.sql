-- Recreate domainsVirtual table
DROP TABLE IF EXISTS "domainsVirtual" CASCADE;

CREATE TABLE "domainsVirtual" (
    "id" text PRIMARY KEY NOT NULL,
    "domainId" text REFERENCES "Domain" (id) NOT NULL,
    "projectId" text REFERENCES "Project" (id) NOT NULL,
    "domain" text NOT NULL,
    "status" "DomainStatus" NOT NULL DEFAULT 'INITIALIZING'::"DomainStatus",
    "error" text,
    "domainTxtRecord" text,
    "expectedTxtRecord" text NOT NULL,
    "cname" text NOT NULL,
    "verified" boolean NOT NULL DEFAULT false,
    "createdAt" timestamp(3) with time zone NOT NULL,
    "updatedAt" timestamp(3) with time zone NOT NULL
);

COMMENT ON TABLE "domainsVirtual" IS 'Virtual table representing domains related to each project. This table enforces a 1-1 relationship with the Project table and is used for API interaction (postgrest types).';

CREATE OR REPLACE FUNCTION "domainsVirtual"("Project")
RETURNS SETOF "domainsVirtual" AS $$
    SELECT
        "Domain".id || '-' || "ProjectDomain"."projectId" as id,
        "Domain".id AS "domainId",
        "ProjectDomain"."projectId",
        "Domain".domain,
        "Domain".status,
        "Domain".error,
        "Domain"."txtRecord" AS "domainTxtRecord",
        "ProjectDomain"."txtRecord" AS "expectedTxtRecord",
        "ProjectDomain"."cname" AS "cname",
        CASE
            WHEN "Domain"."txtRecord" = "ProjectDomain"."txtRecord" THEN true
            ELSE false
        END AS "verified",
        "ProjectDomain"."createdAt",
        "Domain"."updatedAt"
    FROM
        "Domain"
    JOIN
        "ProjectDomain" ON "Domain".id = "ProjectDomain"."domainId"
    WHERE
        "ProjectDomain"."projectId" = $1.id;
$$
STABLE
LANGUAGE sql;

COMMENT ON FUNCTION "domainsVirtual"("Project") IS 'Function that retrieves domain-related data for a given project by joining the Domain and ProjectDomain tables.';

-- Recreate latestBuildVirtual table (with updatedAt already included)
DROP TABLE IF EXISTS "latestBuildVirtual" CASCADE;

CREATE TABLE "latestBuildVirtual" (
    "buildId" text REFERENCES "Build" (id) unique NOT NULL,
    "projectId" text PRIMARY KEY REFERENCES "Project" (id) NOT NULL,
    "domainsVirtualId" text REFERENCES "domainsVirtual" ("id") unique NOT NULL,
    domain text NOT NULL,
    "createdAt" timestamp(3) with time zone NOT NULL,
    "publishStatus" "PublishStatus" NOT NULL,
    "updatedAt" timestamp(3) with time zone NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE "latestBuildVirtual" IS 'Virtual table representing the latest build for each project, enforcing a 1-1 relationship with the Project table. Used ONLY for postgrest types';
COMMENT ON COLUMN "public"."latestBuildVirtual"."updatedAt" IS 'Timestamp indicating when the Build was last updated';

-- Function: latestBuildVirtual(Project)
CREATE OR REPLACE FUNCTION "latestBuildVirtual"("Project") RETURNS SETOF "latestBuildVirtual" ROWS 1 AS $$
SELECT
  b.id AS "buildId",
  b."projectId",
  '' as "domainsVirtualId",
  CASE
    WHEN (b.deployment :: jsonb ->> 'projectDomain') = p.domain
    OR (b.deployment :: jsonb -> 'domains') @> to_jsonb(array [p.domain]) THEN p.domain
    ELSE d.domain
  END AS "domain",
  b."createdAt",
  b."publishStatus",
  b."updatedAt"
FROM
  "Build" b
  JOIN "Project" p ON b."projectId" = p.id
  LEFT JOIN "ProjectDomain" pd ON pd."projectId" = p.id
  LEFT JOIN "Domain" d ON d.id = pd."domainId"
WHERE
  b."projectId" = $1.id
  AND b.deployment IS NOT NULL
  AND (
    (b.deployment :: jsonb ->> 'destination') IS NULL
    OR (b.deployment :: jsonb ->> 'destination') = 'saas'
  )
  AND (
    (b.deployment :: jsonb ->> 'projectDomain') = p.domain
    OR (b.deployment :: jsonb -> 'domains') @> to_jsonb(array [p.domain])
    OR (b.deployment :: jsonb -> 'domains') @> to_jsonb(array [d.domain])
  )
ORDER BY
  b."createdAt" DESC
LIMIT 1;
$$ STABLE LANGUAGE sql;

COMMENT ON FUNCTION "latestBuildVirtual"("Project") IS 'This function computes the latest build for a project.';

-- Function: latestBuildVirtual(domainsVirtual)
CREATE OR REPLACE FUNCTION "latestBuildVirtual"("domainsVirtual") RETURNS SETOF "latestBuildVirtual" ROWS 1 AS $$
SELECT
  b.id AS "buildId",
  b."projectId",
  '' as "domainsVirtualId",
  d."domain",
  b."createdAt",
  b."publishStatus",
  b."updatedAt"
FROM
  "Build" b
  JOIN "Domain" d ON d.id = $1."domainId"
WHERE
  b."projectId" = $1."projectId"
  AND b.deployment IS NOT NULL
  AND (b.deployment :: jsonb -> 'domains') @> to_jsonb(array [d.domain])
ORDER BY
  b."createdAt" DESC
LIMIT 1;
$$ STABLE LANGUAGE sql;

COMMENT ON FUNCTION "latestBuildVirtual"("domainsVirtual") IS 'Returns the latest build for a given project and domain as a computed field for PostgREST.';

-- Function: latestProjectDomainBuildVirtual(Project)
CREATE OR REPLACE FUNCTION "latestProjectDomainBuildVirtual"("Project") RETURNS SETOF "latestBuildVirtual" ROWS 1 AS $$
SELECT
  b.id AS "buildId",
  b."projectId",
  '' as "domainsVirtualId",
  p.domain AS "domain",
  b."createdAt",
  b."publishStatus",
  b."updatedAt"
FROM
  "Build" b
  JOIN "Project" p ON b."projectId" = p.id
  LEFT JOIN "ProjectDomain" pd ON pd."projectId" = p.id
WHERE
  b."projectId" = $1.id
  AND b.deployment IS NOT NULL
  AND (
    (b.deployment :: jsonb ->> 'destination') IS NULL
    OR (b.deployment :: jsonb ->> 'destination') = 'saas'
  )
  AND (
    (b.deployment :: jsonb ->> 'projectDomain') = p.domain
    OR (b.deployment :: jsonb -> 'domains') @> to_jsonb(array [p.domain])
  )
ORDER BY
  b."createdAt" DESC
LIMIT 1;
$$ STABLE LANGUAGE sql;

COMMENT ON FUNCTION "latestProjectDomainBuildVirtual"("Project") IS 'This function computes the latest build for a project domain.';

-- Function: latestBuildVirtual(DashboardProject) - final LATERAL version
DROP FUNCTION IF EXISTS "latestBuildVirtual"("DashboardProject");

CREATE OR REPLACE FUNCTION "latestBuildVirtual"("DashboardProject") RETURNS SETOF "latestBuildVirtual" ROWS 1 AS $$
SELECT
  lbv.*
FROM
  "Project" p,
  LATERAL "latestBuildVirtual"(p) lbv
WHERE
  p.id = $1.id
LIMIT 1;
$$ STABLE LANGUAGE sql;

COMMENT ON FUNCTION "latestBuildVirtual"("DashboardProject") IS 'Wrapper function to make latestBuildVirtual work with DashboardProject view for PostgREST computed fields.';

DO $$
DECLARE
  role_name TEXT;
BEGIN
  FOREACH role_name IN ARRAY ARRAY['anon', 'authenticated', 'service_role']
  LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = role_name) THEN
      EXECUTE format('GRANT EXECUTE ON FUNCTION "latestBuildVirtual"("DashboardProject") TO %I', role_name);
    END IF;
  END LOOP;
END $$;
