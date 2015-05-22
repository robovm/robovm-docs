# Samples

RoboVM comes with an extensive set of samples, available on [Github](https://github.com/robovm/robovm-samples). The samples are composed of ports of Apple's sample apps as well as apps we created ourselves. 

In this article, we'll walk you through getting the samples, compiling and running them with Eclipse, IDEA, Maven and Gradle.

>NOTE: Please make sure you have installed all [prerequisits](getting-started/introduction.md) as outlined in the "Getting Started" guide!

## Samples Summary
| Name              | Description | Demonstrates |
| ------------------| ----------- | ---------------------------------|
| [AppPrefs](https://github.com/robovm/robovm-samples/tree/master/AppPrefs)     | Port of Apple's [AppPrefs](https://developer.apple.com/library/ios/samplecode/AppPrefs/Introduction/Intro.html) sample | How to display your app's user configurable options (preferences) in the "Settings" system application. |
| [BatteryStatus](https://github.com/robovm/robovm-samples/tree/master/BatteryStatus/)     | Port of Apple's [BatteryStatus](https://developer.apple.com/library/ios/samplecode/BatteryStatus/Introduction/Intro.html) sample | How to use the battery status properties and notifications provided via the iOS SDK. |
| [ContractR](https://github.com/robovm/robovm-samples/tree/master/ContractR/) | Task tracking app | How to setup a cross-platform iOS/Android app, use SQLite |
| [CurrentAddress](https://github.com/robovm/robovm-samples/tree/master/CurrentAddress/)     | Port of Apple's [CurrentAddress](https://developer.apple.com/library/ios/samplecode/CurrentAddress/Introduction/Intro.html) sample | How to use MapKit, displaying a map view and setting its region to current location. |
| [DateCell](https://github.com/robovm/robovm-samples/tree/master/DateCell/)     | Port of Apple's [DateCell](https://developer.apple.com/library/ios/samplecode/DateCell/Introduction/Intro.html) | How to display formatted date objects in table cells and use UIDatePicker to edit those values. |
| [DocInteraction](https://github.com/robovm/robovm-samples/tree/master/DocInteraction/)     | Port of Apple's [DocInteraction](https://developer.apple.com/library/ios/samplecode/DocInteraction/Introduction/Intro.html) sample | How to use UIDocumentInteractionController to obtain information about documents and how to preview them. |
| [Footprint](https://github.com/robovm/robovm-samples/tree/master/Footprint/)     | Port of Apple's [FootPrint](https://developer.apple.com/library/ios/samplecode/footprint/Introduction/Intro.html) sample | How to take a Latitude/Longitude position and project it onto a flat floorplan. |
| [HelloWorld](https://github.com/robovm/robovm-samples/tree/master/HelloWorld/)     | Port of Apple's [HelloWorld](https://developer.apple.com/library/ios/samplecode/HelloWorld_iPhone/Introduction/Intro.html) sample | How to use a keyboard to enter text into a text field and how to display the text in a label. |
| [LaunchMe](https://github.com/robovm/robovm-samples/tree/master/LaunchMe/)     | Port of Apple's [LaunchMe](https://developer.apple.com/library/ios/samplecode/LaunchMe/Introduction/Intro.html) sample | How to implement a custom URL scheme to allow other applications to interact with your application. Shows how to handle an incoming URL request by overriding UIApplicationDelegate.openURL to properly parse and extract information from the requested URL before updating the user interface. |
| [LocateMe](https://github.com/robovm/robovm-samples/tree/master/LocateMe/)     | Port of Apple's [LocateMe](https://developer.apple.com/library/ios/samplecode/LocateMe/Introduction/Intro.html) sample | How to get the user's location and how to track changes to the user's location. |
| [MessageComposer](https://github.com/robovm/robovm-samples/tree/master/MessageComposer/)     | Port of Apple's [MessageComposer](https://developer.apple.com/library/ios/samplecode/MessageComposer/Introduction/Intro.html) sample | How to use the Message UI framework to compose and send email and SMS messages from within your application. |
| [MoviePlayer](https://github.com/robovm/robovm-samples/tree/master/MoviePlayer/)     | Port of Apple's [MoviePlayer](https://developer.apple.com/library/ios/samplecode/MoviePlayer_iPhone/Introduction/Intro.html) sample | How to use the Media Player framework to play a movie from a file or network stream, and configure the movie background color, playback controls, background color and image, scaling and repeat modes. It also shows how to draw custom overlay controls on top of the movie during playback. |
| [PhotoScroller](https://github.com/robovm/robovm-samples/tree/master/PhotoScroller/)     | Port of Apple's [PhotoScroller](https://developer.apple.com/library/ios/samplecode/PhotoScroller/Introduction/Intro.html) sample | How to use embedded UIScrollViews and CATiledLayer to create a rich user experience for displaying and paginating photos that can be individually panned and zoomed. CATiledLayer is used to increase the performance of paging, panning, and zooming with high-resolution images or large sets of photos. |
| [QuickContacts](https://github.com/robovm/robovm-samples/tree/master/QuickContacts/)     | Port of Apple's [QuickContacts](https://developer.apple.com/library/ios/samplecode/QuickContacts/Introduction/Intro.html) sample | How to use the Address Book UI controllers and various properties. Shows how to browse a list of Address Book contacts, display and edit a contact record, create a new contact record, and update a partial contact record. |
| [Regions](https://github.com/robovm/robovm-samples/tree/master/Regions/)     | Port of Apple's [Regions](https://developer.apple.com/library/ios/samplecode/Regions/Introduction/Intro.html) sample | How to monitor regions, significant location changes, and handle location events in the background on iOS. |
| [StreetScroller](https://github.com/robovm/robovm-samples/tree/master/StreetScroller/)     | Port of Apple's [StreetScroller](https://developer.apple.com/library/ios/samplecode/StreetScroller/Introduction/Intro.html) sample | How to subclass a UIScrollView and add infinite scrolling. |
| [TableSearch](https://github.com/robovm/robovm-samples/tree/master/TableSearch/)     | Port of Apple's [TableSearch](https://developer.apple.com/library/ios/samplecode/TableSearch_UISearchController/Introduction/Intro.html) sample | How to use UISearchController. A search controller manages the presentation of a search bar (in concert with the results view controller’s content). |
| [Tabster](https://github.com/robovm/robovm-samples/tree/master/Tabster/)     | Port of Apple's [Tabster](https://developer.apple.com/library/ios/samplecode/Tabster/Introduction/Intro.html) sample | How to build a tab-bar based iOS application. |
| [Teslameter](https://github.com/robovm/robovm-samples/tree/master/Teslameter/)     | Port of Apple's [Teslameter](https://developer.apple.com/library/ios/samplecode/Teslameter/Introduction/Intro.html) sample | How to create a Teslameter, a magnetic field detector, with the use of the Core Location framework and display the raw x, y and z magnetometer values, a plotted history of those values, and a computed magnitude (size or strength) of the magnetic field. |
| [TheElements](https://github.com/robovm/robovm-samples/tree/master/TheElements/)     | Port of Apple's [TheElements](https://developer.apple.com/library/ios/samplecode/TheElements/Introduction/Intro.html) sample | How to create an application that provides access to the data contained in the Periodic Table of the Elements. This sample provides this data in multiple formats, allowing you to sort the data by name, atomic number, symbol name, and an element's physical state at room temperature. TheElements is structured as a Model-View-Controller application. |
| [Touches](https://github.com/robovm/robovm-samples/tree/master/Touches/)     | Port of Apple's [Touches](https://developer.apple.com/Library/ios/samplecode/Touches/Introduction/Intro.html) sample | How to handle touches, including multiple touches that move multiple objects with UIResponder and UIGestureRecognizers. |
| [UICatalog](https://github.com/robovm/robovm-samples/tree/master/UICatalog/)         | Port of Apple's [UICatalog](https://developer.apple.com/library/ios/samplecode/UICatalog/Introduction/Intro.html) sample | How to create and customize user interface controls found in the UIKit framework, along with their various properties and styles. |
| [VideoRecorder](https://github.com/robovm/robovm-samples/tree/master/VideoRecorder/)         | Port of Apple's [VideoRecorder](https://developer.apple.com/library/ios/samplecode/VideoRecorder/Introduction/Intro.html) sample | How to create a custom UI for the camera variant of the UIImagePickerController and how to programmatically control video recording. |
| [ContractR](https://github.com/robovm/robovm-samples/tree/master/ContractR/)         | Sample app for iOS, Android and JavaFX. | How to share code between an iOS and Android app using native UI in both apps. The iOS and Android projects are using a shared core project which holds the Model part of the Model View Controller pattern. Please note that the code in these projects are in need of clean-up, so please let us know when you find strange things. Please also feel free to improve this sample and let us know. |

## Getting the Samples
To download the samples, you'll need to clone them via git:

```bash
git clone https://github.com/robovm/robovm-samples
```

After you successfully cloned the samples, move on to the section for your prefered development environment:

* Eclipse
* IntelliJ IDEA
* Maven
* Gradle

## Eclipse
You can import the samples into Eclipse either via m2e/Maven or Gradle.

### Import via Maven
1. Go to *File -> Import...*.
2. Select *Maven -> Existing Maven Projects*.
3. Set *Root Directory* to the directory you cloned the samples into (`robovm-samples/`).
4. Click *Finish*.

You can now proceed to compile, run and debug the samples, as outlined in the [Getting Started Guide for Eclipse](getting-started/eclipse.md).

### Import via Gradle
Before you can import the samples via Gradle, you need to install the [Gradle Integration for Eclipse](http://marketplace.eclipse.org/content/gradle-integration-eclipse-44). You can install it the the Eclipse Market Place (*Help -> Eclipse Market Place...*).

After installing the plugin, you can proceed as follows:
1. Go to *File -> Import...*.
2. Select *Gradle -> Gradle Project*.
3. Set *Root folder* to the directory you cloned the samples into (`robovm-samples/`).
4. Click *Build Model*.
5. Check the checkbox next to the `robovm-samples` entry. All other projects should be selected as well.
5. Click *Finish*.

You can now proceed to compile, run and debug the samples, as outlined in the [Getting Started Guide for Eclipse](getting-started/eclipse.md).

## IntelliJ IDEA
You can import the samples into IntelliJ IDEA either via Maven or Gradle.

### Import via Maven
1. Go to *File -> Open*.
2. Select the `pom.xml` file in the root directory fo the samples.
3. Click OK.

You can now proceed to compile, run and debug the samples, as outlined in the [Getting Started Guide for IntelliJ IDEA](getting-started/intellij.md).

### Import via Gradle
1. Go to *File -> Open*.
2. Select the `settings.gradle` file in the root directory fo the samples.
3. In the Gradle dialogue, keep all settinsg as they are and click *OK*.

You can now proceed to compile, run and debug the samples, as outlined in the [Getting Started Guide for IntelliJ IDEA](getting-started/intellij.md).

## Maven
In the root directory, do:
```bash
mvn clean install
```

This will compile all samples. Next, switch into a sample directory and execute one of the following:

```bash
# to launch on an IPhone simulator
mvn robovm:iphone-sim

# to launch on an IPad simulator
mvn robovm:iphone-sim

# to launch on a connected device
mvn robovm:ios-device
```

See the [RoboVM Maven Plugin documentation](getting-started/maven.md) for more information.

## Gradle
In the root directory, do:
```bash
./gradlew build
```

This will compile all samples. Next, switch into a sample directory and execute one of the following:

```bash
# to launch on an IPhone simulator
./gradlew launchIPhoneSimulator

# to launch on an IPad simulator
./gradlew launchIPadSimulator

# to launch on a connected device
./gradlew launchIOSDevice
```

See the [RoboVM Gradle Plugin documentation](getting-started/gradle.md) for more information.
