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
                sh "SERVICE=$(params.service) BROWSER=$(params.browser) ./node_modules/.bin/wdio wdio.conf.js --suite $(params.suite)"
    }
        }
    }    
}