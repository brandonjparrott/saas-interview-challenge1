## SAAS Interview Challenege
---
*Note: please read CHALLENGE.md*

### Prerequisites

```
    Docker Desktop installed locally
    Kubernetes enabled in Docker Desktop
    Node / NPM
```

### Build
---

To build the API and Worker docker image, you can run the script build-images.sh

`./build-images.sh`

You can also build them invidually using the following docker commands:

```bash
docker build -t forgerock-api ./api

docker build -t forgerock-worker ./worker
```

### Deploying it locally
---

Since we are not using GKE, I decided to use the built in kubernetes support that the Docker Desktop provides. 

Once you have enabled kubernetes with Docker Desktop, you must first set the context to docker-for-desktop

```
kubectl config use-context docker-for-desktop
```

##### Apply K8s Config

Using the launch script:

```./launch.sh```

```kubectl apply -f ./kube```

##### Delete K8s Config

```kubectl delete -f ./kube```

##### See running pods

```kubectl get pods```

### Usage
---

Currently the API provides two API endpoints, one is a GET endpoint that can check if a single word is a Palindrome. The other is a POST endpoint that can take an array of words and return only the words that are a Palindrome. 

##### GET Endpoint

`127.0.0.1:30036/api/v1/task/isPalindrome/:word`

Response:

```json
{"success":true,"word":"racecar","isPalindrome":true}
```

##### POST Endpoint

`127.0.0.1:30036/api/v1/task/isPalindrome`

Body: application/json

```json
{"words": ["racecar", "brandon", "cac"]}
```

Response:

```json
{
    "success": true,
    "palindromes": [
        "cac",
        "racecar"
    ]
}
```





