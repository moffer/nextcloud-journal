/**
 * SPDX-FileCopyrightText: 2018 John Molakvoæ <skjnldsv@protonmail.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { generateFilePath } from '@nextcloud/router'

import { createPinia, PiniaVuePlugin } from 'pinia'
import Vue from 'vue'
import App from './App'
const pinia = createPinia()

// eslint-disable-next-line
__webpack_public_path__ = generateFilePath(appName, '', 'js/')

Vue.mixin({ methods: { t, n } })
Vue.use(PiniaVuePlugin)
export default new Vue({
	el: '#content',
	render: h => h(App),
	pinia,
})
