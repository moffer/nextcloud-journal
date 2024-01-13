/**
 * @copyright Copyright (c) 2020 Georg Ehrke
 *
 * @author Georg Ehrke <oc.list@georgehrke.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const COMPONENT_NAME_EVENT = 'VEVENT'
const COMPONENT_NAME_JOURNAL = 'VJOURNAL'
const COMPONENT_NAME_VTODO = 'VTODO'

const ITIP_MESSAGE_ADD = 'ADD'
const ITIP_MESSAGE_CANCEL = 'CANCEL'
const ITIP_MESSAGE_COUNTER = 'COUNTER'
const ITIP_MESSAGE_DECLINECOUNTER = 'DECLINECOUNTER'
const ITIP_MESSAGE_PUBLISH = 'PUBLISH'
const ITIP_MESSAGE_REFRESH = 'REFRESH'
const ITIP_MESSAGE_REPLY = 'REPLY'
const ITIP_MESSAGE_REQUEST = 'REQUEST'

const PRINCIPAL_PREFIX_USER = 'principal:principals/users/'
const PRINCIPAL_PREFIX_GROUP = 'principal:principals/groups/'
const PRINCIPAL_PREFIX_CIRCLE = 'principal:principals/circles/'
const PRINCIPAL_PREFIX_CALENDAR_RESOURCE = 'principal:principals/calendar-resources/'
const PRINCIPAL_PREFIX_CALENDAR_ROOM = 'principal:principals/calendar-rooms/'

const CALDAV_BIRTHDAY_CALENDAR = 'contact_birthdays'

const IMPORT_STAGE_DEFAULT = 'default'
const IMPORT_STAGE_IMPORTING = 'importing'
const IMPORT_STAGE_AWAITING_USER_SELECT = 'awaitingUserSelect'
const IMPORT_STAGE_PROCESSING = 'processing'

export {
	COMPONENT_NAME_EVENT,
	COMPONENT_NAME_JOURNAL,
	COMPONENT_NAME_VTODO,
	ITIP_MESSAGE_ADD,
	ITIP_MESSAGE_CANCEL,
	ITIP_MESSAGE_COUNTER,
	ITIP_MESSAGE_DECLINECOUNTER,
	ITIP_MESSAGE_PUBLISH,
	ITIP_MESSAGE_REFRESH,
	ITIP_MESSAGE_REPLY,
	ITIP_MESSAGE_REQUEST,
	PRINCIPAL_PREFIX_USER,
	PRINCIPAL_PREFIX_GROUP,
	PRINCIPAL_PREFIX_CIRCLE,
	PRINCIPAL_PREFIX_CALENDAR_RESOURCE,
	PRINCIPAL_PREFIX_CALENDAR_ROOM,
	CALDAV_BIRTHDAY_CALENDAR,
	IMPORT_STAGE_DEFAULT,
	IMPORT_STAGE_IMPORTING,
	IMPORT_STAGE_AWAITING_USER_SELECT,
	IMPORT_STAGE_PROCESSING,
}
