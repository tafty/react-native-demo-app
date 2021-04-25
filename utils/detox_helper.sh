#!/bin/bash
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
ROOT="${DIR//\/utils}"

echo "Changing directory to project root $ROOT"
cd $ROOT

GREEN='\033[0;32m'
NC='\033[0m' # No Color
RED='\033[0;31m'

SRC_APP_LOGBOX_IMPORT_DISABLED="import { LogBox } from 'react-native'"
SRC_APP_LOGBOX_IMPORT_ENABLED="// import { LogBox } from 'react-native'"
SRC_APP_LOGBOX_DISABLED="LogBox.ignoreAllLogs()"
SRC_APP_LOGBOX_ENABLED="// LogBox.ignoreAllLogs()"
SRC_CONFIG_CONFIG_JSON_DISABLED="\"isStubbed\": false,"
SRC_CONFIG_CONFIG_JSON_ENABLED="\"isStubbed\": true,"

stub_enabled="disabled"

if [ $1 == 'enabled' ]
then
  stub_enabled="enabled"
fi

set +x
echo -e "${GREEN}Yellow box warnings will be ${stub_enabled}${NC}"
#echo -e "${GREEN}Yellow box warnings and API stub will be ${stub_enabled}${NC}"
set -x

if [ $stub_enabled == 'enabled' ]
then
  sed -i '' -e "s%$SRC_APP_LOGBOX_IMPORT_DISABLED%$SRC_APP_LOGBOX_IMPORT_ENABLED%g" src/App.js
  sed -i '' -e "s%$SRC_APP_LOGBOX_DISABLED%$SRC_APP_LOGBOX_ENABLED%g" src/App.js
  sed -i '' -e "s%$SRC_CONFIG_CONFIG_JSON_DISABLED%$SRC_CONFIG_CONFIG_JSON_ENABLED%g" src/config/config.json
else
  sed -i '' -e "s%$SRC_APP_LOGBOX_IMPORT_ENABLED%$SRC_APP_LOGBOX_IMPORT_DISABLED%g" src/App.js
  sed -i '' -e "s%$SRC_APP_LOGBOX_ENABLED%$SRC_APP_LOGBOX_DISABLED%g" src/App.js
  sed -i '' -e "s%$SRC_CONFIG_CONFIG_JSON_ENABLED%$SRC_CONFIG_CONFIG_JSON_DISABLED%g" src/config/config.json
fi
