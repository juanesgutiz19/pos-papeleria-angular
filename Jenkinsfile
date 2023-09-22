@Library('ceiba-jenkins-library') _
pipeline {

    // Donde se va a ejecutar el Pipeline
    agent {
        label 'Slave_Induccion'
    }

    // Opciones específicas de Pipeline dentro del Pipeline
    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
        disableConcurrentBuilds()
    }

    triggers {
        pollSCM('* * * * *')
    }

    tools {
      nodejs "NodeJS14"
    }

    //Aquí comienzan los “items” del Pipeline
    stages {
        stage('Checkout') {
            steps {
                echo "------------>Checkout<------------"
                checkout scm
            }
        }
        
        stage('NPM Install') {
            steps {
                echo "------------>Installing<------------"
                withEnv(['NPM_CONFIG_LOGLEVEL=warn']) {
                    sh 'npm install --force'
                }
            }
        }

        stage('Unit Test') {
            steps {
                echo "------------>Testing<------------"
                sh 'npm run test --no-watch --code-coverage'
            }
        }

        /*stage('Test end-to-end') {
            steps{
                echo "------------>Testing Protractor<------------"
                sh 'npm run e2e'
            }
        }*/
        
        stage('Static Code Analysis') {
            steps {
                echo "------------>Análisis de código estático<------------"
                sonarqubeMasQualityGatesP(
                        sonarKey:'co.com.ceiba.adn:papeleria-front-juan.gutierrez',
                        sonarName:'"ADN-PapeleriaFront(juan.gutierrez)"',
                        sonarPathProperties:'./sonar-project.properties')
            }
        }

        stage('Build') {
            steps {
                echo "------------>Build<------------"
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'This will run only if successful'
            updateGitlabCommitStatus name: 'Continuous Integration Jenkins', state: 'success'
        }
        failure {
            echo 'This will run only if failed'
            mail (
                to: 'juan.gutierrez@ceiba.com.co',
                subject: "Failed Pipeline Frontend: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
            )
        }
    }
}