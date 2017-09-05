#!groovy
pipeline {
	agent any

	tools {
		nodejs 'Node 6.x'
	}

	environment {
		BUILD_ID = "${currentBuild.number}"
	}

	stages {
		/* Uncomment if using explicit checkout
		stage('Checkout') {
			steps {
				checkout scm
			}
		}*/

		stage('Build') {
			steps {
				echo "Performing build of todo-web version ${BUILD_ID}"
				sh 'npm install'
				sh 'ng build --prod --aot'
			}
		}

		stage('Build Image') {
			steps {
				echo 'Creating docker image'
				script {
					def newApp = docker.build "todo-web:${env.BUILD_NUMBER}"
				}
			}
			post {
				success {
					withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'gogs-gituser', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
						sh("git tag -a build-${env.BUILD_NUMBER} -m 'Jenkins build success'")
						sh("git push http://${env.GIT_USERNAME}:${env.GIT_PASSWORD}@${DOCKER_GATEWAY_IP}:3000/gituser/todo-web.git --tags")
					}
				}
			}
		}
	}

	// The options directive is for configuration that applies to the whole job.
	options {
		// Keep 10 last builds only
		buildDiscarder(logRotator(numToKeepStr:'10'))
	}

}
