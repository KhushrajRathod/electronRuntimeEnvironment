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

rm -rf "$scriptdir/build/"
rm -rf ~/.ERE/

"$scriptdir/macOS/fetchScriptWrapper.sh"