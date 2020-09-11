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

const fullVersionPath = Path(`${app.pathTo(this).toString().split('/').slice(0, -2).join('/')}/Resources/electronVersion`)
const fullVersion = app.read(fullVersionPath)
const majorVersion = fullVersion.split('.')[0]
const home = app.doShellScript('echo $HOME')
const electronPath = `${home}/.ERE`
const majorPath = `${electronPath}/${majorVersion}`

Progress.description = `Downloading Electron Runtime v${fullVersion}...`
Progress.additionalDescription = "This may take a while based on your internet connection"
Progress.totalUnitCount = -1

if (! Application("Finder").exists(Path(majorPath))) {
    app.doShellScript(`mkdir -p ${majorPath}`)

    // TODO Shouldn't be based on fullVersion, should be based on latest minor and patch from npm API
    app.doShellScript(`curl -L https://github.com/electron/electron/releases/download/v${fullVersion}/electron-v${fullVersion}-darwin-x64.zip --output ${majorPath}/electron.zip`)
    
    Progress.additionalDescription = "Unzipping..."
    app.doShellScript(`cd ${majorPath} && unzip electron.zip`)
    
    Progress.additionalDescription = "Cleaning up..."
    app.doShellScript(`rm -f  ${majorPath}/LICENSE ${majorPath}/LICENSES.chromium.html ${majorPath}/electron.zip ${majorPath}/version`)
}