const generated = require("./src/__generated__/index.js");
const { PrismaClient, Prisma } = generated;

exports.Prisma = Prisma;
exports.PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
exports.Decimal = Prisma.Decimal;

const logPrisma = process.env.NODE_ENV === "production";

exports.createPrisma = ({ datasourceUrl, timeout = 5000, maxWait = 2000 }) => {
    return new PrismaClient({
        datasourceUrl,
        transactionOptions: {
            timeout,
            maxWait,
        },
    });
};

exports.prisma =
    global.prisma ||
    new PrismaClient({
        ...(logPrisma
            ? {
                log: [
                    { emit: "event", level: "query" },
                    { emit: "stdout", level: "error" },
                    { emit: "stdout", level: "info" },
                    { emit: "stdout", level: "warn" },
                ],
            }
            : {
                log: [
                    { emit: "stdout", level: "error" },
                    { emit: "stdout", level: "info" },
                    { emit: "stdout", level: "warn" },
                ],
            }),
    });

exports.prisma.$on("query", (error) => {
    console.info(
        "Query: " +
        error.query
            .replace(/"public"/g, "")
            .replace(/"Project"/g, "")
            .replace(/"Build"/g, "")
            .replace(/"AuthorizationToken"/g, "")
            .replace(/"Asset"/g, ""),
    );

    console.info("Params: " + error.params.slice(0, 200));
    console.info("Duration: " + error.duration + "ms");
});

if (process.env.NODE_ENV !== "production") {
    global.prisma = exports.prisma;
}
