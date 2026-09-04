import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const generated = require("./__generated__/index.js");

const { PrismaClient, Prisma } = generated;
import type { Prisma as PrismaTypes } from "./__generated__";
export type {
  User,
  Build,
  Project,
  Asset,
  File,
  DashboardProject,
  AuthorizationToken,
  DomainStatus,
  Domain,
  PublishStatus,
  Product,
  $Enums,
} from "./__generated__/index.js";

export { Prisma };

export const { PrismaClientKnownRequestError, Decimal } = Prisma;

type PrismaClientInstance = InstanceType<typeof PrismaClient>;

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClientInstance | undefined;
}

const logPrisma = process.env.NODE_ENV === "production";

type PrismaClientOptions = {
  datasourceUrl: string;
  timeout?: number;
  maxWait?: number;
};

export const createPrisma = ({
  datasourceUrl,
  timeout = 5000,
  maxWait = 2000,
}: PrismaClientOptions) => {
  return new PrismaClient({
    datasourceUrl,
    transactionOptions: {
      timeout,
      maxWait,
    },
  });
};

// This fixes the issue with:
// "There are already 10 instances of Prisma Client actively running."
export const prisma =
  global.prisma ||
  new PrismaClient({
    ...(logPrisma
      ? {
          log: [
            { emit: "event", level: "query" },
            {
              emit: "stdout",
              level: "error",
            },
            {
              emit: "stdout",
              level: "info",
            },
            {
              emit: "stdout",
              level: "warn",
            },
          ],
        }
      : {
          log: [
            {
              emit: "stdout",
              level: "error",
            },
            {
              emit: "stdout",
              level: "info",
            },
            {
              emit: "stdout",
              level: "warn",
            },
          ],
        }),
  });

prisma.$on("query", (error: PrismaTypes.QueryEvent) => {
  // Try to minify the query as Vercel/New Relic log size is limited
  console.info(
    "Query: " +
      error.query
        .replace(/"public"./g, "")
        .replace(/"Project"./g, "")
        .replace(/"Build"./g, "")
        .replace(/"AuthorizationToken"./g, "")
        .replace(/"Asset"./g, "")
  );

  console.info("Params: " + error.params.slice(0, 200));

  console.info("Duration: " + error.duration + "ms");
});

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
