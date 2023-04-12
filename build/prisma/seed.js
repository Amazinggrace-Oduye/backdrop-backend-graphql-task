"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.user.deleteMany({});
    await prisma.user.create({
        data: {
            name: "Amazing",
        },
    });
    await prisma.user.create({
        data: {
            name: "Nedu",
        },
    });
    await prisma.user.create({
        data: {
            name: "Adam",
        },
    });
}
main()
    .catch((e) => {
    console.log(e);
    process.exit(1);
})
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=seed.js.map