pipeline{
    agent any
    tools {
        nodejs 'node'
    }
    options {
        timeout(activity: true, time: 2)
    }
    parameters {
        choice choices: ['local', 'remote'], name: 'service'
        string defaultValue: 'chrome', name: 'browser', trim: true
        string defaultValue: 'login', name: 'suite', trim: true
    }
    stages {
        stage('build') {
            steps {
                sh "npm install"
            }
        }
        stage('test') {
            steps {
                withCredentials([usernamePassword(credentialsId: '1b06193e-bbbb-4c1e-b58b-a9e0ea180ab5', passwordVariable: 'USER_PASSWORD', usernameVariable: 'USER_EMAIL'), usernamePassword(credentialsId: '1b06193e-bbbb-4c1e-b58b-a9e0ea180ab5', passwordVariable: 'BROWSERSTACK_ACCESS_KEY', usernameVariable: 'BROWSERSTACK_USERNAME')]) {
                    sh "SERVICE=${params.service} BROWSER=${params.browser} ./node_modules/.bin/wdio wdio.conf.js --suite ${params.suite}"
                }
    }
        }
    }    
}