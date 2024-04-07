// Tailwind theme configuration
export const theme = {
  typography: {
    valid: {
      variants: ["link"],
    },
    styles: {
      variants: {
        link: {
          fontSize: "text-lg",
          textTransform: "uppercase",
          fontWeight: "font-medium",
          hover: "hover:font-bold",
          transition: "transition-all",
        },
      },
    },
  },
  list: {
    styles: {
      base: {
        list: {
          minWidth: "min-w-36",
        },
      },
    },
  },
  button: {
    styles: {
      base: {
        initial: {
          duration: "duration-200",
        },
      },
      variants: {
        outlined: {
          gray: {
            cursor: "cursor-pointer",
          },
        },
        text: {
          gray: {
            hover:
              "hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-400",
          },
        },
      },
    },
  },
  menu: {
    styles: {
      base: {
        menu: {
          padding: "p-1.5",
          rounded: "rounded-lg",
        },
        item: {
          initial: {
            rounded: "rounded-lg",
            padding: "py-1.5 px-3",
            flex: "flex items-center justify-between gap-x-2 group",
          },
        },
      },
    },
  },
};
