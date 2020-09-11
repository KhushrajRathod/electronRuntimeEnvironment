# Electron runtime environment
Electron runtime environment that downloads electron on demand (using native components for dialogs)

- Currently only for macOS (because scripts have to be written per platform)
- Currently doesn't do anything except download electron runtime to ~/.ERE (does not launch app with downloaded electron)

## Usage (Still theory)
- Place contents of macOS directory into SomeApp.app/Contents/MacOS/ and remove fetchScriptWrapper.sh to original executable name

- Make a file called electronVersion that contains the semver (without a 'v') in SomeApp.app/Contents/Resources/

- Support for electron-builder planned

# Languages

- macOS is written in native javascript (JXA)