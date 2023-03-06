const CONSTANTS = {
  GENDER: [
    {value: 'M', label: 'Male'},
    {value: 'F', label: 'Female'},
    {value: 'O', label: 'Other'},
    {value: 'N', label: 'N.A'},
  ],
  SALUTATION: [
    {value: 'Mr', label: 'Mr'},
    {value: 'Ms', label: 'Ms'},
    {value: 'Mrs', label: 'Mrs'},
  ],
  PAYMENT_METHODS_INPUTS: [
    {value: '1', label: 'Cash'},
    {value: '2', label: 'Cheque'},
    {value: '3', label: 'Bank Transfer (IMPS/NEFT/SWIFT)'},
    {value: '4', label: 'Online Payment'},
    {value: '5', label: 'Card / POS'},
  ],
  FILE_RECORD_TYPE: [
    {value: 1, label: 'Identification Card'},
    {value: 2, label: 'Passport'},
    {value: 3, label: 'Document'},
    {value: 4, label: 'Other'},
  ],
  ORDER_QUANTITY_TYPE: [
    {value: 1, label: 'Nos'},
    {value: 2, label: 'Night(s)'},
    {value: 3, label: 'Guest(s)'},
  ],
  NOTIFICATION_TYPE_INPUTS: [
    {value: 1, label: 'E-Mail'},
    {value: 2, label: 'Text Msg (SMS)'},
  ],
  DISCOUNT_TYPE_INPUTS: [
    {value: 1, label: '% Value'},
    {value: 2, label: 'Fixed Price'},
  ],
  NOTES_TYPE_INPUTS: [
    {value: 1, label: 'Note'},
    {value: 2, label: 'Action'},
    {value: 3, label: 'Other'},
  ],
  NOTES_TYPE: {
    NOTE: 1,
    ACTION: 2,
    OTHER: 3,
  },
  NOTIFICATION_TYPE: {
    EMAIL: 1,
    TEXT: 2,
  },
  BOOKING_SOURCE: {
    AGENT: 1,
    EMAIL: 2,
    WALKIN: 3,
    PHONE: 4,
    CHANNEL_MANAGER: 5,
    BOOKING_ENGINE: 8,
    CORPORATE: 7,
    OTA: 8,
  },
  PROFILE_TYPE: {
    GUEST: 1,
    CORPORATE: 2,
    AGENT: 3,
  },
  BOOKING_MODIFICATION_TYPES: {
    EDIT_DATE: 1,
    EXTEND_DATE: 2,
    ADD_ROOMS: 3,
  },
  BOOKING_ROOM_MODIFICATION_TYPES: {
    UPDATE_ROOM_TYPE_OR_PACKAGE: 11,
  },
  BOOKING: {
    CANCELED: 0,
    UPCOMING: 1,
    ACTIVE: 2,
    COMPLETED: 3,
    NOSHOW: 4,
  },
  ROOM: {
    AVAILABLE: 1,
    OCCUPIED: 0,

    IN_MAINTENANCE: 0,
    NORMAL: 1,
    MAINTENANCE_REQUESTED: 2,

    DIRTY: 0,
    CLEAN: 1,
    CLEANING_REQUESTED: 2,
    ATTENTION: 3,
  },
  PAYMENT_GATEWAY_TYPE: {
    ROUTE: 0,
    DIRECT: 1,
  },
  ORDER_STATUS: {
    NOTPAID: 0,
    PAID: 1,
    PARTPAID: 2,
    PART_REFUNDED: 3,
    REFUNDED: 4,
    PENDING: 5,
    CANCELLED: 6,
  },
  PAYMENT_STATUS: {
    FAILED: -1,
    NOTPAID: 0,
    PAID: 1,
    PARTPAID: 2,
    PART_REFUNDED: 3,
    REFUNDED: 4,
    PENDING: 5,
  },
  PAYMENT_METHODS: {
    CASH: 1,
    CHECK: 2,
    BANK_TRANSFER: 3,
    ONLINE_PAYMENT: 4,
    CARD: 5,
    OTHER: 6,
  },
  ORDER_SOURCE: {
    SYSTEM: 0,
    BOOKING: 1,
    POINT_OF_SALES: 2,
    AMENDMENT: 3,
    EXTERNAL: 4,
    USER: 5,
    EVENT: 6,
  },
  QUANTITY_TYPE: {
    NOS: 1,
    NIGHT: 2,
    GUEST: 3,
  },
  EVENT_STATUS: {
    UPCOMING: 1,
    ACTIVE: 2,
    COMPLETED: 3,
  },
  EVENT_TYPE: {
    SINGLE: 1,
    RECURRING: 2,
  },
  EVENT_TYPE_INPUT: [
    {value: 1, label: 'Single'},
    {value: 2, label: 'Recurring'},
  ],
  EVENT_RECURRING_TYPE: {
    LIMITED: 1,
    DAILY: 2,
  },
  EVENT_RECURRING_TYPE_INPUT: [
    {value: 1, label: 'Limited'},
    {value: 2, label: 'Daily'},
  ],
  EVENT_TICKET_TYPE: {
    LIMITED: 1,
    UNLIMITED: 2,
  },
  TICKET_BOOKING_STATUS: {
    CANCELLED: 0,
    BOOKED: 1,
    PROVISIONAL: 2,
  },
  TICKET_BOOKING_CLAIM_STATUS: {
    CLAIMED: 4,
    NOT_CLAIMED: 5,
  },
  USER_ACCOUNT_TYPE: {
    USER: 0,
    EMPLOYEE: 1,
  },
  MEMBERSHIP_TYPE_INPUT: [
    {value: 0, label: 'Standard User'},
    {value: 1, label: 'Administrator'},
  ],
  DAY_OF_WEEK_INPUT: [
    {value: 'Sun', label: 'Sunday'},
    {value: 'Mon', label: 'Monday'},
    {value: 'Tue', label: 'Tuesday'},
    {value: 'Wed', label: 'Wednesday'},
    {value: 'Thu', label: 'Thursday'},
    {value: 'Fri', label: 'Friday'},
    {value: 'Sat', label: 'Saturday'},
  ],
  TAX_TYPE: {
    PERCENTAGE: 1,
    FIXED: 2,
  },
  TAX_NUMBER_TYPE: [
    {value: 'GST', label: 'Goods & Services Tax'},
    {value: 'VAT', label: 'Value added Tax'},
    {value: 'TAX', label: 'Tax'},
  ],
  MEMBERSHIP_PERMISSIONS: [
    {
      id: 7,
      name: 'Event Management',
      description: 'Provides access to event management.',
    },
    {
      id: 6,
      name: 'Section Manager',
      description: 'Provides manager access to section they are allotted.',
    },
    {
      id: 5,
      name: 'Accounts and Billing',
      description: 'Access to Payments and order data.',
    },
    {
      id: 4,
      name: 'Point of Sales',
      description:
        'Point of Sales access, sub level access is available in Point of Sale settings.',
    },
    {
      id: 3,
      name: 'House Keeping',
      description: 'House keeping tasks.',
    },
    {
      id: 2,
      name: 'Front Desk / Booking',
      description:
        'Provides access to front desk and booking management functions.',
    },
    {
      id: 1,
      name: 'Manager',
      description: 'Manager level permission user.',
    },
  ],
  SOCIAL_LINK_TYPE_INPUT: [
    {value: 'FB', label: 'Facebook'},
    {value: 'TW', label: 'Twitter'},
    {value: 'YT', label: 'Youtube'},
    {value: 'IG', label: 'Instagram'},
    {value: 'OT', label: 'Other'},
  ],
  PAGE_LAYOUT_INPUT: [
    {value: 1, label: 'Sidebar'},
    {value: 2, label: 'Sidebar - Cover Image'},
    {value: 3, label: 'No Sidebar - Center Aligned'},
    {value: 4, label: 'No Sidebar - Cover Image - Center Aligned'},
    {value: 5, label: 'Full Width'},
    {value: 6, label: 'Full Width - Cover Image'},
  ],
  PAGE_LAYOUT: {
    SIDEBAR: 1,
    SIDEBAR_COVER_IMAGE: 2,
    NO_SIDEBAR_CENTER_ALIGNED: 3,
    NO_SIDEBAR_COVER_IMAGE_CENTER_ALIGNED: 4,
    FULL_WIDTH: 5,
    FULL_WIDTH_COVER_IMAGE: 6,
  },
  FETCH_STATUS: {
    FAILED : 99,
    INITIATED: 0,
    SUCCEEDED: 1,
    PROCESSING: 2,
    RETRY: 3,
    NOT_REQUIRED: 4,
  },
};

export default CONSTANTS;