/**
Copyright 2020 Khushraj Rathod

This file is part of electronRuntimeEnvironment.

electronRuntimeEnvironment is free software: you can redistribute it and / or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

electronRuntimeEnvironment is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with electronRuntimeEnvironment. If not, see < https://www.gnu.org/licenses/>.
*/

const app = Application.currentApplication()
app.includeStandardAdditions = true

const appContents = app.pathTo(this).toString().split('/').slice(0, -2).join('/')

const fullVersion = app.read(Path(`${appContents}/Resources/electronVersion`))
const asarPath = Path(`${appContents}/Resources/app.asar`)
const appName = app.read(Path(`${appContents}/Resources/appName`))

const home = app.doShellScript('echo $HOME')
const electronPath = `${home}/.ERE`

const majorVersion = fullVersion.split('.')[0]
const majorPath = `${electronPath}/${majorVersion}`


if (! Application("Finder").exists(Path(majorPath))) {
    Progress.description = `Downloading Electron Runtime v${fullVersion}...`
    Progress.additionalDescription = "This may take a while based on your internet connection"
    Progress.totalUnitCount = -1

    app.doShellScript(`mkdir -p ${majorPath}`)

    // TODO Shouldn't be based on fullVersion, should be based on latest minor and patch from npm API
    app.doShellScript(`curl -L https://github.com/electron/electron/releases/download/v${fullVersion}/electron-v${fullVersion}-darwin-x64.zip --output ${majorPath}/electron.zip`)
    
    Progress.additionalDescription = "Unzipping..."
    app.doShellScript(`cd ${majorPath} && unzip electron.zip`)
    
    Progress.additionalDescription = "Cleaning up..."
    app.doShellScript(`rm -f  ${majorPath}/LICENSE ${majorPath}/LICENSES.chromium.html ${majorPath}/electron.zip ${majorPath}/version`)
}

// These next lines are potentially hackish. This involves:
// 1. Overwriting the existing (initially electron) icon
// 3. Renaming the app
// 4. Launching the app
// This happens once per launch per app

app.doShellScript(`mv ${appContents}/Resources/${appName}.icns ${majorPath}/*.app/Contents/Resources/electron.icns`)
// Ignore errors here because renaming an app to itself (When launching the same app twice in a row) WILL fail
app.doShellScript(`mv ${majorPath}/*.app ${majorPath}/${appName}.app 2>/dev/null || true`)

ObjC.import('stdlib')
$.system(`nohup ${majorPath}/*.app/Contents/MacOS/Electron ${asarPath} > /dev/null &`)