import { z } from "zod";
import { router, procedure } from "./trpc";

export const PublishInput = z.object({
  buildId: z.string(),
  builderOrigin: z.string(),
  githubSha: z.string().optional(),
  destination: z.enum(["saas", "static"]),
  branchName: z.string(),
  logProjectName: z.string(),

  // Self-hosted publisher options
  renderMode: z.enum(["ssg", "ssr"]).default("ssg"),
  host: z.enum(["local", "cloudflare", "coolify", "ssh"]).default("local"),
  coolifyWebhookUrl: z.string().optional(),
  coolifyWebhookToken: z.string().optional(),
});

export const UnpublishInput = z.object({
  domain: z.string(),
});

export const Output = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
  }),
  z.object({
    success: z.literal(false),
    error: z.string(),
  }),
]);

export type PublisherCapabilities = {
  cloudflare: boolean;
  coolify: boolean;
  ssh: boolean;
  targets: string[];
};

const noCapabilities: PublisherCapabilities = {
  cloudflare: false,
  coolify: false,
  ssh: false,
  targets: [],
};

export const deploymentRouter = router({
  capabilities: procedure.query(async (): Promise<PublisherCapabilities> => {
    const publisherUrl = process.env.SELF_HOSTED_PUBLISHER_URL;

    if (publisherUrl === undefined) {
      return noCapabilities;
    }

    try {
      const response = await fetch(`${publisherUrl}/capabilities`);

      if (response.ok) {
        const data = (await response.json()) as Partial<PublisherCapabilities>;

        return {
          cloudflare: data.cloudflare ?? false,
          coolify: data.coolify ?? false,
          ssh: data.ssh ?? false,
          targets: data.targets ?? [],
        };
      }
    } catch {
      // Publisher unavailable.
    }

    return noCapabilities;
  }),

  publish: procedure
    .input(PublishInput)
    .output(Output)
    .mutation(async ({ input }) => {
      const publisherUrl = process.env.SELF_HOSTED_PUBLISHER_URL;

      if (publisherUrl === undefined) {
        return {
          success: false,
          error: "NOT_IMPLEMENTED",
        };
      }

      try {
        const response = await fetch(`${publisherUrl}/publish`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            buildId: input.buildId,
            builderOrigin: input.builderOrigin,
            renderMode: input.renderMode,
            host: input.host,
            coolifyWebhookUrl: input.coolifyWebhookUrl,
            coolifyWebhookToken: input.coolifyWebhookToken,
            destination: input.destination,
          }),
        });

        if (!response.ok) {
          const message = await response.text();

          return {
            success: false,
            error: `Publisher error: ${message.slice(0, 500)}`,
          };
        }

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error: `Failed to reach publisher service: ${
            error instanceof Error ? error.message : "unknown error"
          }`,
        };
      }
    }),

  unpublish: procedure
    .input(UnpublishInput)
    .output(Output)
    .mutation(async ({ input }) => {
      const publisherUrl = process.env.SELF_HOSTED_PUBLISHER_URL;

      if (publisherUrl === undefined) {
        return {
          success: false,
          error: "NOT_IMPLEMENTED",
        };
      }

      try {
        const response = await fetch(`${publisherUrl}/unpublish`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domain: input.domain,
          }),
        });

        if (!response.ok) {
          const message = await response.text();

          return {
            success: false,
            error: `Publisher error: ${message.slice(0, 500)}`,
          };
        }

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error: `Failed to reach publisher service: ${
            error instanceof Error ? error.message : "unknown error"
          }`,
        };
      }
    }),
});
