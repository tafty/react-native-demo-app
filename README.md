# Demo App

## Setup

_**NB Due to a limitation of Realm you should only install version 10.x.x of Node**_

_**NB Do not install `npm` using `sudo` as this will lead to permissions problems when running the app**_

Follow the setup instructions for [React Native](https://reactnative.dev/docs/environment-setup) under **React Native CLI Quickstart** for your **Development OS** (macOS is recommended) for both the iOS and Android **Target OS**.

### Fastlane

Install the [fastlane](https://fastlane.tools) tool set following these [setup instructions](https://docs.fastlane.tools/getting-started/ios/setup/).

### NPM/Yarn dependencies

There are project dependencies which need to be installed using either NPM or Yarn.

```bash
yarn install
```

Or

```bash
npm install
```

### Gems

This project makes use of a Gemfile for various dependencies:

```bash
bundle install
```

### Cocoapods

There are iOS dependencies which need to be installed using [Cocoapods](https://cocoapods.org) which ill have been installed by the above `bundle` command.

```bash
cd ios
pod install
```

### Android SDK Platform & Build Tools

The simplest way to manage Android build dependencies is to install [Android Studio](https://developer.android.com/studio#downloads). The SDK manager can be accessed from the Android Studio welcome screen via the Configure dropdown or via "Preferences..." (search for "Android SDK"). In the Android SDK manager, enable "Show Package Details" to make all downloads visible.

The project requires:

- SDK Platform: Android 9.0 (Pie) -> Android SDK Platform 28
- SDK Tools: Android SDK Build-Tools 28.0.3

It is also possible to use the [sdkmanager](https://developer.android.com/studio/command-line/sdkmanager) included in the [command line tools](https://developer.android.com/studio#command-tools).

Defined an `ANDROID_SDK_ROOT` environment variable that points to the `sdk` folder of your Android SDK installation. On macOS this is typically in your user's `Library/Android/sdk` folder i.e. in your `.bash` or `.zshrc` file add:

```bash
export ANDROID_SDK_ROOT=/Users/<my_user_folder>/Library/Android/sdk
```

Replacing `<my_user_folder>` with the name of your user folder.

If you do not have an Android device you will need to create an Android emulator to run the app on as described here: [Create and manage virtual devices](https://developer.android.com/studio/run/managing-avds)

## Testing

### Jest

All of the unit tests are written using [Jest](https://facebook.github.io/jest/docs/en/tutorial-react-native.html). The *components* and *screens* are tested using [React Native Testing Library](https://github.com/callstack/react-native-testing-library) and [snapshots](https://facebook.github.io/jest/docs/en/snapshot-testing.html#content).

To execute the tests run `npm run test` which will execute all of the unit tests in the project.

To update snapshots after component changes run `npm run test -- -u`.

To see the code coverage metrics run `npm run test -- --coverage`.

To execute tests in a specific file run `npm run test -- <path to file>`.

To execute a specific test in a file change the `describe` or `it` to `fdescribe` or `fit`.

Another way to execute specific tests is to use `npm run test -- -t '<filter>'` where `<filter>` is the title of the test you would like to execute. e.g. `npm run test -- -t 'Security'`

### Detox

[Detox](https://github.com/wix/detox) is used to provide automated tests against a local iOS simulator.

To execute the [Detox](https://github.com/wix/detox) tests choose from:

```bash
npm run detox:ios
npm run detox:ios:video
npm run detox:ios:double-tap
npm run detox:android
```

The npm script calls a Detox helper that disables yellow box warnings that can interfere with UI tests. It can also be configured to turn on API stubbing if they are implemented for your project.

#### Installation

Follow [these instructions](https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md) to setup Detox to run the test suite locally.

## Storybook

[Storybook](https://github.com/storybooks/storybook) is used to enable swift development of components. To develop new components follow [these setup instructions](https://github.com/storybooks/storybook#getting-started).

Storybook is accessed via the Settings screen when running a debug build.

## Releases

Many aspects of the build/release process are performed through Fastlane.

### iOS Developer Certificates

[Fastlane](https://fastlane.tools) provides a mechanism for managing iOS certificates and mobile provisioning profiles, called [Match](https://github.com/fastlane/fastlane/tree/master/match#readme).

Once configured a new developer should run `fastlane ios certificates` to install the required certificates and profiles.

### Android Keystore

A keystore is required to build the Android APKs. The keystore to be used in the build needs to be referenced by the global gradle.properties file, usually found at `~/.gradle/gradle.properties` (on Mac OSX).

A keystore can be generated using [Android Studio](https://developer.android.com/studio/publish/app-signing#generate-key) or by running the following command:

```bash
keytool -genkey -v -keystore demoapp-release-key.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
```

The build process looks for the following entries in the `~/.gradle/gradle.properties` file.

```bash
DEMOAPP_RELEASE_STORE_FILE=../keystores/demoapp-release-key.keystore
DEMOAPP_RELEASE_KEY_ALIAS=release
DEMOAPP_RELEASE_STORE_PASSWORD=
DEMOAPP_RELEASE_KEY_PASSWORD=
```

The references can be found in ```android/app/build.gradle```

```json
    signingConfigs {
        release {
            storeFile file(DEMOAPP_RELEASE_STORE_FILE)
            storePassword DEMOAPP_RELEASE_STORE_PASSWORD
            keyAlias DEMOAPP_RELEASE_KEY_ALIAS
            keyPassword DEMOAPP_RELEASE_KEY_PASSWORD
        }
    }
```

At project inception these are commented out so you may need to uncomment the lines.

The keystore itself should be copied to the `android/keystores` folder.

### Badge

Each of the environments has their own version of the application icon, which includes the short name of the environment and the version of the application.

These icons are generated as part of the build process by [Badge](https://github.com/HazAT/badge).

Install the [Badge](https://github.com/HazAT/badge) dependencies following [these instructions](https://github.com/HazAT/badge#common-problems).

### Test Devices

In the `fastlane` folder there is a `devices.txt` file which lists all of the devices to be included in a mobile provisioning file for iOS.

To add new iOS devices to a build, enter the device UUID and a name (seperated by a tab) to the bottom of the `devices.txt` file and run `lane :refresh_devices`.

## Preparing A Release

### 1. Release Notes

The build process will include the release notes from the `CHANGELOG-{major}.{minor}.md` file that is appropriate for the release. i.e for a build of version `2.0.14` of the app the contents of `CHANGELOG-2.0.md` will be included.

When a new major or minor version of the app is created, a new change log should be added to the root of the project i.e. when version `2.1.0` is created then `CHANGELOG-2.1.md` should be addded to the root of the project.

These change logs will be included in any configured automated distribution process i.e. Firebase.

### 2. Updating Version Number

It is recommended to perform version number updates in a seperate commit to other code changes.

Update `package.json` and `package-lock.json` with new build & version numbers.

Execute `fastlane ios update_ios_version` to update all of the required fields in the iOS Xcode project.

Update the current `CHANGELOG` with the new version number.

### 3. Commit Changes

Make sure that changes to the release notes and version numbers are committed to source control before performing the builds.

The final step in the build will automatically reset the git repo, due to updates made to the app icon and configuration file during the build process.

### Performing Builds

Fastlane will perform all of the actions require to build and package the React Native application for iOS and Android.

There are npm wrapper scripts for the build commands:

```bash
    npm run build-production
    npm run build-production:android
    npm run build-production:ios
    npm run build-qc
    npm run build-qc:android
    npm run build-qc:ios
```

Commands without a platform suffix will build both platforms consecutively.

Fastlane can be called directly, to see all of the available **lanes** run `fastlane lanes`

## Distribution

At the end of each build there will be a set of artifacts in the artifacts folder. There will be a `.apk` file for Android and both a `.ipa` and a `.app.dsym.zip` file for iOS. These can be used to manually distribute to any device that was included in the devices list.

Fastlane can be configured to upload the output of the build commands directly to a distribution channel i.e. Firebase.

## Crash Reporting

If Firebase is enabled, Crashlytics will provide both native and JavaScript crash reports.

## Development Tools

There are a number of tools used during the development process.

### Visual Studio Code

React Native does not require a specific IDE for writing Javascript portions of an application. [Visual Studio Code](https://code.visualstudio.com) has been used to author the majority of the code base.

#### Plugins

[Visual Studio Code](https://code.visualstudio.com) is very extensible via plugins. This is a list of the main plugins that have been used during the development of the application so far.

- ESLint by Dirk Baeumer
- Prettier - Code formatter by Esben Petersen
- Rainbow Brackets by 2gua
- React Native Tools by Microsoft
- Visual Studio IntelliCode by Microsoft
- Auto Close Tag by Jun Han
- Auto Complete Tag by Jun Han
- Auto Rename Tag by Jun Han

In VS Code settings to ensure that ESLint and Prettier can work correctly, disable JavaScript > Validate

### Xcode

Although React Native does not require an IDE to write Javascript, an Xcode installation is required to build any form of iOS application and upload it to an App Store, even if those processes are managed by Fastlane.

The iOS project can be opened through the `ios/DemoApp.xcworkspace` file.

### Android Studio

Android Studio is not required, however it does provide a simple way to install the Android dependencies and access the device LogCat.

The android project can be opened via the `android` directory.

### React Native Debugger

When running a React Native application in development mode it is possible to turn on _remote debugging_.

Enabling _remote debugging_ will, by default, start (or connect to) a Chrome developer tools tab. In this tab it is possible to set breakpoints in the source code and see the output from console.log statements.

Rather than requiring Chrome to be installed and running [React Native Debugger](https://github.com/jhen0409/react-native-debugger) is a standalone tool which includes some useful plugins for inspecting the UI composition and redux state changes.

## Troubleshooting

### General

If there are any issues during building the application ensure that all dependencies in are up to date. Remove the node_modules folder and re-install:

```bash
rm -rf ./node_modules/
npm install
```

To completely clean your environment and caches you can also run the `blitz.sh` script in the `utils` folder. This will also re-install your packages and pods:

```bash
./utils/blitz.sh
```

### Android Build

If the Android build appears to hang while bundling dependencies ensure that the project directory is clean. Sometimes the test run may leave behind extra files that cause the build process to have problems.

Specifically check for a folder called `realm-object-server` and a file in the root of the project called `key.note`. The `key.note` file does not show in Finder even when hidden files are set to be shown. Either use the command line or a better file manager e.g. PathFinder.

These files are removed as part of the `blitz.sh` script.

### iOS Build

iOS build problems can often be resolved by re-installing the Pod files:

```bash
cd ios
rm -rf Pods
rm -rf Podfile.lock
pod install
cd ..
```

This action is performed as part of the `blitz.sh` script.

### Provisioning Profile Issues

If there is an error reported about missing provisioning profiles when building an iOS release ensure that the certificates command has been run `fastlane ios certificates`. If the problem persists try running **Match** directly `fastlane match adhoc --readonly`
