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
	}

	// The options directive is for configuration that applies to the whole job.
	options {
		// Keep 10 last builds only
		buildDiscarder(logRotator(numToKeepStr:'10'))
	}

}
