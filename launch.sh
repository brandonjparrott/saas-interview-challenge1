#!/bin/bash

kubectl create -f ./kube/redis.yaml

sleep 2

kubectl create -f ./kube/api.yaml

sleep 2

kubectl create -f ./kube/worker.yaml

# sleep 2 

# kubectl create -f ./kube/queue-exporter.yaml

# sleep 2

# kubectl create -f ./kube/monitoring-namespace.yaml

# sleep 2

# kubectl  create -f ./kube/grafana.yaml

# sleep 2

# kubectl create -f ./kube/prometheus.yaml