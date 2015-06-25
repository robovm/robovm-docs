# Configuration Reference

The recommended way to build RoboVM apps is to use a `robovm.xml` file to configure the compiler. This section lists the supported elements and also the corresponding command line options (if any.)

The `robovm.xml` file is usually accompanied by a `robovm.properties` file. The `robovm.xml` file will be searched for these properties and any matches will be replaced with the actual value from the properties file. Properties are referenced using the same `${...}` syntax as used by Maven, Gradle and Ant. Here's and example:

##### robovm.properties:

```
app.executable=IOSDemo
app.name=IOSDemo
```

##### robovm.xml:

```xml
<config>
  <executableName>${app.executable}</executableName>
  <mainClass>${app.mainclass}</mainClass>
  <os>ios</os>
  <arch>thumbv7</arch>
  <resources>
    <resource>
      <directory>resources</directory>
    </resource>
  </resources>
  <target>ios</target>
  <iosInfoPList>Info.plist.xml</iosInfoPList>
</config>
```

> NOTE: All relative paths specified in a `robovm.xml` file will be resolved relative to the file itself.

## &lt;installDir&gt;

Specifies where to install the generated executable and other files. The default is `<working-dir>/<executableName>`. For iOS apps the app will always be created in a sub-folder in the specified `<installDir>` folder named like the `CFBundleExecutable` value in the app´s `Info.plist.xml` file and with `.app` appended.

##### Example:

```xml
<installDir>target/MyApp</installDir>
```

##### Command line usage:

`-d <dir>`

## &lt;executableName&gt;

Specifies the name of the executable to be generated.

##### Example:

```xml
<executableName>MyAppExe</executableName>
```

##### Command line usage:

`-o <name>`

## &lt;useDynamicJni&gt;

Specifies whether to use dynamic JNI. With this enabled native methods will be dynamically linked at runtime. Native methods in classes in the boot classpath will always use static JNI. On iOS only static JNI is supported and this option is ignored. The default is `false`.

##### Example:

```xml
<useDynamicJni>true</useDynamicJni>
```

##### Command line usage:

`-dynamic-jni`

## &lt;skipRuntimeLib&gt;

Specifies whether the default `robovm-rt.jar` should be automatically added to the bootclasspath. The default is `true`

##### Example:

```xml
<skipRuntimeLib>false</skipRuntimeLib>
```

##### Command line usage:

`-skiprt`

## &lt;mainJar&gt;

This is the equivalent of the `-jar` command line option to the `java` command. The jar file will be added to the classpath and RoboVM will use the `Main-Class` set in the `META-INF/MANIFEST.MF` file in the jar file as `<mainClass>` value. Either this or `<mainClass>` must be specified.

##### Example:

```xml
<mainJar>lib/my-app.jar</mainJar>
```

##### Command line usage:

`-jar <file>`

## &lt;mainClass&gt;

Specifies the fully-qualified name of the class containing the `main(String[])` method that will be called when starting the app. Either this or `<mainJar>` must be specified.

##### Example:

```xml
<mainClass>com.example.MyApp</mainClass>
```

##### Command line usage:

Specified after all RoboVM compiler options but before any program options.

## &lt;cacerts&gt;

Specifies the cacerts file to be included in the app. RoboVM includes the same CA cerificates as included in Android 4.4.3. Allowed values are `none` and `full`. Default is `full` but no cacerts will be included unless the code actually needs them.

##### Example:

```xml
<cacerts>none</cacerts>
```

##### Command line usage:

`-cacerts <value>`

## &lt;os&gt;

Specifies the name of the OS to build for. Allowed values are `auto`, `linux`, `macosx` and `ios`. Default is `auto` which normally means to build for the current host OS.

##### Example:

```xml
<os>ios</os>
```

##### Command line usage:

`-os <name>`

## &lt;arch&gt;

Specifies the name of the CPU architecture to compile for. Allowed values are `auto`, `x86`, `x86_64`, `thumbv7`, `arm64`. Default is `auto` which  normally means to build for the current host's CPU architecture.

##### Example:

```xml
<arch>thumbv7</arch>
```

##### Command line usage:

`-arch <name>`

## &lt;forceLinkClasses&gt;

