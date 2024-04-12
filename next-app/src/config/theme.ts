
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
  select: {
    valid: {
      variants: ["standard", "outlined", "static"],
    },
    styles: {
      base: {
        container: {
          minWidth: "min-w-14",
          width: "w-14",
          // height: "h-6",
        },
        select: {
          // position: "absolute",
          // top: "top-1/2",
          // p: "py-0 px-1",
          // transform: "rotate-0 -translate-y-1/2",
          // height: "h-6",
          // right: "right-0",
        },
        arrow: {
          initial: {
            top: "top-1/2",
            right: "right-1",
            transform: "rotate-0 -translate-y-1/2 ",
          },
        },
        menu: {
          // p: "p-1",
          // spaceY: "space-y-1",
        },
        option: {
          initial: {
            p: "p-1",
            textCenter: "text-center",
          },
        },
      },
    },
  },
};
