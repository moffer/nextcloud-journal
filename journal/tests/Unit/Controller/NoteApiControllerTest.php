<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Rafael Muselmann <ch.subel@gmx.de>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\Journal\Tests\Unit\Controller;

use OCA\Journal\Controller\NoteApiController;

class NoteApiControllerTest extends NoteControllerTest {
	public function setUp(): void {
		parent::setUp();
		$this->controller = new NoteApiController($this->request, $this->service, $this->userId);
	}
}
