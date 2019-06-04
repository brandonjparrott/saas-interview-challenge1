#!/bin/bash

kubectl delete -f ./kube/redis.yaml

kubectl delete -f ./kube/api.yaml

kubectl delete -f ./kube/worker.yaml