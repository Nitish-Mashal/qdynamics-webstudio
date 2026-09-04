-- Drop dependent views (will recreate below)
DROP VIEW IF EXISTS "DashboardProject";
DROP VIEW IF EXISTS "WorkspaceProjectAuthorization";
DROP VIEW IF EXISTS published_builds;

-- CreateTable
CREATE TABLE IF NOT EXISTS "MarketplaceCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketplaceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "MarketplaceCategory_name_key" ON "MarketplaceCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "MarketplaceCategory_slug_key" ON "MarketplaceCategory"("slug");

-- Recreate dependent views
CREATE VIEW published_builds AS
SELECT
  build.id AS "buildId",
  build."projectId",
  build."createdAt",
  (
    SELECT string_agg(list.value, ', ')
    FROM jsonb_array_elements_text(build.deployment::jsonb -> 'domains') AS list(value)
  ) AS domains
FROM "Build" as build
WHERE build.deployment IS NOT NULL
ORDER BY build."projectId", build."createdAt" DESC;

CREATE VIEW "WorkspaceProjectAuthorization" AS
SELECT w."userId",
    p.id AS "projectId",
    'own'::text AS relation
   FROM "Workspace" w
     JOIN "Project" p ON p."workspaceId" = w.id
  WHERE w."isDeleted" = false AND p."isDeleted" = false
UNION ALL
 SELECT wm."userId",
    p.id AS "projectId",
    wm.relation::text AS relation
   FROM "WorkspaceMember" wm
     JOIN "Workspace" w ON w.id = wm."workspaceId"
     JOIN "Project" p ON p."workspaceId" = wm."workspaceId"
  WHERE wm."removedAt" IS NULL AND w."isDeleted" = false AND p."isDeleted" = false;

CREATE VIEW "DashboardProject" AS
SELECT
  id,
  title,
  tags,
  domain,
  "userId",
  "workspaceId",
  "isDeleted",
  "createdAt",
  "previewImageAssetId",
  "marketplaceApprovalStatus",
  (
    EXISTS (
      SELECT
        1
      FROM
        "Build"
      WHERE
        "Build"."projectId" = "Project".id
        AND "Build".deployment IS NOT NULL
    )
  ) AS "isPublished"
FROM
  "Project";
