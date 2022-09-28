export const MENU_ITEMS = [
  { label: "Tasks", key: "tasks" }, // remember to pass the key prop
];


export const TITLE_VALIDATIONS = [
  {
    required: true,
    message: "Please enter user name",
  },
  {
    min: 2,
    message: "Title value should contains atleast 2 characters",
  },
  {
    max: 24,
    message: "Title value should be less then 25 characters",
  },
  {
    pattern: new RegExp(/^[a-zA-Z0-9 ]*$/),
    message: "No Special Characters Allowed",
  },
];
