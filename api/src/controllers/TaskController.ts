import { Controller, Post, Get } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { Request, Response } from "express";
import { OK, UNPROCESSABLE_ENTITY } from "http-status-codes";
import { REDIS_CREATE_CLIENT } from "../services/redis";
import Queue from "bull";
import * as config from "../config";

@Controller("api/v1/task")
export class TaskController {

    /**
     * isPalindrome {GET}
     * 
     * This function handles GET Requests and checks to see if the given word
     * is a palindrome
     * 
     * @param req {Request} - Request Object
     * @param res {Response} - Response Object
     */
    @Get('isPalindrome/:word')
    private async isPalindromeGet(req: Request, res: Response) {
        // Create new Bull Queue instance
        const TaskQueue = new Queue(config.WORK_QUEUE, {
            createClient: REDIS_CREATE_CLIENT
        });

        // Add event listener for completed results
        TaskQueue.on('global:completed', async (jobId, result) => {
            if (taskJob.id === jobId) {
                let job = await TaskQueue.getJob(jobId);

                Logger.Info(`Removing job ${jobId} from queue`);
                await job.remove();

                Logger.Info(`Closing TaskQueue instance`);
                await TaskQueue.close();

                result = JSON.parse(result);

                return res.status(OK).json({
                    success: true,
                    word: result.word,
                    isPalindrome: result.isPalindrome
                });
            }
        });

        // Add word to our queue
        let taskJob = await TaskQueue.add('isPalindrome', { word: req.params.word }, { attempts: 1 });
        Logger.Info(`Word ${req.params.word} added to queue ${config.WORK_QUEUE}. Job ${taskJob.id}`);
    }

    /**
     * isPalindrome {POST}
     * 
     * This function handles a POST request with n number of words
     * 
     * @param req {Request} - Request Object
     * @param res {Response} - Response Object
     */
    @Post('isPalindrome')
    private async isPalindromePost(req: Request, res: Response) {
        // Create new Bull Queue instance
        const TaskQueue = new Queue(config.WORK_QUEUE, {
            createClient: REDIS_CREATE_CLIENT
        });

        // Check to make sure API request provided the required words param that is an Array
        if (!req.body.hasOwnProperty('words') || !Array.isArray(req.body.words)) {
            return res.status(UNPROCESSABLE_ENTITY).json({
                success: false,
                error_message: 'Must provide an array of words'
            });
        }

        const words: string[] = req.body.words;

        // Map of all jobs for the given task/request
        let taskJobs = new Map<any, string>();

        // Result array of all words that are a palindrome
        let palindromes: string[] = [];

        TaskQueue.on('global:completed', async (jobId, result) => {
            // get job from queue and remove it
            let job = await TaskQueue.getJob(jobId);
            await job.remove();

            // Only process the jobs that were created by our task
            if (taskJobs.has(jobId)) {
                Logger.Info(`Job ${jobId} has been processed. Result: ${result}`);

                result = JSON.parse(result);

                // Check results
                if (result.isPalindrome) {
                    palindromes.push(result.word);
                }

                // Delete job from jobIds map
                taskJobs.delete(jobId);

                // Once all jobs within our task are completed
                // close our queue connection and return response
                if (taskJobs.size === 0) {
                    Logger.Info('Task has been processed. Closing connection...');
                    await TaskQueue.close();
                    return res.status(OK).json({
                        success: true,
                        palindromes
                    });
                }
            }
        });

        // Add all words to queue
        words.forEach(async (word: string) => {
            let msg = { word };
            let job = await TaskQueue.add('isPalindrome', msg, { attempts: 1 });
            Logger.Info(`Word ${word} added to queue ${config.WORK_QUEUE}. Job ${job.id}`);
            taskJobs.set(job.id, word);
        });
    }

}
