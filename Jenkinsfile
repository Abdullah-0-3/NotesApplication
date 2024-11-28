pipeline {
    agent any

    stages {
        stage('Cloning Repository from Github') {
            steps {
                git branch: 'main', url: 'https://github.com/Abdullah-0-3/NotesApplication.git'
                echo "Repository Cloned"
            }
        }
        stage('Building Frontend Dockerimage') {
            steps {
                dir('frontend') {
                    script {
                        echo 'Building Frontend Dockerimage'
                        sh 'docker build -t muhammadabdullahabrar/notes-app:frontend .'
                        echo 'Frontend Dockerimage Built'
                    }
                }
            }
        }
        stage('Building Backend Dockerimage') {
            steps {
                dir('backend') {
                    script {
                        echo 'Building Backend Dockerimage'
                        sh 'docker build -t muhammadabdullahabrar/notes-app:backend .'
                        echo 'Backend Dockerimage Built'
                    }
                }
            }
        }
        stage('Pushing Images to Dockerhub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DockerCred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push muhammadabdullahabrar/notes-app:frontend
                        docker push muhammadabdullahabrar/notes-app:backend
                        docker logout
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                emailext(
                    subject: "Jenkins Pipeline Success: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                    body: "The pipeline succeeded. Check console output at ${env.BUILD_URL}\n\n",
                    to: 'abdullahabrar4843@gmail.com'
                )
            }
        }
        failure {
            script {
                emailext(
                    subject: "Jenkins Pipeline Failure: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                    body: "The pipeline failed. Check console output at ${env.BUILD_URL}\n\n",
                    to: 'abdullahabrar4843@gmail.com'
                )
            }
        }
        unstable {
            script {
                emailext(
                    subject: "Jenkins Pipeline Unstable: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                    body: "The pipeline completed but was unstable. Check console output at ${env.BUILD_URL}\n\n",
                    to: 'abdullahabrar4843@gmail.com'
                )
            }
        }
    }
}