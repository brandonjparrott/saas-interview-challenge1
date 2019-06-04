## Challenge
---
For this challenge I decided to make a simple work queue process for checking if words are a Palindrome. Both the API and Worker are written in Typescript using Bull Queue Library to handle the Pub/Sub in Redis. All the services are deployed with Kubernetes and built with Docker.


---

###### Are there any shortcomings of the code?

Yes, this system is not production ready. I wasn't able to take the time to write the necessary tests and handle all possible edge cases. Using Node JS for the worker could also be problematic because Node is single threaded. 

Ideally I would want to deploy to a managed cluster like GKE and use a language that supports concurrency. 

Depending on the problem there could be multiple ways to implement a worker design pattern. Could get away with running a long living service that polls from the queue, or design a Kubernetes Job that spins up when a event is triggered.
    
    
###### How might this project be scaled?

Locally we can scale horizontally by scaling the worker pod and increasing the replica count.

Adding multiple API replicas and implementing a load balancer to increase request throughput.

Instead of managing a Redis cluster ourself, using a fully managed solution like Cloud Pub/Sub / SQS.

###### How might one approach doing sequential versus parallel tasks?

In the current system to achieve sequential processing we would drop the worker replica count down to 1. The queue will treat the jobs on a First In First Out basis.  

