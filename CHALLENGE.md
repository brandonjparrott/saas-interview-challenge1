## Challenge
---
For this challenge I decided to make a simple work queue system for checking if words are a Palindrome. Both the API and Worker are written in Typescript using Bull Queue Library to handle the Pub/Sub in Redis. All the services are deployed with Kubernetes and built with Docker.

I didn't get to spend too much time on this challenge due to a busy schedule and my daughters first birthday. There is lots of room for improvement.

I was attempting to spin up Prometheus/Grafana to monitor the K8s pods and Work Queue. Due to time constraints I wasn't able to get it working correctly. I believe this is due to Docker/K8s limitations on my machine. The Grafana pod wouldn't start because of insufficient memory.

---

###### Are there any shortcomings of the code?

Yes, right off the bat I a missing some unit and integration tests for the API and Worker. I am also not handling all possible edge cases or proper error handling. Currently if a job on the queue has failed or became stale they will not be removed from redis.

When I decided to use the Bull library to manage the redis queue, I didn't vet the project enough. They do not provide a easy way to unit test the library and it would be too time consuming to mock every redis call being made. If I had to do this again I would look into node-celery or use a custom implementation with AWS or Google Cloud. 

I used Node/Typescript because I was more familiar with the language and haven't had much of a chance to play around with GoLang. Using node has added it's own limitations and difficulties when it comes to processing requests concurrently. 
    
###### How might this project be scaled?

Scaling horizontally can be accomplished by increasing the worker pod replica count. This will alow us to process words at a higher rate. 

In production, I would want the API to have two replicas and place a load balancer in front of it. Can be scaled if we expect high volume.

Instead of managing a Redis cluster ourself, using a fully managed solution like Cloud Pub/Sub / SQS.

###### How might one approach doing sequential versus parallel tasks?

In the current system to achieve sequential processing we would drop the worker count down to 1. The queue will treat the jobs on a FIFO basis.  

If we needed to run tasks through multiple workers that handle a different part of the job. Implementing job chaining would give us the ability to run a specific job through the required workers. If at anytime a job failed it would be thrown into the failed message queue and the job would not continue on to the next worker in the chain.
