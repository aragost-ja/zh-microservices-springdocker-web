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

		stage('Staging') {
			steps {
				echo 'Publishing to staging environment'
				lock('container-todo-web-staging') {
					sh 'docker stop todo-web-staging || true'  // Stop current container, ignore if fails
					sh 'docker rm todo-web-staging || true'  // remove current container, ignore if fails
					sh "docker run -d --name todo-web-staging -p 8881:80 --link todo-svc-staging:todo-svc todo-web:${env.BUILD_NUMBER}"
				}
			}
		}

		stage('Approve PROD deployment') {
			steps {
				milestone(50)
				timeout(time:5, unit:'HOURS') {
					input 'Promote to production?'
				}
				milestone(55)
			}
		}

		stage('Production') {
			steps {
				echo 'Publishing to production environment'
				lock('container-todo-web-prod') {
					sh 'docker stop todo-web-prod || true'  // Stop current container, ignore if fails
					sh 'docker rm todo-web-prod || true'  // remove current container, ignore if fails
					sh "docker run -d --name todo-web-prod -p 8891:80 --link todo-svc-prod:todo-svc todo-web:${env.BUILD_NUMBER}"
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
