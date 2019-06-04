import { Logger } from "@overnightjs/logger";
import { FLIGHT_LOOKUP, queues } from "./services/queues";
import { isPalindrome } from "./services/isPalindrome";

/**
 * Task Queue
 */
const TaskQueue = queues[FLIGHT_LOOKUP];

Logger.Info(`Listening to queue: ${FLIGHT_LOOKUP}`);

TaskQueue.process('isPalindrome', (job, done) => {
    Logger.Info(`Processing job: ${job.id}. Checking to see if the word: ${job.data.word} is a palindrome.`);

    if (!job.data.hasOwnProperty('word') || job.data.word === '') {
        done(new Error("Invalid word. Cannot process job"));
    }

    done(null, {
        word: job.data.word,
        isPalindrome: isPalindrome(job.data.word)
    });
});
