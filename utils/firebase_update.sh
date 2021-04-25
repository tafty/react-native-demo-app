#!/bin/bash

# Argument 1 must be the project name
# Argument 2 must be either 'enabled' or 'disabled'
#
# i.e.
#
#   ./firebase_update.sh MyProjetName enabled
#
# Or:
#
#   ./firebase_update.sh MyProjetName disabled

REGEX_PATTERN_SPACE=" "
GREEN='\033[0;32m'
NC='\033[0m' # No Color
RED='\033[0;31m'

ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_1="classpath 'com.google.gms:google-services:4.3.3'"
ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_2="classpath 'com.google.firebase:firebase-crashlytics-gradle:2.2.0'"
ANDROID_BUILD_GRADLE_PLUG_IN_1="apply plugin: 'com.google.gms.google-services'"
ANDROID_BUILD_GRADLE_PLUG_IN_2="apply plugin: 'com.google.firebase.crashlytics'"
ANDROID_BUILD_GRADLE_DEPENDENCIES="implementation 'com.google.firebase:firebase-analytics:17.2.2'"
IOS_PROJECT_APP_DELEGATE_IMPORT="#import <Firebase.h>"
IOS_PROJECT_APP_DELEGATE_CONFIG="FIRApp defaultApp"
IOS_PROJECT_APP_DELEGATE_CONFIG_ENABLED_REGEX="if (\[FIRApp defaultApp\] == nil) {"
IOS_PROJECT_APP_DELEGATE_CONFIG_ENABLED="if ([FIRApp defaultApp] == nil) {"
IOS_PROJECT_APP_DELEGATE_CONFIG_ENABLED_FULL="if ([FIRApp defaultApp] == nil) {¥    [FIRApp configure];¥  }"
IOS_PROJECT_APP_DELEGATE_CONFIG_DISABLED_REGEX="// if (\[FIRApp defaultApp\] == nil) { \[FIRApp configure\]; }"
IOS_PROJECT_APP_DELEGATE_CONFIG_DISABLED="// if ([FIRApp defaultApp] == nil) { [FIRApp configure]; }"
FASTLANE_FASTFILE_ENABLED="@UPLOAD_TO_FIREBASE_ENABLED = true"
FASTLANE_FASTFILE_DISABLED="@UPLOAD_TO_FIREBASE_ENABLED = false"
FASTLANE_PLUGINFILE="gem 'fastlane-plugin-firebase_app_distribution'"
SRC_APP_IMPORT_REACT_NATIVE_FIREBASE_CRASHLYTICS="import '@react-native-firebase/crashlytics'"

project_name=$1

if [[ $project_name =~ $REGEX_PATTERN_SPACE ]] || [ -z "${project_name// }" ]
then
  echo -e "${RED}Project name must be supplied as the first argument"
  exit
fi

if [ $2 == 'enabled' ]
then
  firebase_enabled="true"
else
  if [ $2 == 'disabled' ]
  then
    firebase_enabled="false"
  else
    echo -e "${RED}The second argument must be 'enabled' or 'disabled'"
    exit
  fi
fi

set -x

echo -e "${GREEN}Firebase in ${project_name} is to be ${2}${NC}"

if [ $firebase_enabled == 'true' ]
then
  npm install @react-native-firebase/app
  npm install @react-native-firebase/crashlytics

  set +x

  sed -i '' -e "s%// $ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_1%$ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_1%g" android/build.gradle
  sed -i '' -e "s%// $ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_2%$ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_2%g" android/build.gradle
  sed -i '' -e "s%// $ANDROID_BUILD_GRADLE_PLUG_IN_1%$ANDROID_BUILD_GRADLE_PLUG_IN_1%g" android/app/build.gradle
  sed -i '' -e "s%// $ANDROID_BUILD_GRADLE_PLUG_IN_2%$ANDROID_BUILD_GRADLE_PLUG_IN_2%g" android/app/build.gradle
  sed -i '' -e "s%// $ANDROID_BUILD_GRADLE_DEPENDENCIES%$ANDROID_BUILD_GRADLE_DEPENDENCIES%g" android/app/build.gradle
  sed -i '' -e "s%// $IOS_PROJECT_APP_DELEGATE_IMPORT%$IOS_PROJECT_APP_DELEGATE_IMPORT%g" ios/$project_name/AppDelegate.m

  sed -i '' -e "s%$IOS_PROJECT_APP_DELEGATE_CONFIG_DISABLED_REGEX%$IOS_PROJECT_APP_DELEGATE_CONFIG_ENABLED_FULL%g" ios/$project_name/AppDelegate.m
  mv ios/$project_name/AppDelegate.m ios/$project_name/AppDelegate.bak
  cat ios/$project_name/AppDelegate.bak | sed 's/¥/\'$'\n/g' > ios/$project_name/AppDelegate.m
  rm -rf ios/$project_name/AppDelegate.bak

  sed -i '' -e "s%$FASTLANE_FASTFILE_DISABLED%$FASTLANE_FASTFILE_ENABLED%g" fastlane/Fastfile
  sed -i '' -e "s%# $FASTLANE_PLUGINFILE%$FASTLANE_PLUGINFILE%g" fastlane/Pluginfile

  sed -i '' -e "s%// $SRC_APP_IMPORT_REACT_NATIVE_FIREBASE_CRASHLYTICS%$SRC_APP_IMPORT_REACT_NATIVE_FIREBASE_CRASHLYTICS%g" src/App.ts

