import ApiServer from "./server";
import * as config from "./config";

// Create API Server instance
const server = new ApiServer();

// Start Server
server.start(config.PORT);
