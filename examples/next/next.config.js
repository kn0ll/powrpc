// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nextPlugin } = require("@powerpc/server-next");

module.exports = nextPlugin(/pages\/api\/.*/)({});
