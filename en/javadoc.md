# APIs & Javadoc
In this section we take a brief look at APIs supported by RoboVM.

>NOTE: To find out which Java and iOS APIs are supported, check out the **[Javadocs](http://docs.robovm.com/_index/)** for the RoboVM version you are using.

## Class library
RoboVM's class library is composed of two parts:

1. A JVM class library, based on Android
2. Bindings for all iOS APIs via [Bro](advanced-topics/bro.md)

We only use the non-Android parts from Android's class library. This means the following packages are **not supported**:

* **android.\***
* **com.android.\***
* **dalvik.\***
* **javax.microedition.khronos.\***

>NOTE: RoboVM does **NOT** support any Android-specific APIs on iOS. This includes APIs for UIs or background services.

On top of those runtime classes, we also expose all iOS APIs as idiomatic Java bindings. These are the APIs you use to write your user interfaces, access system services and so on. Our binding mechanims called Bro is similar to JNA, but integrates directly with Objective-C (including protocols and classes) and does not incure a performance overhead.

You can cross-reference the Java API for an iOS framework with its corresponding documentation on [Apple's Developer Site](https://developer.apple.com/library/ios/navigation/). E.g. if you want to know about the internals of the `UIButton` class, head over to the Apple Developer Site and search for the class name to get its Objective-C API documentation. You can then search for Java method names within that site and match them with the corresponding Objective-C method name.

## Third Party Library Support
RoboVM let's you exploit almost all of the Java ecosystem, including 3rd party libraries you can find on Maven Central or other repositories. However, you need to be aware of some pitfalls and limitations that apply.

>NOTE: As a general rule of thumb, if a third party library works on Android and does not depend on Android APIs, it will work on RoboVM.

### Byte Code Loading
If a 3rd party library uses runtime byte code loading/manipulation, it will not work with RoboVM. This is due to RoboVM being an ahead-of-time compiler. This means that all byte code that gets executed by your app needs to be known at compile time, so RoboVM can compile it to native machine code. RoboVM can not do this at runtime, due to restrictions imposed by Apple's App Store Terms of Services.

Many libraries let you configure whether byte code manipulation should be performed at compile time or at runtime. For RoboVM, you will have to use the compile time settings of such apps.

### Reflection
Third party libraries such as ORMs or dependency injection frameworks make use of reflection a lot. RoboVM supports full reflection (minus loading byte code at runtime). For RoboVM to be able to load a class at runtime via reflection, it needs to know that this class is used by your application. RoboVM determines this by recursively gathering all the classes referenced by your app, starting with your app's `main()` method.

If a class is not directly referenced via code, but only via reflection, RoboVM will not compile it into your app. Trying to load such a class via reflection at runtime will thus result in an error.

You can explicitely specify classes or entire packages that RoboVM should compile into your application, even if they are not explicitely referenced. You can use the `<forceLink>` tag in your `robovm.xml` file to achieve this. See the [configuration reference](configuration.md) for more details.
