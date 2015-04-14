# Getting Started with Eclipse

In this section you'll learn how to install Eclipse, install the RoboVM Eclipse plugin, activate your commercial license, and create and run your first iOS application.

## Installing Eclipse

With all the [prerequisites](../getting-started/introduction.md) out of the way, proceed to download a recent Eclipse build from https://www.eclipse.org/downloads/. Eclipse comes in many different flavors, the _Eclipse IDE for Java Developers_ package is sufficient for RoboVM development. Simply download the package, decompress it, and copy the resulting folder int `/Applications/`.

There are some __important__ steps that must be completed in order to properly setup Eclipse for working with RoboVM.

1. Eclipse _MUST_ be run using Oracle’s Java SE 7 JDK or later. Apple’s Java 6 JVM will not work. Running Eclipse itself in Java 7 is not the same as adding a Java 7 JRE to Eclipe's _Installed JREs_ dialog in _Preferences_. To check which Java version Eclipse is running in go to _Eclipse -> About Eclipse_, then click _Installation Details_ and open the _Configuration_ tab. Find the `java.version` property and make sure it is 1.7 or higher.

2. The default max heap setting for Eclipse may be too low. In order to increase it *you need to change the -Xmx setting used when launching Eclipse*. To do this locate your Eclipse installation folder, right-click the Eclipse file and select _Show Package Contents_. Open the `eclipse.ini` file located in `Contents/MacOS` in a text editor and change the -Xmx value to 2G or more. Restart Eclipse.

## Installing the Plugin

With Eclipse installed and setup, you can now install the RoboVM Eclipse plugin by selecting _Install New Software_ from the Eclipse _Help_ menu, enter the following update site into the _Work with_ field and click _Next_:

```
http://download.robovm.org/eclipse/
```

![Eclipse Install New Software dialog](/images/eclipse-install-new-software.png)

Follow the on-screen instructions until installation is complete and restart Eclipse.

> NOTE: You can use a nightly build by using `http://download.robovm.org/nightlies/eclipse/` as the software site instead of the one listed above.

## Activating your License 

If you have [purchased a subscription](http://www.robovm.com/pricing/) for one of RoboVM's subscription plans, you have to active the license for use on your computer. Activating the license will enable the features you purchased, such as debugging support or Interface Builder integration. Select _License Manager_ from the Eclipse _RoboVM_ menu and enter your license key.

![License Manager dialog](/images/license-manager.png)

> NOTE: A commercial license is not required to create RoboVM applications and deploy them to the App Store. Commercial licenses add additional features and services on top of the free core of RoboVM. For more information, visit our [pricing page](http://www.robovm.com/pricing/).

## Creating a Project

You can now create your first RoboVM project! Select _File -> New -> RoboVM iOS Project_. The project wizard will appear:

![New Project Wizard](/images/eclipse-project-wizard.png)

Perform these steps to define your project:

1. Fill in your _Project Name_
1. From the Template combobox select _RoboVM iOS App without storyboards_
1. Specify the package and name of your _Main Class_, e.g. _com.mycompany.myapp.Main_
1. Specify the _App Name_. This is the name used when your app is installed to an iOS device or simulator
1. Specify the _App ID_. This must be a unique identifier, usually your package name
1. Click _Finish_

## Running & Debugging 

You can run or debug a RoboVM app on either the simulator or a provisioned device connected via USB, directly from within Eclipse. Right click the project in the package or project view, select _Run As_ or _Debug As_, then select which platform you want to run/debug the app on.

![Running & Debugging from within Eclipse](/images/eclipse-run-debug.png)

> NOTE: The first time you run your application on the simulator or the device, RoboVM has to compile not only the classes of your app, but also any runtime classes required by your code. This can take some time. The next time you compile your app, RoboVM will only recompile the classes that have changed since the last compilation. You can view RoboVM's progress in the RoboVM console view.

![Debugging on the simulator in Eclipse](/images/eclipse-debug-sim.png)

When starting you app in debug mode, you have the full debugging tools of Eclipse at your disposal: you can set breakpoints, step into/out/over source lines, inspect and set variables and even use [Eclipse's display view](http://help.eclipse.org/luna/index.jsp?topic=%2Forg.eclipse.jdt.docuser%2Freference%2Fviews%2Fdisplay%2Fref-display_view.htm)

## Unit Testing

RoboVM supports running and debugging JUnit tests for console and simulator apps. Let's add a new unit test to our project.

Create a new source folder which will contain all your unit tests by right clicking the project and selecting _File -> New -> Source Folder_. In the dialog, enter `src/test/java`, then click _Finish_. Copy the following source code to your clipboard, then select the `src/test/java` folder in Eclipse and paste the clipboard contents.

```java
import static org.junit.Assert.*;
import org.junit.Test;

public class MyIOSUnitTest {
    @Test
    public void test() {
        System.out.println(System.getProperty("os.name"));
        System.out.println(System.getProperty("os.arch"));
        fail("Not yet implemented");
    }
}
```

We have not yet added JUnit as a dependency to our project, so you will see compilation errors. Move your cursor somewhere on the line that reads `@Test` of the `MyIOSUnitTest.java` file, then press `CMD+1` and select _Add JUnit 4 libray to the build path_.

You can now run this unit test by right clicking the `MyIOSUnitTest.java` file in Eclipse, then select _Run As_ or _Debug As_, followed by _iOS Simulator JUnit Test_.

![Unit testing in Eclipse](/images/eclipse-unit-test.png)

## Deployment

Once your are happy with your app and have tested it on multiple devices, it's time to publish it to the App Store. For this you need to create an [iOSApplication Archive](http://en.wikipedia.org/wiki/.ipa_%28file_extension%29)(IPA). To do so from within Ecipse, right click your project, then select _RoboVM Tools -> Package for Ad-hoc/App Store distribution..._.

![IPA export for ad-hoc and App Store distribution](/images/eclipse-deploy.png)

Specify the output directory, your signing identity and provisioning profile and click _Finish_. You will find a file with the extension `.ipa` in the output directory, which is ready to be uploaded to iTunes Connect via the Application Loader.

> NOTE: Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html) on how to submit your application.
