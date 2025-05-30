pipeline {
    agent any
    tools {
        nodejs 'Node18' // Usa la configuración de Node.js
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/jfragoso/my-nodejs-app.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def app = docker.build("my-nodejs-app:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Push to Docker Hub') { // Opcional
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        def app = docker.image("my-nodejs-app:${env.BUILD_NUMBER}")
                        app.push()
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs() // Limpia el workspace después de ejecutar
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
