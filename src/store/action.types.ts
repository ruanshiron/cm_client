export const ACTIONS = {
  DATA: {
    EVENT: {
      GET: {
        STARTED: "get_event_started",
        SUCCESS: "get_event_success",
        FAILURE: "get_event_failure",
      },
      SAVE: {
        STARTED: "save_event_started",
        SUCCESS: "save_event_success",
        FAILURE: "save_event_failure",
      },
      DESTROY: {
        STARTED: "destroy_event_started",
        SUCCESS: "destroy_event_success",
        FAILURE: "destroy_event_failure",
      },
    },

    PRODUCT: {
      GET: {
        STARTED: "get_product_started",
        SUCCESS: "get_product_success",
        FAILURE: "get_product_failure",
      },
      SAVE: {
        STARTED: "save_product_started",
        SUCCESS: "save_product_success",
        FAILURE: "save_product_failure",
      },
      DESTROY: {
        STARTED: "destroy_product_started",
        SUCCESS: "destroy_product_success",
        FAILURE: "destroy_product_failure",
      },
    },

    WORKSHOP: {
      GET: {
        STARTED: "get_workshop_started",
        SUCCESS: "get_workshop_success",
        FAILURE: "get_workshop_failure",
      },
      SAVE: {
        STARTED: "save_workshop_started",
        SUCCESS: "save_workshop_success",
        FAILURE: "save_workshop_failure",
      },
      DESTROY: {
        STARTED: "destroy_workshop_started",
        SUCCESS: "destroy_workshop_success",
        FAILURE: "destroy_workshop_failure",
      },
    },

    EMPLOYEE: {
      GET: {
        STARTED: "get_employee_started",
        SUCCESS: "get_employee_success",
        FAILURE: "get_employee_failure",
      },
      SAVE: {
        STARTED: "save_employee_started",
        SUCCESS: "save_employee_success",
        FAILURE: "save_employee_failure",
      },
      DESTROY: {
        STARTED: "destroy_employee_started",
        SUCCESS: "destroy_employee_success",
        FAILURE: "destroy_employee_failure",
      },
    },

    CUSTOMER: {
      GET: {
        STARTED: "get_customer_started",
        SUCCESS: "get_customer_success",
        FAILURE: "get_customer_failure",
      },
      SAVE: {
        STARTED: "save_customer_started",
        SUCCESS: "save_customer_success",
        FAILURE: "save_customer_failure",
      },
      DESTROY: {
        STARTED: "destroy_customer_started",
        SUCCESS: "destroy_customer_success",
        FAILURE: "destroy_customer_failure",
      },
    },

    ORDER: {
      GET: {
        STARTED: "get_order_started",
        SUCCESS: "get_order_success",
        FAILURE: "get_order_failure",
      },
      SAVE: {
        STARTED: "save_order_started",
        SUCCESS: "save_order_success",
        FAILURE: "save_order_failure",
      },
      DESTROY: {
        STARTED: "destroy_order_started",
        SUCCESS: "destroy_order_success",
        FAILURE: "destroy_order_failure",
      },
    },
  },

  FORM: {
    EVENT: {
      SET: "event_form_set",
      RESET: "event_form_reset",
    },

    PRODUCT: {
      SET: "product_form_set",
      RESET: "product_form_reset",
    },

    WORKSHOP: {
      SET: "workshop_form_set",
      RESET: "workshop_form_reset",
    },

    EMPLOYEE: {
      SET: "employee_form_set",
      RESET: "employee_form_reset",
    },

    CUSTOMER: {
      SET: "customer_form_set",
      RESET: "customer_form_reset",
    },

    ORDER: {
      SET: "order_form_set",
      RESET: "order_form_reset",
    },
  },

  USER: {
    SET: {
      LOADING: "user_set_loading",
      DATA: "user_set_data",
      IS_LOGGED_IN: "use_set_is_logged_in",
      USERNAME: "user_set_username"
    }
  }
};
