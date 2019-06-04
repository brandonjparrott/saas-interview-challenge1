#!/bin/bash

kubectl apply -f ./kube/redis.yaml

kubectl apply -f ./kube/api.yaml

kubectl apply -f ./kube/worker.yaml