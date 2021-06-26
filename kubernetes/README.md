# Kubernetes Book Services

Books SA

## Secret from env files

    kubectl create secret generic auth-secret --from-file=auth.env
    kubectl create secret generic db-secret --from-file=.env

## Run services

    kubectl apply -R -f ./kubernetes/services/

# References 

https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/
https://stackoverflow.com/questions/54106725/docker-kubernetes-mac-autoscaler-unable-to-find-metrics
https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-metrics-apis
https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#horizontalpodautoscalerspec-v1-autoscaling
https://github.com/stakater/Reloader#readme