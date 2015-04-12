# Using the Latest Nightly Build

> WARNING: Nightly builds can be unstable. Use at your own risk!

Every night (Central European Time) development builds of RoboVM are built. The builds are uploaded to http://download.robovm.org and `SNAPSHOT` versions of all Maven artifacts are pushed to Maven Central's snapshots repository as well as `SNAPSHOT` builds of the Maven and Gradle plugins.

## Command line tools

Download the latest `nightlies/robovm-<version>-SNAPSHOT-<build>.tar.gz` from http://download.robovm.org and then follow the instructions in [install-cli-tools] to install and use it.

## Eclipse Plugin

Follow the instructions in [getting-started-eclipse](../getting-started/eclipse.md) but use the following update site:

```
http://download.robovm.org/nightlies/eclipse/
```

## Maven

Use `SNAPSHOT` version dependencies for the RoboVM dependencies in your `pom.xml`. Also make sure you use the corresponding `SNAPSHOT` version of the `robovm-maven-plugin`:

```xml
<properties>
  <robovm.version>x.y.z-SNAPSHOT</robovm.version>
  <robovm.maven.version>x.y.z-SNAPSHOT</robovm.maven.version>
</properties>
...
<dependencies>
  <dependency>
    <groupId>org.robovm</groupId>
    <artifactId>robovm-rt</artifactId>
    <version>${robovm.version}</version>
  </dependency>
  <dependency>
    <groupId>org.robovm</groupId>
    <artifactId>robovm-cocoatouch</artifactId>
    <version>${robovm.version}</version>
  </dependency>
</dependencies>
...
<build>
  <pluginManagement>
    <plugins>
      <plugin>
        <groupId>org.robovm</groupId>
        <artifactId>robovm-maven-plugin</artifactId>
        <version>${robovm.maven.version}</version>
      </plugin>
    </plugins>
  </pluginManagement>
</build>
```

You also have to add the https://oss.sonatype.org/content/repositories/snapshots snapshot repository to your `pom.xml`:

```xml
<repositories>
  <repository>
    <id>sonatype-snapshots</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots</url>
    <snapshots>
      <enabled>true</enabled>
    </snapshots>
  </repository>
</repositories>
<pluginRepositories>
  <pluginRepository>
    <id>sonatype-plugin-snapshots</id>
    <url>https://oss.sonatype.org/content/repositories/snapshots</url>
    <snapshots>
      <enabled>true</enabled>
    </snapshots>
  </pluginRepository>
</pluginRepositories>
```

## Gradle

Use `SNAPSHOT` version dependencies for the RoboVM dependencies in your `build.gradle`. Also make sure you use the corresponding `SNAPSHOT` version of the `robovm-gradle-plugin`:

> NOTE: Gradle caches `SNAPSHOT` dependencies and will not always download new ones as expected. Please clear your Gradle cache (`$HOME/.gradle`, `<projectdir>/.gradle`) to make sure you get the latest `SNAPSHOT` builds.

```groovy
buildscript {
  project.ext.roboVMVersion = "x.y.x-SNAPSHOT"
  project.ext.roboVMGradleVersion = "x.y.z-SNAPSHOT"

  repositories {
    mavenLocal()
    mavenCentral()
    maven { url 'https://oss.sonatype.org/content/repositories/snapshots' }
  }
  dependencies {
    classpath group: 'org.robovm', 
              name: 'robovm-gradle-plugin', 
              version: project.roboVMGradleVersion
  }
}

apply plugin: 'java'
apply plugin: 'robovm'

sourceSets {
  main {
    java {
      srcDir 'src'
    }
  }
}

repositories {
  mavenLocal()
  mavenCentral()
  maven { url 'https://oss.sonatype.org/content/repositories/snapshots' }
}

dependencies {
  compile group: 'org.robovm', name: 'robovm-rt', version: project.roboVMVersion
  compile group: 'org.robovm', name: 'robovm-cocoatouch', version: project.roboVMVersion
}

robovm {
  // Configure robovm
}

task wrapper(type: Wrapper) {
  gradleVersion = '2.0'
}
```
