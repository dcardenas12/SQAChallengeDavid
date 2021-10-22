pipeline{
    agent any
    tools {
        nodejs 'node'
    }
    options {
        timeout(activity: true, time: 2)
    }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
            }
        }
        stage('test') {
            steps {
                sh './node_modules/.bin/wdio wdio.conf.js'
            }
        }
    }    
}