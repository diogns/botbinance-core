@Library('aunalibraries@master') _

pipeline {
    agent {
        kubernetes {
            inheritFrom 'jenkins-slave'
        }
    }

    environment {
        ENVIRONMENT = commonFunctions.getEnvironment()
        ENVIRONMENT_REPORT = commonFunctions.getEnvironmentReport()
        PROJECT_NAME = 'template-ms'
        SNYK_TOKEN = credentials('snyk-vaulttext-token')
        DOCKERHUB_USER = credentials('dockerhub-vaulttext-user')
        DOCKERHUB_PASSWORD = credentials('dockerhub-vaulttext-key')
        SHORT_COMMIT = commonFunctions.getShortCommitId()
        PULUMI_CONFIG_PASSPHRASE = configManager.get_pulumi_passphrase("${PROJECT_NAME}")
        PULUMIYAML = configManager.create_file_pulumi("${PROJECT_NAME}")
    }

    stages {
        stage('Initialize'){
            steps{
                script{
                    emailNotification notificationType: 'build'
                    sh (returnStdout: false, script: 'docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASSWORD}', label: "Login to docker hub ...")
                    sh (returnStdout: false, script: 'curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -', label: "Downloading Node 16.x ...")
                    sh (returnStdout: false, script: 'sudo apt-get install -y nodejs', label: "Installing Node 16 ...")
                    sh (returnStdout: false, script: 'bash ci/codeartifact.sh npm-all', label: "Configuring Codeartifact npm-all Repository ...")
                    sh (returnStdout: false, script: 'sudo npm install -g yarn', label: "Installing Yarn ...")
                }
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    updateGitlabCommitStatus name: 'build', state: 'running'
                    docker.image('node:lts').inside('-u 0') {
                        sh (returnStdout: false, script: "yarn install", label: "Installing dependencies ...")
                    }
                }
            }
        }

        stage('Download Config files'){
            steps {
                script{
                    s3Download(file: "infra/policy-config.json", bucket: "auna-devops-jenkins-artifact-shared", path: "jenkins/pulumi/iac-policies/policy-config.json", force: true)
                    sh (returnStdout: false, script: "aws s3 cp s3://auna-devops-jenkins-artifact-shared/jenkins/pulumi/iac-policies/check-required-tags-policy-pack ${workspace}/infra/policy-pack --recursive", label: "Download policy resource ...")
               }
            }
        }

        stage('Infrastructure Provisioning'){
            steps {
                script{
                    docker.image('pulumi/pulumi-nodejs:latest').inside('-u 0 --entrypoint \'\'') {
                        withAWS(credentials: 'aws-devops-iac', region:'us-east-1') {
                            sh (returnStdout: false, script: "pulumi plugin install resource aws v4.27.1", label: "installing pulumi plugin aws v4.27.1")
                            sh (returnStdout: false, script: "pulumi login s3://auna-devops-jenkins-stack/${PROJECT_NAME}/", label: "Loggin in S3 ...")
                            sh (returnStdout: false, script: "pulumi stack select ${ENVIRONMENT} --cwd infra/ --non-interactive --create", label: "Selecting stack ...")
                            //sh (returnStdout: false, script: "pulumi cancel --yes --cwd infra", label: "Cancel stack ...")
                            sh (returnStdout: false, script: "pulumi refresh --yes --cwd infra", label: "Refreshing stack ...")
                            //sh (returnStdout: false, script: "pulumi destroy --yes --cwd infra", label: "destroy ...")
                            sh (returnStdout: false, script: "pulumi up --yes --cwd infra --policy-pack ./policy-pack --policy-pack-config ./policy-config.json", label: "Deploying stack ...")

                            FULL_REPOSITORY_NAME = sh( script: 'pulumi stack output apiEcrUrl --cwd infra', returnStdout: true).trim()
                            TASK_DEFINITION_ARN = sh( script: 'pulumi stack output taskDefinitionArn --cwd infra', returnStdout: true).trim()
                            SERVICE_NAME = sh( script: 'pulumi stack output serviceName --cwd infra', returnStdout: true).trim()
                            CLUSTER_ARN = sh( script: 'pulumi stack output ecsClusterArn --cwd infra', returnStdout: true).trim()
                        }
                    }
                }
            }
        }

        stage('Unit Test') {
            when {
                expression { commonFunctions.isPipelineCommit() }
            }
            steps {
                script {
                    docker.image('node:lts').inside('-u 0') {
                        sh (returnStdout: false, script: "yarn test:cov", label: "Running Unit Test ...")
                    }
                    s3Upload(file: "reports/test-result/unit/", bucket: "auna-devops-jenkins-artifact-report", path: "${PROJECT_NAME}/${ENVIRONMENT_REPORT}/${BUILD_NUMBER}/test/unit/")
                }
            }
        }

        stage("Static Code Analysis") {
            when {
                expression { commonFunctions.isPipelineCommit() }
            }
            steps {
                script {
                    docker.image('sonarsource/sonar-scanner-cli:4.6').inside('-u 0') {
                      withSonarQubeEnv('SonarQube Auna App') {
                          sonarQubeScan projectKey: "${PROJECT_NAME}-${ENVIRONMENT}", projectName: "${PROJECT_NAME}-${ENVIRONMENT}", projectVersion: SHORT_COMMIT
                      }
                    }
                }
            }
        }

        stage("Quality Gate") {
            when {
                expression { commonFunctions.isPipelineCommit() }
            }
            steps {
                sleep(30)
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage("Build") {
            steps {
                script {
                    def dataYaml = readYaml file: "infra/Pulumi.${ENVIRONMENT}.yaml"
                    IMAGE = load "${workspace}/ci/build.groovy"
                    BUILD_PARAMETERS = IMAGE.getParameters(dataYaml)
                    docker.build("${FULL_REPOSITORY_NAME}:latest").tag(SHORT_COMMIT)
                }
            }
        }

        stage("Security Test") {
            when {
                expression { commonFunctions.isPipelineCommit() }
            }
            steps {
                script {
                    docker.image("snyk/snyk-cli:docker").inside("-u 0 -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=''"){

                        def fileName = "results-container-${SHORT_COMMIT}"
                        snykScanImage(
                            image: "${FULL_REPOSITORY_NAME}:latest",
                            jsonOutputFileName: fileName,
                            dockerImageFile: 'Dockerfile',
                            excludeBaseImage: true,
                            { s3Upload(file: "${fileName}.html", bucket: "auna-devops-jenkins-artifact-report", path: "${PROJECT_NAME}/${ENVIRONMENT_REPORT}/${BUILD_NUMBER}/security/snyk/${fileName}.html") }
                        )
                    }
                }
            }
        }

        stage("Publish Artifacts") {
            steps {
                script {
                    IMAGE.push(FULL_REPOSITORY_NAME, BUILD_PARAMETERS.accountId, BUILD_PARAMETERS.region)
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (commonFunctions.isProduction()) {
                      emailNotification notificationType: 'approve'

                      def result = input(
                        id: 'isDeploy',
                        ok: 'Accept',
                        message: '¿Do you wish to deploy in Production?',
                        BUILD_PARAMETERS: [
                          booleanParam(defaultValue: true, name: 'Deploy in Production')
                        ]
                      );

                      if (!result) return
                    }

                    withAWS(credentials: 'aws-devops-iac', region:'us-east-1') {
                        withAWS(roleAccount: "${accountToDeploy}", role:'devops-jenkins-role-iac') {
                          def script = "aws ecs update-service --cluster ${CLUSTER_ARN} --service ${SERVICE_NAME} --task-definition ${TASK_DEFINITION_ARN} --desired-count 1 --force-new-deployment"
                          DEPLOYMENT = sh (returnStdout: true, script: script, label: "Update service ...").trim()

                          timeout(time: 10, unit: 'MINUTES') {
                              sh (returnStdout: false, script: "aws ecs wait services-stable --cluster ${CLUSTER_ARN}  --service ${SERVICE_NAME}", label: "Waiting for deployment ...")
                          }
                        }
                    }

                }
            }
        }

        stage('Post Deploy Test') {
            when {
                expression { commonFunctions.isPipelineCommit() }
            }
            steps {
                script {
                    docker.image('node:lts').inside('-u 0') {
                        sh (returnStdout: false, script: "echo 'running e2e'", label: "Running e2e test ...")
                    }
                }
            }
        }
    }

    post {
        always{
            sh (returnStdout: false, script: "docker system prune -a -f", label: "Cleanning docker components ...")
            script{
                emailNotification notificationType: 'build', buildStatus: currentBuild.result
            }
        }

        cleanup {
            cleanWs()
        }
    }
}
