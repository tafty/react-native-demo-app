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

REGEX_PATTERN_SPACE=" "
GREEN='\033[0;32m'
NC='\033[0m' # No Color
RED='\033[0;31m'

while true; do
  echo -e "${GREEN}Enter project name e.g. MyNewApp:${NC}"
  read project_name

  if [[ $project_name =~ $REGEX_PATTERN_SPACE ]] || [ -z "${project_name// }" ]
  then
    echo -e "${RED}Project name is required and cannot contain whitespace${NC}"
  else
    break
  fi
done

echo -e "${GREEN}Would you like to enable or disable Firebase?${NC}"

select result in enabled disabled
do
  case $result in
    "enabled")
      break
      ;;
    "disabled")
      break
      ;;
    *)
      echo -e "${RED}Please select either 1 to enabled or 2 to disabled${NC}"
      ;;
  esac
done

utils/firebase_update.sh $project_name $result

if [ result == 'enabled' ]
then
  echo -e ""
  echo -e "${GREEN}You now need to update the variables prefixed with FIREBASE_APP_ID in fastlane/Fastfile${NC}"
  echo -e ""
  echo -e "${GREEN}You also need to put the following Firebase config files in place:${NC}"
  echo -e ""
  echo -e "1) Copy the Android Production Firebase JSON config to:"
  echo -e "   android/app/google-service.json"
  echo -e ""
  echo -e "2) Copy the Android Dev Firebase JSON config to:"
  echo -e "   android/app/src/debug/dev/google-service.json"
  echo -e "   android/app/src/release/dev/google-service.json"
  echo -e ""
  echo -e "3) Copy the Android QC Firebase JSON config to:"
  echo -e "   android/app/src/debug/qc/google-service.json"
  echo -e "   android/app/src/release/qc/google-service.json"
  echo -e ""
  echo -e "4) Copy the iOS Production Firebase plist config to:"
  echo -e "   fastlane/firebase/ios/production/GoogleService-info.plist"
  echo -e ""
  echo -e "5) Copy the iOS Dev Firebase plist config to:"
  echo -e "   ios/GoogleService-info.plist"
  echo -e ""
  echo -e "6) Copy the iOS QC Firebase plist config to:"
  echo -e "   fastlane/firebase/ios/qc/GoogleService-info.plist"
  echo -e ""
  echo -e "${GREEN}These files are available to download from the Firebase console.${NC}"
fi
