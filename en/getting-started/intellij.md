# Getting Started with Intellij IDEA

{% youtube %}https://youtu.be/pne0rSB0_Lo{% endyoutube %}

This section shows how to build and test RoboVM iOS applications using IntelliJ IDEA. It will explain how to use IntelliJ to activate your commercial license, create new iOS projects, build an iOS application and then compile, test and debug using the tools and interfaces you are already familiar with.

## Installing IntelliJ

With all the [prerequisites](../getting-started/introduction.md) out of the way, proceed to download the latest IntelliJ version from https://www.jetbrains.com/idea/download/. The IDE comes in two different flavors, Ultimate and Community, and both work perfectly with the RoboVM plugin.

> IMPORTANT: IntelliJ *MUST* be run using Oracle’s Java SE 7 JDK or later. Apple’s Java 6 JVM will not work. Locate your IntelliJ installation folder, right-click the IntelliJ application and select _Show Package Contents_. Open the `Info.plist` file located in `Contents` by double clicking it and make sure the _JVMVersion_ entry under _JVMOptions_ is set to 1.7+.

> IMPORTANT: The default max heap setting for IntelliJ is set too low by default. In order to increase it *you need to change the -Xmx setting used when launching IntelliJ*. To do this, locate your IntelliJ installation folder, right-click the IntelliJ application, and select __Show Package Contents__. Open the `idea.vmoptions` file located in `Contents/bin` in a text editor and change the -Xmx value to 2G or more.

> IMPORTANT: for Interface Builder integration to work, *you need to enable automatic project compilation*. Open the IntelliJ IDEA _Preferences_, select __Build, Execution, Deployment -> Compiler__ and check the __Make project automatically__ checkbox. This will automatically compile any source files after you save modifications. 

### Installing the Plugin

With IntelliJ setup, you are ready to install the RoboVM IntelliJ plugin. For now you can download a [nightly build](http://download.robovm.org/nightlies/idea/org.robovm.idea-1.0.1-SNAPSHOT-plugin-dist-20150413_022328-38.jar), then open the IntelliJ _Preferences_ and select the _Plugins_ entry in the pane to the left. Click the _Install plugin from disk_ button at the bottom, and navigate to where you downloaded the jar file. Install the plugin and restart IntelliJ.

> NOTE: In the future, you will be able to install and update the RoboVM plugin from the IntelliJ repositories.

![Install plugin from disk dialog](/images/intellij-install-plugin.png)

## Activating your License 

If you have [http://www.robovm.com/pricing/](purchased a subscription) for one
of RoboVM's subscription plans, you have to active the license for use on your
computer. Activating the license will enable the features you purchased, such
as debugging support or Interface Builder integration. Select _License Manager_ from the IntelliJ _RoboVM_ menu and enter your license key.

![License Manager dialog](/images/license-manager.png)

> NOTE: A commercial license is not required to create RoboVM applications and deploy them to the App Store. Commercial licenses add additional features and services on top of the free core of RoboVM. For more information, visit our [pricing page](http://www.robovm.com/pricing/).


## Creating a New Project

Creating a new iOS project from within IntelliJ is just like any other project type. Selecting __File > New > Project__ will open the dialog shown below.

![New Project Wizard](/images/intellij-project-wizard.png)

The next two steps in the project wizard will allow you to customize your project with the following values:

1. _Package Name_, e.g. _com.mycompany.myapp_
2. _Main Class Name_, e.g. _Main_
3. _Application Name_, the name used when your app is installed to an iOS device or simulator
4. _Application Id_, a unique identifier, usually your package name
5. _Build System_, the tool to use for managing builds and dependencies

Finally, specify your _Project Name_ and _Project Location_.

### Running & Debugging

In order to run your newly created iOS application, you must first setup a _Run Configuration_. Navigating to __Run > Edit Configurations__, and clicking the '+' to add a _RoboVM iOS_ config, will open the dialog shown below.

![Creating a Run Configuration within IntelliJ](/images/intellij-run-configuration.png)

You can create multiple configurations, one for each device and simulator you want to debug on. After closing the dialog, select the __Run__ menu and choose the configuration you just created.

> NOTE: The first time you run your application on the simulator or the device, RoboVM has to compile not only the classes of your app, but also any runtime classes required by your code. This can take some time. The next time you compile your app, RoboVM will only recompile the classes that have changed since the last compilation. You can view RoboVM's progress in the RoboVM console view.

When starting you app in debug mode, you have the full debugging tools of
IntelliJ at your disposal: you can set breakpoints, step into/out/over source
lines, inspect and set variables and even use [IntelliJ's Evaluate Expression view](https://www.jetbrains.com/idea/help/evaluating-expressions.html).

![Debugging on the simulator in IntelliJ](/images/intellij-debug-sim.png)

## Deployment

Once you are happy with your app and have tested it on multiple devices, it is time to publish it to the App Store. For this you need to create an [iOSApplication Archive](http://en.wikipedia.org/wiki/.ipa_%28file_extension%29) (IPA). You can do so from within IntelliJ by selecting __Build > Create IPA__.

![IPA export for ad-hoc and App Store distribution](/images/intellij-deploy.png)

Specify the output directory, your signing identity and provisioning profile and click _OK_. You will find a file with the extension `.ipa` in the output directory, which is ready to be uploaded to iTunes Connect via the Application Loader.

> NOTE: Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html) on how to submit your application.
