<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Rafael Muselmann <ch.subel@gmx.de>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\Journal\AppInfo;

use OCP\AppFramework\App;

class Application extends App {
	public const APP_ID = 'journal';

	public function __construct() {
		parent::__construct(self::APP_ID);
	}
}
