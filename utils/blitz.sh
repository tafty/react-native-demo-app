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

echo "Clearing caches"
watchman watch-del-all
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*

echo "Delete the potentially leathal test folders"
LOCATION="./src/data/__tests__/"

for folder in "$LOCATION"*; do
    [ -d "$folder" ] || continue
    echo "$folder"
    rm -rf "$folder"
done

echo "Cleaning Android build and gradle"
rm -rf ./android/build/
rm -rf ./android/.gradle
rm -rf $HOME/.gradle/caches/

echo "Cleaning iOS build"
rm -rf ./ios/build/

echo "Removing key.note"
rm -rf ./key.note

echo "Removing node_modules"
rm -rf ./node_modules/

echo "Cleaning NPM Cache"
npm cache clean --force

echo "Re-installnig NPM modules"
npm install

echo "Cleaning Android build and gradle"
cd android
./gradlew cleanBuildCache
cd ..

echo "Re-installing PODs"
cd ios
rm -rf Pods
rm -rf Podfile.lock
bundle exec pod repo update
bundle exec pod install
cd ..

echo "You have been blitzed \o/"
