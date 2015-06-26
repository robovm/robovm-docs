## Going mobile
Targeting mobile means developing for both **Android and iOS**, which together cover 96% of the mobile app market. Mobile development comes with quite a few challenges:

* Each platform has a **different ecosystem and development tools**. 
* You usually need **one team per platform**.
* Teams are **not able to share code** between platforms or the backend. 
* All of this leads to **increased development cost and time-to-market**.

## Why RoboVM?
We love mobile. We love the Java ecosystem. If you feel like we do, you will love RoboVM:

* **Create truly native mobile apps** for iOS and Android.
* Use **libraries, tools and languages** from the vast **Java ecosystem**.
* **Share code** between platforms.

## Native UX, Native Performance
Your users deserve the best experience. Creating truly native apps is one way to achieve this.

Truly native apps need a **native user interface**. With RoboVM, you get **access to all native APIs** of both Android and iOS, straight from your Java code. Whatever is possible in Objective-C is possible in Java as well.

RoboVM also integrates nicely with **[Xcode's Interface Builder](https://developer.apple.com/xcode/interface-builder/)**, which lets you create user interfaces in a **[WYSIWYG fashion](tutorials/ib-basics/ib-basics.md)**. 

The final piece of the puzzle is **native performance**. On iOS, RoboVM compiles your **JVM byte code to machine code** using **[LLVM](http://www.llvm.org)**. That's also used to compile C/C++/Objective-C on iOS. RoboVM apps are **[on par or exceeding the performance of Objective-C apps](https://medium.com/@harrycheung/cross-platform-mobile-performance-testing-d0454f5cd4e9)**.

In short, with RoboVM, you are a **first-class citizen on iOS and Android**, and your users will love you for it.

## Use the Tools You Love!
With RoboVM, we want to give you as much freedom as possible when it comes to tooling.

On the language front, RoboVM allows you to use **Java** or alternative JVM languages like **[Scala](http://www.scala-lang.org/)**, **[Kotlin](http://kotlinlang.org/)** or **[Clojure](http://clojure.org/)** on iOS and Android.

Your IDE needs are also covered. RoboVM integrates with **[Eclipse](getting-started/eclipse.md)**, **[IntelliJ IDEA](getting-started/intellij.md)** and **[Netbeans](https://dukescript.com/update/2015/05/15/on-device-debugging.html)**. And if you like to work without an IDE, you can use RoboVM from the **[command line](advanced-topics/commandline.md)** as well.

Nobody is perfect, and neither is code. RoboVM gives you **full debugging support**, both on the simulator as well as on a connected device from within your IDE of choice.

Build & dependency management systems make your life as a developer easier: RoboVM supports both **[Maven](getting-started/maven.md)** and **[Gradle](getting-started/gradle.md)**. Add **[Jenkins](https://jenkins-ci.org/)** to the mix, and you got yourself continuous integration and deployment.

Speaking of dependencies: RoboVM let's you reuse the vast amount of **[3rd party libraries](javadoc.md)** availabe from Maven Central or other repositories. Via **[Bro](advanced-topics/bro.md)** you can access Objective-C based 3rd party libraries directly from Java. No JNI involved!

## Sharing is Caring
Using the same tools for Android, iOS and backend development is already a big plus. But you can go one step further.

With RoboVM, you can **share large portitions of your code** between iOS, Android and your backend. This includes any **platform-independent code**, such as your business logic. By designing your native UIs according to **[MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)** or **[MVVM](http://en.wikipedia.org/wiki/Model_View_ViewModel)**, you can also share the C or VM of your UI code.

If this is still not enough sharing for your taste, you can use **[JavaFX](http://javafxports.org/)** to share not only your platform independent code, but also your UI code across iOS, Android and desktop environments.

RoboVM also powers **[libGDX](http://libgdx.badlogicgames.com)**, a very popular game development framework. It lets you target iOS, Android, Blackberry, Windows, Linux, Mac OS X and WebGL-enabled browsers with a single shared code base.

## Ready?
Here's our 5 step program to happiness:

1. **[Sign up](https://account.robovm.com/#/register)** for a free 14-day trial.
2. Get up to speed with our **[Getting Started Guide](getting-started/introduction.md)**.
3. Follow our **[Tutorials & Scrceencasts](tutorials/introduction.md)**.
4. Dissect our **[Samples](samples.md)**.
5. Talk to us on our **[Mailing List](https://groups.google.com/forum/#!forum/robovm)** or drop us a line at **[hello@robovm.com](mailto:hello@robovm.com)**

Happy Coding!
