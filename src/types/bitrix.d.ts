interface IBitrixResponse<T> {
    result: T;
    time: IBitrixResponseTime;
}

interface IBitrixResponseTime {
    start: number;
    finish: number;
    duration: number;
    processing: number;
    date_start: string;
    date_finish: string;
}

interface IBitrixResponsePagination<T> extends IBitrixResponse<T> {
    next: number;
    total: number;
}


interface IApiSection {
    ID: string
    NAME: string
    GAPI_CALENDAR_ID: any
    DESCRIPTION: any
    COLOR: string
    TEXT_COLOR: any
    EXPORT: Export
    CAL_TYPE: string
    OWNER_ID: string
    CREATED_BY: string
    DATE_CREATE: string
    TIMESTAMP_X: string
    CAL_DAV_CON: boolean
    SYNC_TOKEN: any
    PAGE_TOKEN: any
    EXTERNAL_TYPE: string
    PERM: Perm
    ACCESS: Access
}

interface Export {
    ALLOW: boolean
    LINK: string
}

interface Perm {
    view_time: boolean
    view_title: boolean
    view_full: boolean
    add: boolean
    edit: boolean
    edit_section: boolean
    access: boolean
}

interface Access {
    G2: string
    U1552: string
}

interface IApiUser {
    ID: string
    XML_ID: string
    ACTIVE: boolean
    NAME: string
    LAST_NAME: string
    SECOND_NAME: string
    TITLE: string
    EMAIL: string
    LAST_LOGIN: string
    DATE_REGISTER: string
    TIME_ZONE: string
    IS_ONLINE: string
    TIME_ZONE_OFFSET: string
    TIMESTAMP_X: TimestampX
    LAST_ACTIVITY_DATE: LastActivityDate
    PERSONAL_GENDER: string
    PERSONAL_PROFESSION: string
    PERSONAL_WWW: string
    PERSONAL_BIRTHDAY: string
    PERSONAL_PHOTO: string
    PERSONAL_ICQ: string
    PERSONAL_PHONE: string
    PERSONAL_FAX: string
    PERSONAL_MOBILE: string
    PERSONAL_PAGER: string
    PERSONAL_STREET: string
    PERSONAL_CITY: string
    PERSONAL_STATE: string
    PERSONAL_ZIP: string
    PERSONAL_COUNTRY: string
    PERSONAL_MAILBOX: string
    PERSONAL_NOTES: string
    WORK_PHONE: string
    WORK_COMPANY: string
    WORK_POSITION: string
    WORK_DEPARTMENT: string
    WORK_WWW: string
    WORK_FAX: string
    WORK_PAGER: string
    WORK_STREET: string
    WORK_MAILBOX: string
    WORK_CITY: string
    WORK_STATE: string
    WORK_ZIP: string
    WORK_COUNTRY: string
    WORK_PROFILE: string
    WORK_NOTES: string
    UF_EMPLOYMENT_DATE: string
    UF_DEPARTMENT: any[]
    UF_USR_1681901823082: any[]
    USER_TYPE: string
}

interface TimestampX {}

interface LastActivityDate {}


interface IApiEvent {
    ID: string
    PARENT_ID: string
    DELETED: string
    CAL_TYPE: string
    SYNC_STATUS: any
    OWNER_ID: string
    EVENT_TYPE: any
    CREATED_BY: string
    NAME: string
    DATE_FROM: string
    DATE_TO: string
    TZ_FROM: string
    TZ_TO: string
    ORIGINAL_DATE_FROM: any
    TZ_OFFSET_FROM: string
    TZ_OFFSET_TO: string
    DATE_FROM_TS_UTC: string
    DATE_TO_TS_UTC: string
    TIMESTAMP_X: string
    DATE_CREATE: string
    DESCRIPTION: string
    DT_SKIP_TIME: string
    DT_LENGTH: string
    PRIVATE_EVENT: string
    ACCESSIBILITY: string
    IMPORTANCE: string
    IS_MEETING: boolean
    MEETING_HOST: string
    MEETING_STATUS: string
    MEETING: Meeting
    LOCATION: string
    REMIND: any[]
    COLOR: string
    RRULE: string
    EXDATE: string
    ATTENDEES_CODES: string
    DAV_XML_ID: string
    DAV_EXCH_LABEL: any
    G_EVENT_ID: any
    CAL_DAV_LABEL: any
    VERSION: string
    RECURRENCE_ID: any
    RELATIONS: any
    SECTION_ID: string
    SECT_ID: string
    REL: any
    UF_CRM_CAL_EVENT: boolean
    UF_WEBDAV_CAL_EVENT: boolean
    ATTENDEE_LIST: AttendeeList[]
    attendeesEntityList: AttendeesEntityList[]
    "~DESCRIPTION": string
    "~USER_OFFSET_FROM": number
    "~USER_OFFSET_TO": number
    uploads: any[]
    section: Section
}

interface AttendeesEntityList {
    entityId: string;
    id: string;
}

interface Meeting {
    HOST_NAME: string
    TEXT: any
    OPEN: boolean
    NOTIFY: boolean
    REINVITE: boolean
    MAIL_FROM: string
}

interface AttendeeList {
    id: number
    entryId: string
    status: string
}

interface Section {
    ID: string
    NAME: string
    COLOR: string
}
