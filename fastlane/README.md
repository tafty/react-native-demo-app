fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios build_production
```
fastlane ios build_production
```

### ios build_and_release_qc
```
fastlane ios build_and_release_qc
```

### ios perform_build_and_release
```
fastlane ios perform_build_and_release
```

### ios update_ios_version
```
fastlane ios update_ios_version
```
Updates the version number in the iOS project
### ios certificates
```
fastlane ios certificates
```

### ios refresh_devices
```
fastlane ios refresh_devices
```

### ios build_ipa
```
fastlane ios build_ipa
```

### ios distribute_to_firebase
```
fastlane ios distribute_to_firebase
```


----

## Android
### android build_production
```
fastlane android build_production
```

### android build_and_release_qc
```
fastlane android build_and_release_qc
```

### android perform_build_and_release
```
fastlane android perform_build_and_release
```

### android build_release
```
fastlane android build_release
```

### android distribute_to_firebase
```
fastlane android distribute_to_firebase
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
