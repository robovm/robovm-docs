## Introduction

One of RoboVM's greatest strengths is the opportunity to share the everything except UI code between your Android and iOS applications. The RoboVM plugin for IntelliJ includes a template to generate a cross platform project, or to add an iOS module to an existing Android project.

The basic architecture consists of platform specific modules for the UI and application layers, and a core module for the logic that will be shared. This guide introduces how to architect a cross-platform application using the native Android tools and RoboVM for iOS, while maximizing code re-use between them.

## Project Creation

For the moment, cross-platform project creation is in BETA. We currently only support (IntelliJ)(../getting-started/intellij.md) and manually setting up your project. In the very near future, templates will be added to create a fresh cross platform project or to add a RoboVM module to an existing Android project.

This tutorial also assumes you already have installed and configured the Android SDK and platform tools.

> NOTE: Only the Gradle build system is supported.

### Manual

For now, the only way to create a cross-platform project is to manually setup the modules from within IntelliJ.

* New Project > Android > Gradle: Android Module
	* Module Name: android
	* Package Name: com.company.appname.android
* New Module > Gradle > (name it core)
* New Module > RoboVM > (name it ios) > (Make sure it is under ios module)
	* Package Name: com.company.appname.ios
	* App Id: com.company.appname
	* Module Name: ios
* Update settings.gradle: include ':android', ':ios', ':core'
* Add compile project(':core') to android/build.gradle and ios/build.gradle
* Sync

### Wizard

> NOTE: A project wizard will be added soon.

## Simple Start

The app we will be creating is a version of the [unix fortune](http://en.wikipedia.org/wiki/Fortune_%28Unix%29) program. Each time the user presses a button, a random fortune will be displayed. The UI will be intentionally simple in order to focus on strategies for cross-platform development.

![images/overview.png](images/overview.png)

### Core

The core module should contain code that does not depend on the Android or iOS platforms. Typically, this will be comprised of the data and business logic layers.

Our model for the fortune app will start out with the simplest API possible, retrieving a random quote from a static database. In later sections we will expand that functionality to cover pulling new quotes from a web API, and saving your favorite quotes to the local database.

In the process, you will learn about using popular libraries from the Android ecosystem in a cross-platform way, and employing interfaces to allow each platform to inject functionality into the core module, like local database storage.

For now, paste the following code into a new file named `FortuneStore.java` under the core module. Make sure there is a `org.robovm.fortune.core` package to place it in.

```java
package org.robovm.fortune.core;

import java.util.Random;

public class FortuneStore {
    private String[] fortunes = {
            "1. RoboVM is an awesome tool for porting Android apps to iOS.",
            "2. RoboVM is an awesome tool for porting Android apps to iOS.",
            "3. RoboVM is an awesome tool for porting Android apps to iOS.",
            "4. RoboVM is an awesome tool for porting Android apps to iOS.",
            "5. RoboVM is an awesome tool for porting Android apps to iOS.",
    };

    prive static Random rng = new Random();

    public String getFortune() {
        return fortunes[rng.nextInt(fortunes.length)];
    }
}
```

### Android UI

In order to design the Android UI, we will be taking advantage of the Android Designer within IntelliJ. In the project view, navigate to the android module > src > main > layout, and double click on `activity_fortune.xml`.

For now, all you really need is a `TextView` and a `Button`:

* Drag a `TextView` from the palette to the canvas.
	* Rename it 'fortuneTextView'
	* Configure the TextView
* Drag a `Button` from the palette to the canvas.
	* Rename it 'nextFortuneButton'
	* Configure the Button

Replace the contents of `FortuneActivity.java` under the `android` module with the following code.

```java
package org.robovm.fortune.android;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import org.robovm.fortune.core.FortuneStore;

public class FortuneActivity extends Activity {
    private FortuneStore fortunes = new FortuneStore(); // [:1:]

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fortune);

        final TextView fortuneLabel = (TextView) findViewById(R.id.fortuneTextView); // [:2:]
        final Button showFactButton = (Button) findViewById(R.id.nextFortuneButton); // [:2:]

        View.OnClickListener listener = new View.OnClickListener() { // [:3:]
            @Override
            public void onClick(View view) {
                fortuneLabel.setText(fortunes.getFortune());
            }
        };
        showFactButton.setOnClickListener(listener);
    }
}
```

[:1:] Create the model that we created in the core module.

[:2:] Get access to the UI elements we need.

[:3:] Hook up the click event on the button.

### iOS UI

Replace the contents of `FortuneViewcontroller.java` under the `android` module with the following code.

```java
package org.robovm.fortune.ios;

import org.robovm.apple.uikit.UILabel;
import org.robovm.apple.uikit.UIViewController;
import org.robovm.fortune.core.FortuneStore;
import org.robovm.objc.annotation.CustomClass;
import org.robovm.objc.annotation.IBAction;
import org.robovm.objc.annotation.IBOutlet;

@CustomClass("FortuneViewController")
public class FortuneViewController extends UIViewController {
    private static FortuneStore fortunes = new FortuneStore(); // [:1:]

    private UILabel fortuneLabel;

    @IBOutlet
    public void setLabel(UILabel label) { // [:2:]
        this.fortuneLabel = label;
    }

    @IBAction
    private void clicked() { // [:3:]
        fortuneLabel.setText(fortunes.getFortune());
    }
}
```

[:1:] Create the model that we created in the core module.

[:2:] Get access to the UI elements we need.

[:3:] Hook up the click event on the button.

## Web Request

> NOTE: Coming Soon

## Local Storage

> NOTE: Coming Soon

## Conclusion

> NOTE: Coming Soon
