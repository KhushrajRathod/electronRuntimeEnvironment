# Copyright 2020 Khushraj Rathod

# This file is part of electronRuntimeEnvironment.

# electronRuntimeEnvironment is free software: you can redistribute it and / or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# electronRuntimeEnvironment is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with electronRuntimeEnvironment. If not, see < https://www.gnu.org/licenses/>.

scriptdir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
rm -rf "$TMPDIR/Downloading Electron.app"

cat << 'EOF' > $TMPDIR/fetchRuntime.js
SUBSTITUTE_RUNTIME_CODE
EOF


echo "const appContents = \"$(cd $scriptdir/.. && pwd)\"" | cat - $TMPDIR/fetchRuntime.js > $TMPDIR/runtimeTemp && mv $TMPDIR/runtimeTemp $TMPDIR/fetchRuntime.js
osacompile -o "$TMPDIR/Downloading Electron.app" -l JavaScript "$TMPDIR/fetchRuntime.js"
open "$TMPDIR/Downloading Electron.app"