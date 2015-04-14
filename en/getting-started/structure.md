# Project and Code Structure

Whatever method you chose to create your first RoboVM app, the project's structure will always resemble this layout, plus or minus the files your IDE or build system generated.

![Basic iOS project in Eclipse](/images/eclipse-project.png)

Here's a basic run-down of the project's contents:

* `src/main/java/` is where your sources live
* `resources/` contains your app's icons, launch screens and any other assets your app requires
* `robovm.properties` let's you quickly set attributes of your app, such as the main class or app id. Values in this file will get replaced in the two files described below.
* `robovm.xml` let's you specify the RoboVM specific configuration of your app
* `Info.plist.xml` let's you specify the [iOS specific configuration](https://developer.apple.com/library/mac/documentation/General/Reference/InfoPlistKeyReference/Articles/iPhoneOSKeys.html#//apple_ref/doc/uid/TP40009252-SW1) of your app, such as supported screen orientations

Let's take a quick look at the code itself!

## The Main Entry Point

Every app has a main entry point. We specify the main class in the `robovm.properties` file:

```java
app.version=1.0
app.id=com.mycompany.myapp
app.mainclass=com.mycompany.myapp.HelloRoboVM // [:1:]
app.executable=HelloRoboVM
app.build=1
app.name=Hello RoboVM
```

[:1:] The class is given via its fully qualified class name, including the package it resides in.

When your app is run on the simulator or on a device, the main class's `main` method will be called on startup.

```java
public class HelloRoboVM extends UIApplicationDelegateAdapter { // [:4:]
    private UIWindow window;
    private MyViewController rootViewController;

    @Override
    public boolean didFinishLaunching (UIApplication application,
				       UIApplicationLaunchOptions launchOptions) { // [:3:]
        rootViewController = new MyViewController();
        
        window = new UIWindow(UIScreen.getMainScreen().getBounds());        
        window.setRootViewController(rootViewController);        
        window.makeKeyAndVisible();

        return true;
    }

    public static void main (String[] args) {
        try (NSAutoreleasePool pool = new NSAutoreleasePool()) { // [:1:]
            UIApplication.main(args, null, HelloRoboVM.class); // [:2:]
        }
    }
}
```

[:1:] Upon entering the `main` method, we setup an [`NSAutoreleasePool`](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/mmAutoreleasePools.html). It's responsible for managing the life-time of all native Objective-C objects your app interacts with. The autorelease pool will automatically free the memory of any object that is no longer referenced.

[:2:] We then call [`UIApplication.main`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/), telling it about our main class, `HelloRoboVM`. This method is responsible for kicking off the user interface, it will never return. Once it is done launching our app, it will call the `didFinishLaunching` method.

[:3:] In `didFinishLaunching` we setup our basic UI. iOS apps are usually composed of a single `UIWindow` on which we set a root `UIViewController`. The view controller is responsible for setting up user interface elements like labels, buttons and so forth, and reacting to any events on those elements.

[:4:] Note how `HelloRoboVM` extends from `UIApplicationDelegateAdapter`. We are essentially implementing the Objective-C [`UIApplicationDelegate`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/) protocol, in Java, which defines methods the `UIApplication` calls when application-level events happen. RoboVM let's us easily extend native Objective-C classes or implement Objective-C protocols!

Let's take a look at the `MyViewController` class, the work horse of our application.

> NOTE: iOS UIs can be created programmatically, as demonstrated here, or graphically, using XCode's [Interface Builder](https://developer.apple.com/xcode/interface-builder/). RoboVM supports both ways of creating a UI. Check the rest of the documentation on how to use Interface Builder with RoboVM!

## The View Controller

View controllers are a simple way of managing individual screens of your app. A view controller usually sets up the UI controls of a specific screen, registers listeners for events such as button touches, and then reacts to these events. The `UIWindow` has a single root view controller, which itself can manage other view controllers.

In our simple app, we have only one view controller, which we set as the root view controller on the window in `HelloRoboVM#didFinishLaunching`.

```java
public class MyViewController extends UIViewController { // [:1:]
    private final UIButton button;
    private final UILabel label;
    private int clickCount;

    public MyViewController () { // [:2:]
        UIView view = getView();

        view.setBackgroundColor(UIColor.white());

        label = new UILabel(new CGRect(20, 250, 280, 44)); // [:3:]
        label.setFont(UIFont.getSystemFont(24));
        label.setTextAlignment(NSTextAlignment.Center);
        view.addSubview(label);

        button = UIButton.create(UIButtonType.RoundedRect); // [:4:]
        button.setFrame(new CGRect(110, 150, 100, 40));
        button.setTitle("Click me!", UIControlState.Normal);
        button.getTitleLabel().setFont(UIFont.getBoldSystemFont(22));

        button.addOnTouchUpInsideListener(new UIControl.OnTouchUpInsideListener() { // [:5:]
            @Override
            public void onTouchUpInside (UIControl control, UIEvent event) {
                label.setText("Click Nr. " + (++clickCount));
            }
        });
        view.addSubview(button);
    }
}
```

[:1:] Our `MyViewController` subclasses the Objective-C [`UIViewController`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class/) class.

[:2:] In its constructor, we setup a label and a button, which we add to the controller's [`UIView`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/). The `UIView` is responsible for rendering any content in its area and also handle interactions with that content. In this case, the `UIView` covers the whole `UIWindow`.

[:3:] To setup a label, we instantiate a [`UILabel`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UILabel_Class/), another Objective-C class, set its size and content, and add it as a sub view to our controllers view.

[:4:] We do the same for the button of our screen, with one slight twist!

[:5:] Since we want to react to button touches, we also register a touch listener with the button. Any time a user lifts her finger from the button, we get called back, informing us about this event. Note that the callback originates from native code. RoboVM transparently manages the transition between Java and native code for us!

And here's what our resulting app looks like on the simulator after some heavy button clicking.

![Our marvelous demo app](/images/eclipse-demo-app.png)
