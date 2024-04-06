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
            hover: "hover:bg-gray-200",
          },
        },
      },
    },
  },
};
