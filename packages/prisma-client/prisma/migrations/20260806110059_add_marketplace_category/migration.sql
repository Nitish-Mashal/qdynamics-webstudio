-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "domainsVirtual" DROP CONSTRAINT "domainsVirtual_domainId_fkey";

-- DropForeignKey
ALTER TABLE "domainsVirtual" DROP CONSTRAINT "domainsVirtual_projectId_fkey";

-- DropForeignKey
ALTER TABLE "latestBuildVirtual" DROP CONSTRAINT "latestBuildVirtual_buildId_fkey";

-- DropForeignKey
ALTER TABLE "latestBuildVirtual" DROP CONSTRAINT "latestBuildVirtual_domainsVirtualId_fkey";

-- DropForeignKey
ALTER TABLE "latestBuildVirtual" DROP CONSTRAINT "latestBuildVirtual_projectId_fkey";

-- DropIndex
DROP INDEX "WorkspaceMember_userId_idx";

-- AlterTable
ALTER TABLE "AuthorizationToken" DROP COLUMN "canPublish";

-- AlterTable
ALTER TABLE "Build" DROP COLUMN "isCleaned";

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "workspaceId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_pkey",
ALTER COLUMN "workspaceId" SET DATA TYPE TEXT,
ADD CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("workspaceId", "userId");

-- DropTable
DROP TABLE "domainsVirtual";

-- DropTable
DROP TABLE "latestBuildVirtual";

-- CreateTable
CREATE TABLE "MarketplaceCategory" (
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
CREATE UNIQUE INDEX "MarketplaceCategory_name_key" ON "MarketplaceCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MarketplaceCategory_slug_key" ON "MarketplaceCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_userId_isDefault_key" ON "Workspace"("userId", "isDefault");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