Contains `<pattern>` elements listing class patterns matching classes that must be linked in even if not referenced (directly or indirectly) from the main class. If no main class is specified all classes will be linked in unless this option has been given. Patterns are specified using an ANT style path syntax with the following rules:

* `?` matches one character.
* `*` matches zero or more characters.
* `**` matches zero or more packages in a fully-qualified class name.

An alternative syntax using `#` is also supported. This is useful when
specifying patterns on the command line as it prevents the shall from
expanding `*` characters.

##### Example:

```xml
<forceLinkClasses>
  <pattern>com.android.okhttp.HttpHandler</pattern>
  <pattern>com.android.okhttp.HttpsHandler</pattern>
  <pattern>com.android.org.conscrypt.**</pattern>
</forceLinkClasses>
```

##### Command line usage:

`-forcelinkclasses <list>`

> NOTE: `-forcelinkclasses` can either be specified multiple times on the command line, each specifying a single pattern or specified once with multiple `:` separated patterns. E.g. `-forcelinkclasses 'com.example.Foo:com.example.bar.**'`.

## &lt;treeShaker&gt;

Specifies the tree shaking algorithm to be used by the compiler. With tree shaking enabled the compiler will strip out unused methods, reducing executable file size and reducing compile and link times. The supported modes are:

* `none` - Disables tree shaking. This is the default.
* `conservative` - Only allows unused methods marked with the `@WeaklyLinked` annotation to be stripped.
* `aggressive` - Strips out all methods which aren't reachable from the main class.

Common for any mode is that constructors are always preserved as well as static initializers. Also, methods in the main class and in force linked classes will never be stripped.

##### Example:

```xml
<treeShaker>conservative</treeShaker>
```

##### Command line usage:

`-treeshaker <mode>`

> WARNING: Tree shaking is an experimental feature.

## &lt;libs&gt;

Specifies, in nested `<lib>` elements, static libraries (with extension `.a`), object files (with extension `.o`) and system libraries that should be included when linking the final executable.

If `force="true"` has been specified for a `<lib>` poining at a static library the entire static library will be linked in regardless of whether the symbols in it are referenced by the rest of the app's code or not. This uses the `-force_load` command line linker option when building for Mac OS X and iOS and `--whole-archive` when building for Linux. The default is `force="true"`.

##### Example:

```xml
<libs>
  <lib force="false">lib/libfoo.a</lib>
  <lib>lib/myobjectfile.o</lib>
  <lib>curl</lib>
</libs>
```

##### Command line usage:

`-libs <list>`

> NOTE: `-libs` can either be specified multiple times on the command line, each specifying a single value or specified once with multiple `:` separated values. E.g. `-libs 'lib/libfoo.a:curl'`.

> CAUTION: There's no way to specify `force="false"` when using `-libs` from the command line. Use a `robovm.xml` file instead.

## &lt;exportedSymbols&gt;

Specifies, in nested `<symbol>` elements, symbols that should be exported when linking the executable. This can be used when linking in functions which will be called using Bro. Wildcards can be used to match symbols:

* `*` matches zero or more characters,
* `?` matches one character.
* `[abc]`, `[a-z]` matches one character from the specified set of characters.

##### Example:

```xml
<exportedSymbols>
  <symbol>CB*</symbol>
  <symbol>sin</symbol>
</exportedSymbols>
```

##### Command line usage:

`-exportedsymbols <list>`

> NOTE: `-exportedsymbols` can either be specified multiple times on the command line, each specifying a single value or specified once with multiple `:` separated values. E.g. `-exportedsymbols 'CB*:sin'`.

## &lt;unhideSymbols&gt;

Specifies, in nested `<symbol>` elements, symbols in linked in static libraries that are hidden in the library but should be unhidden and exported when linking the executable. This is required if such symbols are referenced by Bro `@Bridge` or `@GlobalValue` methods. Unlike `<exportedSymbols>` wildcards are not supported in the `<unhideSymbols>` section. Symbols unhidden using `<unhideSymbols>` will always be exported.

For each symbol listed in `<unhideSymbols>` the RoboVM compiler will create an exported alias symbol with the same name as the hidden symbol and the prefix `_unhidden_` added. If Bro fails to find a symbol during resolution of a `@Bridge` or `@GlobalValue` method it will prepend `_unhidden_` to the symbol name and retry the lookup.

