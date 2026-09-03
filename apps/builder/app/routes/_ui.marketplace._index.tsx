import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { HomePage } from "~/marketplace/pages/Home";
import { prisma } from "@webstudio-is/prisma-client";
import type { MarketplaceProduct } from "@webstudio-is/project-build";
import { builderUrl } from "~/shared/router-utils/path-utils";

type MarketplaceTemplate = MarketplaceProduct & {
  id: string;
  projectId: string;
  authorizationToken?: string | null;
  previewUrl: string;
};

type MarketplaceProject = Awaited<ReturnType<typeof loadProjects>>[number];

const loadProjects = () =>
  prisma.project.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      previewImageAsset: true,
      build: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

export async function loader({ request }: LoaderFunctionArgs) {
  const [categories, projects] = await Promise.all([
    prisma.marketplaceCategory.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    }),
    loadProjects(),
  ]);

  const templates: MarketplaceTemplate[] = projects
    .map((project: MarketplaceProject) => {
      try {
        const parsedProduct = JSON.parse(
          project.build[0]?.marketplaceProduct ?? "{}"
        );
        return {
          id: project.id,
          projectId: project.id,
          authorizationToken: null,
          name: parsedProduct.name || project.title,
          category: parsedProduct.category || "pageTemplates",
          description:
            parsedProduct.description || `Start with ${project.title}`,
          ...parsedProduct,
          previewUrl:
            parsedProduct.demoUrl ??
            builderUrl({
              projectId: project.id,
              origin: new URL(request.url).origin,
              mode: "preview",
            }),
          thumbnailAssetId: project.previewImageAsset
            ? `/cgi/asset/${project.previewImageAsset.name}`
            : parsedProduct.thumbnailAssetId,
        };
      } catch {
        return null;
      }
    })
    .filter(
      (template: MarketplaceTemplate | null): template is MarketplaceTemplate =>
        template !== null
    );

  return json({ categories, templates });
}

export default function MarketplaceHomeRoute() {
  const { categories, templates } = useLoaderData<typeof loader>();

  return <HomePage categories={categories} templates={templates} />;
}
