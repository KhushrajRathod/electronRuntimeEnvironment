#!/usr/bin/env node
// Copyright 2020 Khushraj Rathod

// This file is part of electronRuntimeEnvironment.

// electronRuntimeEnvironment is free software: you can redistribute it and / or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// electronRuntimeEnvironment is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with electronRuntimeEnvironment. If not, see <https://www.gnu.org/licenses/>.


const { writeFile, mkdir, copyFile } = require('fs').promises
const { join } = require('path')
const { promisify } = require('util')

const rimraf = promisify(require('rimraf'))

const projectDir = join(__dirname, '..', '..')
const runtime = join(projectDir, 'electronRuntime')

const makeDarwin = async _ => {
    const contentsDir = join(runtime, 'Electron.app', 'Contents')
    const helperContentsDir = join(contentsDir, 'Frameworks', 'Electron Helper.app', 'Contents')
    
    await rimraf(runtime)
    await mkdir(join(helperContentsDir, 'MacOS'), { recursive: true })
    await mkdir(join(contentsDir, 'MacOS'))
    await mkdir(join(contentsDir, 'Resources'))

    const electronVersion = require(join(projectDir,'package')).version

    await Promise.all([
        writeFile(join(contentsDir, 'Resources', 'electron_version'), electronVersion),
        writeFile(join(helperContentsDir, 'MacOS', 'Electron Helper'), ''),
        copyFile(join(__dirname, '../macOS/fetchScriptWrapper'), join(contentsDir, 'MacOS/Electron')),
        copyFile(join(__dirname, '../macOS/electron.plist'), join(contentsDir, 'Info.plist')),
        copyFile(join(__dirname, '../macOS/electron-helper.plist'), join(helperContentsDir, 'Info.plist')),
    ])

    await chmod(join(contentsPath, 'MacOS/Electron'), 0o755)
}

const makeWindows = _ => { throw "Windows is a work in progress, please check back later" }
const makeLinux = _ => { throw "Linux is a work in progress, please check back later"}

switch (process.platform) {
    case "win32":
        makeWindows()
        break;
    case "darwin":
        makeDarwin()
        break;
    case "linux":
        makeLinux()
        break;    
    default:
        throw `Platform: ${process.platform} not supported`
}