The following command will produce a list of `FOO`/`kFOO` prefixed hidden symbols in the static library `libfoo.a` suitable for use with `<unhideSymbols>`:
```
nm -U libfoo.a | awk '/ [a-z] _(FOO|kFOO)/ {print substr($3, 2)} | sort -u'
```

##### Example:

```xml
<unhideSymbols>
  <symbol>foo</symbol>
  <symbol>bar</symbol>
</unhideSymbols>
```

##### Command line usage:

`-unhidesymbols <list>`

> NOTE: `-unhidesymbols` can either be specified multiple times on the command line, each specifying a single value or specified once with multiple `:` separated values. E.g. `-unhidesymbols 'foo:bar'`.

## &lt;frameworks&gt;

Specifies, in nested `<framework>` elements, Mac OS X or iOS frameworks that should be linked against when linking the final executable.

##### Example:

```xml
<frameworks>
  <framework>CoreImage</framework>
  <framework>UIKit</framework>
</frameworks>
```

##### Command line usage:

`-frameworks <list>`

> NOTE: `-frameworks` can either be specified multiple times on the command line, each specifying a single value or specified once with multiple `:` separated values. E.g. `-frameworks 'CoreImage:UIKit'`.

## &lt;weakFrameworks&gt;

Specifies, in nested `<framework>` elements, Mac OS X or iOS frameworks that should be weakly linked against when linking the final executable. Weakly linking against a framework means that all symbols in the framework will be marked as weakly linked. This allows apps to be built against one version of a framework which defines a particular symbol and later run against a different version of that framework which doesn't have that symbol defined. If that symbol had been strongly linked the app would immediately crash at launch.

##### Example:

```xml
<weakFrameworks>
  <framework>AdSupport</framework>
  <framework>StoreKit</framework>
</weakFrameworks>
```

##### Command line usage:

`-weakframeworks <list>`

> NOTE: `-weakframeworks` can either be specified multiple times on the command line, each specifying a single value or specified once with multiple `:` separated values. E.g. `-weakframeworks 'CoreImage:UIKit'`.

## &lt;frameworkPaths&gt;

Specifies, in nested `<path>` elements, framework search paths used when searching for custom frameworks.

##### Example:

```xml
<frameworkPaths>
  <path>lib/frameworks</path>
</frameworkPaths>
```

##### Command line usage:

`-frameworkpaths <list>`

> NOTE: `-frameworkpaths` can either be specified multiple times on the command line, each specifying a single value or specified once with multiple `:` separated values. E.g. `-frameworkpaths 'lib/frameworks:../frameworks'`.

## &lt;resources&gt;

Specifies files and directories that should be copied to the installation directory. A resource can be specified using a single path:

##### Example:

```xml
<resources>
  <resource>path/to/the/resource.txt</resource>
</resources>
```

> NOTE: If the path specifies a directory, that directory including its contents (except for the default excludes, see below) will be copied. If the path specifies a file, that file will be copied directly to the installation directory.

