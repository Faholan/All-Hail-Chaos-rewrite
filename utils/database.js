const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Disconnect
const disconnect = async () => {
  await prisma.$disconnect();
};

// Export the client
module.exports = { prisma, disconnect };

