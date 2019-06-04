## Challenge
---
For this challenge I decided to make a simple work queue process for checking if words are a Palindrome. Both the API and Worker are written in Typescript using Bull Queue Library to handle the Pub/Sub in Redis. All the services are deployed with Kubernetes and built with Docker.

I didn't get to spend too much time on this challenge due to a busy schedule and my daughters first birthday. There is lots of room for improvement and I wouldn't be confident with shipping this to production or even as a POC. 

I was attempting to spin up Prometheus/Grafana to monitor the K8s pods and Work Queue. Due to time constraints I wasn't able to get it working correctly. I believe this is due to Docker/K8s limitations on my machine. 

---

###### Are there any shortcomings of the code?

Yes, right off the bat I a missing unit and integration tests for the API and Worker. I am also not handling all possible edge cases or proper error handling. Currently if a job on the queue has failed or stalled it will not be removed from redis. 

I would also look into a different queue library such as node-celery and run Python/celery on the worker.

I used Node/Typescript because I was more familiar with the language and haven't had much of a chance to play around with GoLang. Using node has added it's own limitations when it comes to processing requests concurrently. 
    
###### How might this project be scaled?

We can scale horizontally by scaling the worker pod and increasing the replica count in the worker k8s deployment yaml.

Adding multiple API replicas and implementing a load balancer to increase request throughput.

Instead of managing a Redis cluster ourself, using a fully managed solution like Cloud Pub/Sub / SQS.

###### How might one approach doing sequential versus parallel tasks?

In the current system to achieve sequential processing we would drop the worker replica count down to 1. The queue will treat the jobs on a First In First Out basis.  

