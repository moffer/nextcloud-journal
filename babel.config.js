// SPDX-FileCopyrightText: Rafael Muselmann <ch.subel@gmx.de>
// SPDX-License-Identifier: AGPL-3.0-or-later
let babelConfig = require('@nextcloud/babel-config')
babelConfig.presets=
    [
    "@babel/preset-typescript",
        {
        }
    ];


module.exports = babelConfig
