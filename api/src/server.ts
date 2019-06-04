import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import * as bodyParser from "body-parser";
import { TaskController } from "./controllers/TaskController";

class ApiServer extends Server {

    /**
     * Server Started log string
     */
    private readonly SERVER_STARTED = "API v1 started on port: ";

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.initializeControllers();
    }

    /**
     * Start Server
     * 
     * @param port {string} - API Port to listen too
     */
    public start(port: string): void {
        this.app.get("*", (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }

    /**
     * Initialize all the controllers for the API server
     */
    private initializeControllers(): void {
        const taskController = new TaskController();
        super.addControllers([taskController]);
    }

}

export default ApiServer;
