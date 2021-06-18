pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                sh 'which fab2'
                sh 'fab2 deploy'
            }
        }
    }
}