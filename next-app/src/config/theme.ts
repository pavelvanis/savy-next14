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
            hover: "hover:bg-gray-500/10",
            active: "active:bg-gray-500/30",
          },
        },
        text: {
          gray: {
            hover: "hover:bg-gradient-to-br from-gray-100 to-gray-400",
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
          },
        },
      },
    },
  },
};
