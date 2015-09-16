# Free Provisioning

Apple's release of Xcode 7 introduced free provisioning, allowing developers to deploy their RoboVM applications to an iOS device __without__ being a member of the Apple Developer Program.

## Setup

1. Open Xcode 7, open __Xcode->Preferences->Account__, click the __+__ button in the bottom left corner , choose __Add Apple ID...__ and login using your Apple Account. This Apple ID must not be connected to a developer program (not even the Mac Developer program!).

2. Create a new iOS project using any iOS app template. The Bundle Identifier MUST match the ID of your RoboVM app.

3. Click Fix Issue on the General tab to create a signing identity and a provisioning profile.

4. Connect your iOS device, select it as the build destination, and click the __Play__ button to make sure the app can be launched on the device.

## Limitations

Apple has created limits to when and how you can use free provisioning. Profiles created in this way expire after three months, and identities expire in a year. Additionally, you must repeat the steps above for each app, because provisioning profiles will only be created with explicit App IDs.

Provisioning for most application services is also not possible with free provisioning, as well as access to publishing to the App Store and TestFlight. An Apple Developer Account is require to use these services.
