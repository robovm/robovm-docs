# The Bro Java to Native Bridge

Bro is a RoboVM specific API that enables Java code to call directly into native code without using JNI. It has been inspired by [JNA](https://github.com/twall/jna), [BridJ](http://code.google.com/p/bridj/) and [.NET's P/Invoke](http://en.wikipedia.org/wiki/Platform_Invocation_Services).

Bro is the Swedish word for bridge and is pronounced broo.

We'll introduce bro with a simple example:

```java
import org.robovm.rt.bro.*;
import org.robovm.rt.bro.annotation.*;

@Library("c") // [1]
public class Abs {
    static {
        Bro.bind(); // [3]
    }
    @Bridge private static native int abs(int i); // [2]
    public static void main(String[] args) {
        System.out.println(abs(-100));
    }
}
```

1. The `@Library` annotation tells Bro to look for symbols in the `libc` system library. Bro will prepend `lib` and append `.so` to the specified library name when searching for a matching library

2. The `@Bridge` annotated `Abs.abs()` method will bind to the native [`abs()`](http://pubs.opengroup.org/onlinepubs/009695399/functions/abs.html) function in `libc`.

3. The `Bro.bind()` call initiates the lookup of native functions and binds them to the corresponding `@Bridge` annotated methods. This process relies on [`dlopen()`](http://pubs.opengroup.org/onlinepubs/009695399/functions/dlopen.html) and [`dlsym()`](http://pubs.opengroup.org/onlinepubs/009695399/functions/dlsym.html) to find matching symbols.

## Primitive type marshaling

### Primitive Java types

Native integer types (e.g. `char`, `int32_t`, `float`) are mapped to Java integer types of the same size:

| Java   | Bits | Example C type *   |
|--------|------|--------------------|
| byte   | 8    | char, uint8_t      |
| short  | 16   | short              |
| char   | 16   | uint16_t           |
| int    | 32   | int, int32_t       |
| long   | 64   | long long, int64_t |
| float  | 32   | float              |
| double | 64   | double             |

\* Depends on compiler and platform

> NOTE: Unsigned types (e.g. `uint32_t`) are mapped to the signed Java type of the same bit size.

#### Platform dependent primitive types

Some native types have varying bit sizes depending on the target platform. E.g. the C `long` type is usually a 32-bit integer on 32-bit platforms but a 64-bit integer on 64-bit platforms. To support such types Bro provides three different annotations:

##### @MachineSizedFloat

`@MachineSizedFloat` is used to bind floating point types which are 32-bit on 32-bit platforms and 64-bit on 64-bit platforms. The `CGFloat` type in Apple's Cocoa and CocoaTouch APIs is an example of such a type. `CGFloat` is bound using `@MachineSizedFloat double` in RoboVM's CocoaTouch bindings. On the Java side the value is kept in a `float` or `double` and Bro will take care of the native<-->Java conversion.

##### Example usage:

The C function which returns x^y^ of a `CGFloat` value

```c
CGFloat pow(CGFloat x, CGFloat y);
```

would be bound like this using Bro:

```java
@Bridge
public native @MachineSizedFloat double pow(
    @MachineSizedFloat double x,
    @MachineSizedFloat double y);
```

> NOTE: The method parameter or return type annotated with `@MachineSizedFloat` must either have the Java type `float` or `double`.

> CAUTION: When using `@MachineSizedFloat float` on 64-bit platforms Bro will cast the native value from a 64-bit `double` to a 32-bit `float` value when converting a native value to a Java value. This operation may result in loss of precision. The same situation occurs when using `@MachineSizedFloat double` on 32-bit platforms and passing a Java value to native code.

##### @MachineSizedSInt

`@MachineSizedSInt` is used to bind signed integer types which are 32-bit on 32-bit platforms and 64-bit on 64-bit platforms. The `NSInteger` type in Apple's Cocoa and CocoaTouch APIs is an example of such a type. `NSInteger` is bound using `@MachineSizedSInt long` in RoboVM's CocoaTouch bindings. On the Java side the value is always kept in a `long` and Bro will take care of the native<-->Java conversion.

##### Example usage:

The C function which returns the asbolute of an `NSInteger` value

```c
NSInteger abs(NSInteger v);
```

would be bound like this using Bro:

```java
@Bridge
public native @MachineSizedSInt long abs(
    @MachineSizedSInt long v);
```

> NOTE: The method parameter or return type annotated with `@MachineSizedSInt` must have the Java type `long`.

##### @MachineSizedUInt

`@MachineSizedUInt` is used to bind signed integer types which are 32-bit on 32-bit platforms and 64-bit on 64-bit platforms. The `NSUInteger` type in Apple's Cocoa and CocoaTouch APIs is an example of such a type. `NSUInteger` is bound using `@MachineSizedUInt long` in RoboVM's CocoaTouch bindings. On the Java side the value is always kept in a `long` and Bro will take care of the native<-->Java conversion.

##### Example usage:

The C function which returns the max of two `NSUInteger` values

```c
NSUInteger max(NSUInteger a, NSUInteger b);
```

would be bound like this using Bro:

```java
@Bridge
public native @MachineSizedUInt long max(
    @MachineSizedUInt long a,
    @MachineSizedUInt long b);
```

> NOTE: The method parameter or return type annotated with `@MachineSizedUInt` must have the Java type `long`.

##### Pointers

Pointers are passed as Java `long` values annotated with the Bro `@Pointer` annotation. The Bro compiler will handle the 64-bit <--> 32-bit conversions on 32-bit platforms.

##### Example usage:

The C `malloc()` function

```c
void *malloc(size_t size);
```

could be bound like this using Bro:

```java
@Bridge
public native @Pointer long malloc(
    @MachineSizedUInt long size);
```

#### Primitive type pointer classes

Bro provides special pointer classes for each of the Java primitive types which makes it easier to work with pointers to primitive types. Using these classes facilitates converting between Java arrays of primitives and native memory, converting pointers to direct `java.nio.Buffer` instances and more. These classes are located in the [`org.robovm.rt.bro.ptr`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/ptr/package-summary.html) package.

##### Example of using the `BytePtr` class:

The C `getenv()` function

```c
char *getenv(const char *name);
```

can be bound like this using Bro in RoboVM:

```java
@Bridge
public native BytePtr getenv(BytePtr name);
```

And used like this to print out the value of `$HOME`:

```java
public static void main(String[] args) {
    BytePtr value = getenv(BytePtr.toBytePtrAsciiZ("HOME"));
    System.out.println(value.toStringAsciiZ());
}
```

## Structs

C `struct` types are mapped to Java by extending the bro [`Struct`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/Struct.html) class. Each member of the C `struct` is bound using a getter method and a setter method that must be `native` and annotated with the bro `@StructMember` annotation. The `@StructMember` annotation specifies the index of the member in the `struct`. The getter method must take 0 parameters and return some value while the setter method must take 1 parameter of the same type as the getter returns. The return type for the setter must either be `void` or the `Struct` class it belongs to.

> TIP: The names of the getter and setter methods don't have to follow the Java Beans style convention for Java Beans properties.

> TIP: If the setter method is declared as returning an instance of the `Struct` class it belongs to the Bro compiler will make it return `this` making it possible to chain setter method calls.

##### Example struct:

The C `struct timeval`

```c
struct timeval {
    time_t       tv_sec;   /* seconds since Jan. 1, 1970 */
    suseconds_t  tv_usec;  /* and microseconds */
};
```

can be bound like this using Bro in RoboVM:

```java
public class Timeval extends Struct<Timeval> {
    @StructMember(0) public native int tv_sec();
    @StructMember(0) public native Timeval tv_sec(int i);
    @StructMember(1) public native int tv_usec();
    @StructMember(1) public native Timeval tv_usec(int i);
}
```

And used like this to call [`gettimeofday()`](http://pubs.opengroup.org/onlinepubs/009695399/functions/gettimeofday.html):

```java
@Bridge static native int gettimeofday(Timeval tp, VoidPtr tzp);
public static void main(String[] args) {
    Timeval t = new Timeval();
    gettimeofday(t, null);
    System.out.format("Seconds since epoch: %d\n", t.tv_sec());
}
```

### sizeof(struct)

The size in bytes of a `Struct` can easily be queried by calling the static `sizeOf()` method on the `Struct` sub-class:

```java
public class CGRect extends Struct<CGRect> { ... }
System.out.format("sizeof(CGRect) = %d\n", CGRect.sizeOf());
```

### @ByRef and @ByVal

The `@ByRef` and `@ByVal` annotations can be used to control how a `Struct` object is returned from a method or passed as a parameter to a method. `@ByRef` means pass as pointer and is the default. `@ByVal` means pass by value. The default can be changed to `@ByVal` for a particular `Struct` class by annotating the class with `@ByVal`:

```java
@ByVal
public class Person extends Struct<Person> { ... }
```

### Nested structs

`Struct` classes can contain other `Struct` objects as members, either by value or by reference (i.e. by pointer). The default is `@ByRef` with the same possibilities to override the default as for methods.

Below is an example of how the CocoaTouch `struct CGRect` type is mapped to Java in the RoboVM Cocoa Touch bindings. A `CGRect` has two members: the `origin` is a `CGPoint` `struct` and the `size` is a `CGSize` struct.

##### C:

```c
struct CGRect {
    CGPoint origin;
    CGSize  size;
};
```

##### Java:

```java
public class CGRect extends Struct<CGRect> {
    public CGRect() {}
    public CGRect(float x, float y, float width, float height) {
        origin().x(x).y(y);
        size().width(width).height(height);
    }
    public CGRect(CGPoint origin, CGSize size) {
        origin(origin);
        size(size);
    }
    @StructMember(0) public native @ByVal CGPoint origin();
    @StructMember(0) public native CGRect origin(@ByVal CGPoint origin);
    @StructMember(1) public native @ByVal CGSize size();
    @StructMember(1) public native CGRect size(@ByVal CGSize size);
}
```

## Unions

A C `union` is bound just like a C `struct` but has overlapping `@StructMember` indexes:

##### C:

```c
union TestUnion {
    int i;
    short s1;
    short s2;
};
```

##### Java:

```java
public class TestUnion extends Struct<TestUnion> {
    @StructMember(0) public native int i();
    @StructMember(0) public native TestUnion i(int i);
    @StructMember(0) public native short s1();
    @StructMember(0) public native TestUnion s1(short s1);
    @StructMember(0) public native short s2();
    @StructMember(0) public native TestUnion s2(short s2);
}
```

## Native array members

Bro provides the `@Array` annotation which is used to bind array struct members. The `@Array` annotation specifies the dimensions of the member's type. Space large enough to hold a native array of the specified type and dimensions will be reserved inside the struct.

Single-dimensional array:

##### C:

```c
struct Vector {
    int values[3];
};
```

##### Java:

```java
public class Vector extends Struct<Vector> {
    @StructMember(0)
    public native @Array(3) int[] values();
    @StructMember(0)
    public native Vector values(@Array(3) int[] values);
}
```

Multi-dimensional array:

##### C:

```c
struct Matrix {
    int values[1, 2, 3];
};
```

##### Java:

```java
public class Matrix extends Struct<Matrix> {
    @StructMember(0)
    public native @Array({1, 2, 3}) int[][][] values();
    @StructMember(0)
    public native Matrix values(@Array({1, 2, 3}) int[][][] values);
}
```

> NOTE: The native data will be copied to and from the `int[]` and `int[][][]` arrays in these examples. Changes in the Java arrays will not be directly reflected in the native data. The setter has to be called to update the native data.

An alternative to using Java arrays is to use a sub-class of `java.nio.Buffer` instead:

Single-dimensional array:

##### C:

```c
struct Vector {
    int values[3];
};
```

##### Java:

```java
public class Vector extends Struct<Vector> {
    @StructMember(0)
    public native @Array(3) IntBuffer values();
    @StructMember(0)
    public native Vector values(@Array(3) IntBuffer values);
}
```

Multi-dimensional array:

##### C:

```c
struct Matrix {
    int values[1, 2, 3];
};
```

##### Java:

```java
public class Matrix extends Struct<Matrix> {
    @StructMember(0)
    public native @Array({1, 2, 3}) IntBuffer values();
    @StructMember(0)
    public native Matrix values(@Array({1, 2, 3}) IntBuffer values);
}
```

> NOTE: The buffer's `capacity()` will be restricted to the dimension of the array. For multi-dimensional arrays this is the product of the dimensions, 1*2*3=6 for the `Matrix` example.

A third option is to use one of the pointer classes in the [`org.robovm.rt.bro.ptr`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/ptr/package-summary.html) package:

Single-dimensional array:

##### C:

```c
struct Vector {
    int values[3];
};
```

##### Java:

```java
public class Vector extends Struct<Vector> {
    @StructMember(0)
    public native @Array(3) IntPtr values();
    @StructMember(0)
    public native Vector values(@Array(3) IntPtr values);
}
```

Multi-dimensional array:

##### C:

```c
struct Matrix {
    int values[1, 2, 3];
};
```

##### Java:

```java
public class Matrix extends Struct<Matrix> {
    @StructMember(0)
    public native @Array({1, 2, 3}) IntPtr values();
    @StructMember(0)
    public native Matrix values(@Array({1, 2, 3}) IntPtr values);
}
```

It's also possible to have arrays of structs in a `Struct`:

##### C:

```c
struct Color {
    char r; char g; char b;
};
struct Gradient {
    Color stops[3];
};
```

##### Java:

```java
public class Color extends Struct<Color> { ... }
public class Gradient extends Struct<Gradient> {
    @StructMember(0) public native @Array(3) Color[] stops();
    @StructMember(0) public native Gradient stops(@Array(3) Color[] stops);
}
```

## Unbounded native array members

For unbounded native array members one should use one of the pointer classes in the [`org.robovm.rt.bro.ptr`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/ptr/package-summary.html) package combined with the `@ByVal` annotation:

##### C:

```c
struct PascalString {
    int length;
    char chars[];
};
```

##### Java:

```java
public class PascalString extends Struct<PascalString> {
    @StructMember(0) public native int length();
    @StructMember(0) public native PascalString length(int length);
    @StructMember(0) public native @ByVal BytePtr chars();
}
```

> NOTE: There's no setter for the `chars` member as that would have required the length to be known at compile time. Setting the individual bytes of `chars` has to be done through the `BytePtr` returned by the getter.

## Struct memory handling

When creating an instance of a `Struct` class Bro actually allocates two memory regions: one for the Java object and one for the actual struct data. The default is to allocate the struct data on the Java heap. There are two way to make sure that the underlying struct data is allocated on the GCed heap:

```java
CGRect r = new CGRect();
CGRect r = Struct.allocate(CGRect.class);
```

This means that the data will be garbage collected when the garbage collector determines that the struct data isn't referenced from any other memory allocated on the garbage collected heap.

Allocating struct data on the GCed heap won't work for native code that holds on to a pointer to the struct data beyond a Java call into a native function since the native heap is not searched by the garbage collector. If the native side assumes ownership of the data and later frees it by a call to `free()` the Java side has to use `malloc()` to allocate it on the native heap:

```java
CGRect r = Struct.malloc(CGRect.class);
```

> CAUTION: If the native side holds on to a memory region allocated on the GCed heap care must be taken on the Java side to make sure that the memory isn't collected until the native side is done with it. As long as the Java `Struct` instance is referenced on the Java side the struct data can't be collected.

> TIP: The memory region allocated to hold a struct's data will always be zeroed out regardless of whether using the Java heap or the native heap.

## Native arrays

This allocates an array of 10 `CGRect` instances:

```java
public class CGRect extends Struct<CGRect> { ... }
CGRect l = Struct.allocate(CGRect.class, 10);
```

This allocates a contiguous memory region big enough to hold 10 `CGRect` instances. The `Struct` class defines a number of methods that can be used to iterate over these, e.g. [`next()`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/Struct.html#next()) and [`previous()`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/Struct.html#previous()).

`Struct` also implements the `Iterable` interface:

```java
for (CGRect r : l) {
    ...
    if (<some condition>) {
        break;
    }
}
```

> CAUTION: The `Iterator` used when `for`-looping like this is unbounded so a `break` is required to finish the loop.

The [`BytePtr`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/ptr/BytePtr.html) class and the other pointer classes in [`org.robovm.rt.bro.ptr`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/ptr/package-summary.html) are in fact `Struct` classes so to allocate a native array of 100 `int` values one could do:

```java
IntPtr myInts = Struct.allocate(IntPtr.class, 100);
```

## Enums

Simple C `enum` constants are mapped using Java `Enum` types which implement the bro [`ValuedEnum`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/ValuedEnum.html) interface. Here's an example:

##### C:

```c
enum {
   NSTextAlignmentLeft,
   NSTextAlignmentCenter,
   NSTextAlignmentRight,
   NSTextAlignmentJustified,
   NSTextAlignmentNatural
};
```

##### Java:

```java
public enum NSTextAlignment implements ValuedEnum {
    Left(0), Center(1), Right(2),
    Justified(3), Natural(4);

    private final long n;

    private NSTextAlignment(long n) { this.n = n; }
    public long value() { return n; }
    public static NSTextAlignment valueOf(long n) {
        for (NSTextAlignment v : values()) {
            if (v.n == n) {
                return v;
            }
        }
        throw new IllegalArgumentException(
            "No constant with value " + n + " found in "
                + NSTextAlignment.class.getName());
    }
}
```

By default Bro marshals a `ValuedEnum` as a signed 32-bit value. The default can be changed by specifying an explicit `@Marshaler` on the enum type. Here's how to marshal `NSTextAlignment` values as platform dependent (32-bit on 32-bit platforms, 64-bit on 64-bit platforms) signed integer values:

##### Overriding the default marshaler for a `ValuedEnum`:

```java
@Marshaler(ValuedEnum.AsMachineSizedSIntMarshaler.class)
public enum NSTextAlignment implements ValuedEnum {
    ...
}
```

There are `ValuedEnum` marshalers for marshaling signed and unsigned 8-, 16-, 32- and 64-bit integer values. They are all available as [inner classes in the `ValuedEnum` interface](http://apidocs.robovm.com/latest/org/robovm/rt/bro/ValuedEnum.html).

> TIP: The `@Marshaler` annotation can also be placed on a particular method return type or parameter type to only change the marshaler for that specific value.

## Bits

Bro provides a class called [`Bits`](http://apidocs.robovm.com/1.0.0-SNAPSHOT/org/robovm/rt/bro/Bits.html) that can be used to bind bitmask constants:

##### C:

```c
enum {
    UIPopoverArrowDirectionUp    = 1UL << 0,
    UIPopoverArrowDirectionDown  = 1UL << 1,
    UIPopoverArrowDirectionLeft  = 1UL << 2,
    UIPopoverArrowDirectionRight = 1UL << 3,
    ...
};
```

##### Java:

```java
public final class UIPopoverArrowDirection
        extends Bits<UIPopoverArrowDirection> {

    public static final UIPopoverArrowDirection None =
            new UIPopoverArrowDirection(0L);
    public static final UIPopoverArrowDirection Up =
            new UIPopoverArrowDirection(1L);
    public static final UIPopoverArrowDirection Down =
            new UIPopoverArrowDirection(2L);
    public static final UIPopoverArrowDirection Left =
            new UIPopoverArrowDirection(4L);
    public static final UIPopoverArrowDirection Right =
            new UIPopoverArrowDirection(8L);
    ...

    private static final UIPopoverArrowDirection[] values =
        _values(UIPopoverArrowDirection.class);

    public UIPopoverArrowDirection(long value) { super(value); }
    private UIPopoverArrowDirection(long value, long mask) {
        super(value, mask);
    }
    protected UIPopoverArrowDirection wrap(long value, long mask) {
        return new UIPopoverArrowDirection(value, mask);
    }
    protected UIPopoverArrowDirection[] _values() {
        return values;
    }
    public static UIPopoverArrowDirection[] values() {
        return values.clone();
    }
}
```

`Bits` values can be ORed using the `Bits.with(...)` methods in a manner very similar to how `java.util.EnumSet.of(...)` works:

##### C:

```c
int upDown = UIPopoverArrowDirectionUp | UIPopoverArrowDirectionDown;
```

##### Java:

```java
UIPopoverArrowDirection upDown = UIPopoverArrowDirection.with(
    UIPopoverArrowDirection.Up, UIPopoverArrowDirection.Down);
```

> TIP: `Bits` types is the preferred way to bind bitmasks since it provides some degree of type-safety and an easier to understand API. It does however impose a performance penalty compared to using `public static final` constants.

By default Bro marshals a `Bits` instance as an unsigned 32-bit value. The default can be changed by specifying an explicit `@Marshaler` on the class. Here's how to marshal `UIPopoverArrowDirection` values as platform dependent (32-bit on 32-bit platforms, 64-bit on 64-bit platforms) unsigned integer values:

##### Overriding the default marshaler for a `Bits`:

```java
@Marshaler(Bits.AsMachineSizedIntMarshaler.class)
public final class UIPopoverArrowDirection
        extends Bits<UIPopoverArrowDirection> {
    ...
}
```

There are `Bits` marshalers for marshaling unsigned 8-, 16-, 32- and 64-bit integer values. They are all available as [inner classes in the `Bits` interface](http://apidocs.robovm.com/latest/org/robovm/rt/bro/Bits.html).

> TIP: The `@Marshaler` annotation can also be placed on a particular method return type or parameter type to only change the marshaler for that specific value.

## Type marshalers

Type marshalers are used by Bro to convert from native types into Java types and vice versa.

#### Pointer marshalers

Pointer marshalers marshal pointers to native objects to/from some Java object that wraps that pointer. The general contract for a pointer marshaler class looks like this:

```java
public class MyTypeMarshaler {
    @MarshalsPointer
    public static MyType toObject(Class<?> cls, long handle, long flags) {
        ...
    }
    @MarshalsPointer
    public static long toNative(MyType o, long flags) {
        ...
    }
}
```

This marshaler marshals `MyType` instances to/from native pointers (`handle`). Bro uses the signatures of the `@MarshalsPointer` methods to determine whether it is a method which marshals Java->native or native->Java. The Java type it can handle is determined by the signature (`MyType` in this case).

The `cls` parameter specifies the actual `Class` used at the marshaling site. The passed in `Class` is assignment compatible with the `MyType` class or interface.

The `flags` parameter gives some information on the call site. The possible values are defined by [`MarshalerFlags`](http://apidocs.robovm.com/latest/org/robovm/rt/bro/MarshalerFlags.html) class.

> TIP: Marshaler method names are unimportant, the signatures are what matters.
