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
};