else
  npm uninstall @react-native-firebase/crashlytics
  npm uninstall @react-native-firebase/app

  set +x

  sed -i '' -e "s%$ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_1%// $ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_1%g" android/build.gradle
  sed -i '' -e "s%$ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_2%// $ANDROID_BUILD_GRADLE_BUILDSCRIPT_DEPENDENCIES_CLASSPATH_2%g" android/build.gradle
  sed -i '' -e "s%$ANDROID_BUILD_GRADLE_PLUG_IN_1%// $ANDROID_BUILD_GRADLE_PLUG_IN_1%g" android/app/build.gradle
  sed -i '' -e "s%$ANDROID_BUILD_GRADLE_PLUG_IN_2%// $ANDROID_BUILD_GRADLE_PLUG_IN_2%g" android/app/build.gradle
  sed -i '' -e "s%$ANDROID_BUILD_GRADLE_DEPENDENCIES%// $ANDROID_BUILD_GRADLE_DEPENDENCIES%g" android/app/build.gradle
  sed -i '' -e "s%$IOS_PROJECT_APP_DELEGATE_IMPORT%// $IOS_PROJECT_APP_DELEGATE_IMPORT%g" ios/$project_name/AppDelegate.m
  
  lineNum=$(grep -n "${IOS_PROJECT_APP_DELEGATE_CONFIG}" ios/$project_name/AppDelegate.m | head -n 1 | cut -d: -f1)
  lineNumPlus1=$(($lineNum+1))
  lineNumPlus2=$(($lineNum+2))
  sed -i '' -e "${lineNumPlus2}d" ios/$project_name/AppDelegate.m
  sed -i '' -e "${lineNumPlus1}d" ios/$project_name/AppDelegate.m
  sed -i '' -e "s%$IOS_PROJECT_APP_DELEGATE_CONFIG_ENABLED_REGEX%$IOS_PROJECT_APP_DELEGATE_CONFIG_DISABLED%g" ios/$project_name/AppDelegate.m
  
  sed -i '' -e "s%$FASTLANE_FASTFILE_ENABLED%$FASTLANE_FASTFILE_DISABLED%g" fastlane/Fastfile

  sed -i '' -e "s%$FASTLANE_PLUGINFILE%# $FASTLANE_PLUGINFILE%g" fastlane/Pluginfile
  sed -i '' -e "s%$SRC_APP_IMPORT_REACT_NATIVE_FIREBASE_CRASHLYTICS%// $SRC_APP_IMPORT_REACT_NATIVE_FIREBASE_CRASHLYTICS%g" src/App.ts

  rm -rf ios/GoogleService-info.plist
  mv utils/assets/GoogleService-info.dummy.plist ios/GoogleService-info.plist
fi

  # TODO Firebase app IDs and config files
  # - android/app/google-service.json
  # - android/app/src/debug/dev/google-service.json
  # - android/app/src/release/dev/google-service.json
  # - android/app/src/debug/qc/google-service.json
  # - android/app/src/release/qc/google-service.json
  # - fastlane/Fastfile @FIREBASE_APP_ID_ANDROID_PRODUCTION
  # - fastlane/Fastfile @FIREBASE_APP_ID_ANDROID_QC
  # - fastlane/Fastfile @FIREBASE_APP_ID_IOS_PRODUCTION
  # - fastlane/Fastfile @FIREBASE_APP_ID_IOS_QC
  # - fastlane/firebase/ios/production/GoogleService-info.plist
  # - fastlane/firebase/ios/qc/GoogleService-info.plist
  # - ios/GoogleService-info.plist

set -x
echo "Cleaning Android cache..."
rm -rf $HOME/.gradle/caches/

echo "Cleaning Android build and gradle..."
cd android
./gradlew cleanBuildCache
cd ..

echo "Re-installing PODs..."

cd ios
rm -rf Pods
rm -rf Podfile.lock
pod repo update
pod install
cd ..

set +x