A resource be also be specified with a base directory, a target path and include and exclude filters (similar to Maven's `<resource>` element):

##### Example:

```xml
<resources>
  <resource>
   <targetPath>data</targetPath>
   <directory>resources</directory>
   <includes>
     <include>**/*</include>
   </includes>
   <excludes>
     <exclude>**/*.bak</exclude>
   </excludes>
   <flatten>false</flatten>
   <ignoreDefaultExcludes>false</ignoreDefaultExcludes>
   <skipPngCrush>false</skipPngCrush>
  </resource>
</resources>
```

### &lt;targetPath&gt;

The target path relative to the installation directory (i.e. app bundle directory for iOS apps) where paths matching this `<resource>` will be copied. If not specified paths will be copied directly to the installation directory.

### &lt;directory&gt;

The base directory containing the files and directories copied by the `<resource>`.

### &lt;includes&gt;

Specifies one or more Ant-style patterns (using `**`, `*` and `?` as wildcards) matching files which will be included when copying this `<resource>`.

### &lt;excludes&gt;

Specifies one or more Ant-style patterns (using `**`, `*` and `?` as wildcards) matching files which will be excluded when copying this `<resource>`.

### &lt;flatten&gt;

Set to `true` if the files matched by this `<resource>` should be copied directly into the installation directory without preserving the directory structure of the source directory. The default is `false`.

### &lt;ignoreDefaultExcludes&gt;

Set to `true` if the <<defaultexcludes,default excludes>> should be ignored and copied for this `<resource>`. The default is `false`, i.e. don't copy files matching the default excludes.

### &lt;skipPngCrush&gt;

Set this to `true` if `pngcrush` should not be called for PNG files matching this `<resource>` when targeting iOS. The default is `false`, i.e. `pngcrush` WILL be called for PNG files.

> NOTE: Depending on the target (iOS, Mac OS X or Linux) resources may be transformed and renamed while being copied (e.g. running `pngcrush` or converting `xib` files to `nib` files).

### Resource processing

By default, any resources found in the specified resource paths will be copied to the installation directory. However, there exist several specific files and folders that need to be processed first before they can be used in an iOS application.

The following sections explain which resources will be automatically processed for you and what they are used for.

#### .xcassets folders

`.xcassets` folders, also known as `Asset Catalogs`, contain graphical assets grouped into several subfolders, also known as `Sets`. Each set contains several image files along with a `Contents.json` file that describes the images.

The following types of sets are supported:

* __&lt;name&gt;.imageset__: If your app has a deployment target of iOS 7 or higher images in this set will be converted into a runtime binary format to reduce the overall app size. Otherwise they will simply be copied to the install directory. You can access an image by its name with `UIImage.create(String)`.

* __AppIcon.appiconset__: Images in this set will be used as the app icon of the iOS app.

* __LaunchImage.launchimage__: Images in this set will be used as the launch image of the iOS app.

#### .atlas folders

`.atlas` folders contain several graphic files that will be merged into one or multiple texture atlases. The result is a `.atlasc` folder named after the resource folder that contains the texture atlas image files and a property list file with the coordinates to all texture regions.

The resulting texture atlas can be used via SpriteKit's `SKTextureAtlas` or manually by reading the files.

> NOTE: Texture atlas generation can be configured with the &lt;tools&gt; element.

### Default excludes

(The same as those used by Ant 1.9)


```
# Miscellaneous typical temporary files

**/*~
**/#*#
**/.#*
**/%*%
**/._*

# CVS

**/CVS
**/CVS/**
**/.cvsignore

# SCCS

**/SCCS
**/SCCS/**

# Visual SourceSafe

**/vssver.scc

# Subversion

**/.svn
**/.svn/**

# Git

**/.git
**/.git/**
**/.gitattributes
**/.gitignore
**/.gitmodules

# Mercurial

**/.hg
**/.hg/**
**/.hgignore
**/.hgsub
**/.hgsubstate
**/.hgtags

# Bazaar

**/.bzr
**/.bzr/**
**/.bzrignore

# Mac

**/.DS_Store
```

##### Command line usage:

`-resources <list>`

> NOTE: `-resources` can either be specified multiple times on the command line, each specifying a single value or specified once with multiple `:` separated values. E.g. `-resources '+resources/**:data/*+'`.

> CAUTION: If a pattern is specified on the command line using `-resources` the longest non-pattern path before the first wildcard will be used as base directory and will not be recreated in the installation directory. E.g. with the pattern `+resources/**+` all files and folders in the folder named `resources` will be copied directly to the installation directory.

## &lt;tools&gt;

Specifies, in nested elements, additional configuration options for various command line tools that are used to process Cocoa-specific resources.

### &lt;textureAtlas&gt;

Specifies configuration options for the `TextureAtlas` tool. This tool is used for processing `.atlas` folders with image files into valid texture atlases.

##### Example:

```xml
<tools>
  <textureAtlas>
    <outputFormat>RGBA8888_PNG</outputFormat>
    <maximumTextureDimension>2048x2048</maximumTextureDimension>
    <powerOfTwo>true</powerOfTwo>
  </textureAtlas>
</tools>
```

#### &lt;outputFormat&gt;

Specifies the output format of the resulting texture atlas.

Can be any of the following:

* RGBA8888_PNG (default)
* RGBA8888_COMPRESSED
* RGBA4444_COMPRESSED
* RGBA5551_COMPRESSED
* RGB565_COMPRESSED

#### &lt;maximumTextureDimension&gt;

Specifies the maximum allowed dimension of the resulting texture atlas.

Can be any of the following:

* 2048x2048 (default)
* 4096x4096

#### &lt;powerOfTwo&gt;

Specifies whether the dimensions of the resulting texture atlas should be power of 2. Default is `false`.

## &lt;bootclasspath&gt;

Specifies, in nested `<classpathentry>` elements, directories, JAR archives, and ZIP archives to search for class files to be compiled by the RoboVM compiler. Classes in these entries will be loaded by the boot classloader at runtime.  Used to locate the `+java.*+` and `+javax.*+` classes. Default is `<robovm-home>/lib/robovm-rt.jar`.

##### Example:

```xml
<bootclasspath>
  <classpathentry>path/to/my/robovm-rt.jar</classpathentry>
</bootclasspath>
```

##### Command line usage:

`-bootclasspath <list>`
`-bootcp <list>`
`-bcp <list>`

> NOTE: `-bootclasspath` can either be specified multiple times on the command line, each specifying a single value or specified once with multiple `:` separated values.

> CAUTION: When running RoboVM in an IDE like Eclipse and IntelliJ, or from a build tool such as Maven and Gradle the `<bootclasspath>` and `<classpath>` elements in the `robovm.xml` file will be ignored. Instead the classpaths of the IDE or build tool with be used.

## &lt;classpath&gt;

Specifies, in nested `<classpathentry>` elements, directories, JAR archives, and ZIP archives to search for class files to be compiled by the RoboVM compiler. Classes in these entries will be loaded by the system classloader at runtime.

##### Example:

```xml
<classpath>
  <classpathentry>target/classes</classpathentry>
  <classpathentry>lib/commons-lang.jar</classpathentry>
</classpath>
```

##### Command line usage:

`-classpath <list>`
`-cp <list>`

> NOTE: `-classpath` can either be specified multiple times on the command line, each specifying a single value or specified once with multiple `:` separated values.

> CAUTION: When running RoboVM in an IDE like Eclipse and IntelliJ, or from a build tool such as Maven and Gradle the `<bootclasspath>` and `<classpath>` elements in the `robovm.xml` file will be ignored. Instead the classpaths of the IDE or build tool with be used.

## &lt;targetType&gt;

Specifies the target to build for. Either `auto`, `console` or `ios`. The default is `auto` which means use `<os>` to decide.

##### Example:

```xml
<targetType>ios</targetType>
```

##### Command line usage:

`-target <name>`

## &lt;iosSdkVersion&gt;

(*iOS only*) Specifies the version number of the iOS SDK to build against. If not specified the latest SDK that can be found will be used.

##### Example:

```xml
<iosSdkVersion>8.0</iosSdkVersion>
```

.Command line usage:
`-sdk <version>`

## &lt;iosInfoPList&gt;

(*iOS only*) `Info.plist` file to be used by the app. If not specified a simple `Info.plist` will be generated with a `CFBundleIdentifier` based on the `<mainClass>` or `<executableName>`.

##### Example:

```xml
<iosInfoPList>plists/Info.plist</iosInfoPList>
```

##### Command line usage:

`-plist <file>`

> TIP: The specified `Info.plist` file will be searched for `${...}` patterns just like `robovm.xml` files are. Such patterns will be replaced by the corresponding property, usually read from a `robovm.properties` file.

## &lt;iosResourceRulesPList&gt;

(*iOS only*) Property list (`.plist`) file containing resource rules passed to `codesign` when signing the app.

##### Example:

```xml
<iosResourceRulesPList>plists/ResourceRules.plist</iosResourceRulesPList>
```

##### Command line usage:

`-resourcerules <file>`

## &lt;iosEntitlementsPList&gt;

(*iOS only*) Property list (`.plist`) file containing entitlements passed to `codesign` when signing the app.

##### Example:

```xml
<iosEntitlementsPList>plists/Entitlements.plist</iosEntitlementsPList>
```

##### Command line usage:

`-entitlements <file>`
