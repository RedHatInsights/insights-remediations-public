# Get bonfire helper scripts
CICD_URL=https://raw.githubusercontent.com/RedHatInsights/bonfire/master/cicd
curl -s $CICD_URL/bootstrap.sh > .cicd_bootstrap.sh && source ./.cicd_bootstrap.sh

export IMAGE="quay.io/cloudservices/remediations"
export COMPONENT_NAME="remediatons"
export APP_NAME="remediations"

# build the PR commit change
source $CICD_ROOT/build.sh

# run nodejs unit tests
source $APP_ROOT/unit_test.sh
