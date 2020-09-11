# Electron runtime environment
Electron runtime environment that downloads electron on demand (using native components for dialogs)

- Currently only for macOS (because scripts have to be written per platform)
- Working, but automatic packaging is not ready yet

## Usage
- Place contents of MacOS directory into SomeApp.app/Contents/MacOS/ and rename fetchScriptWrapper.sh to original executable name
- Make a file called electronVersion that contains the semver (without a 'v') in SomeApp.app/Contents/Resources/
- Make a file called appName in SomeApp.app/Contents/Resources/ which should contain the app's name as you want it to be seen in the dock and the name of the icns file placed in Resources
- Support for electron-builder planned soon

# Languages
- macOS is written in native javascript (JXA)