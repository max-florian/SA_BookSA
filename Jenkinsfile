pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                sh 'which fab2'
                sh '/home/alexizzarevalo/.local/bin/fab2 deploy'
            }
        }
    }
}