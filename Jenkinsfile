pipeline {
    agent any
    stages {
        stage('Build') {
            when {
                expression { BRANCH_NAME ==~ /(develop|main)/ }
            }
            steps {
                sh 'docker-compose -f docker-compose.build.yaml build'
                sh 'docker-compose -f docker-compose.build.yaml push'
            }
        }
        // stage('Deploy') {
        //     when {
        //         expression { BRANCH_NAME ==~ /(develop|main)/ }
        //     }
        //     steps {
        //         sh '/home/alexizzarevalo/.local/bin/fab2 deploy'
        //     }
        // }
        stage('Deploy k8s') {
            when {
                expression { BRANCH_NAME ==~ /(develop|main)/ }
            }
            steps {
               // sh '/usr/local/bin/kubectl delete deployments addbooks authentication catalogos compras editbooks editorial viewbooks frontend bitacora'
                sh '/usr/local/bin/kubectl apply -R -f ./kubernetes/services/'
            }
        }
    }
}
