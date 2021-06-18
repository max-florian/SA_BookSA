pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose -f docker-compose.build.yaml build'
                sh 'docker-compose -f docker-compose.build.yaml push'
            }
        }
        stage('Deploy') {
            steps {
                sh 'fab2 deploy'
            }
        }
    }
}