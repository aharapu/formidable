import { createTheme } from '@mui/material';
import { DARK_GREY } from './constants';

export const theme = createTheme({
    // breakpoints: {
    //   values: {
    //     xs: 0,
    //     sm: 600,
    //     md: 1000,
    //     lg: 1200,
    //     xl: 1920,
    //   },
    // },
    components: {
        // TODO -> this might be a way to "fix" the sad looking ripple on focus
        MuiTouchRipple: {
            styleOverrides: {
                root: {
                    color: 'orange',
                },
            },
        },
        MuiButton: {
            //     defaultProps: {
            //       disableElevation: true,
            //     },
            styleOverrides: {
                root: {
                    fontFamily: ['Roboto', 'Arial'].join(','),
                    fontWeight: 500,
                    fontStyle: 'medium',
                    fontSize: '15px',
                    lineHeight: '26px',
                    letterSpacing: '0.46px',
                    //         textTransform: "none",
                },
                //       sizeSmall: {
                //         padding: "6px 16px",
                //       },
                //       sizeMedium: {
                //         padding: "8px 20px",
                //       },
                //       sizeLarge: {
                //         padding: "11px 24px",
                //       },
                //       textSizeSmall: {
                //         padding: "7px 12px",
                //       },
                //       textSizeMedium: {
                //         padding: "9px 16px",
                //       },
                //       textSizeLarge: {
                //         padding: "12px 16px",
                //       },
            },
        },
        //   MuiButtonBase: {
        //     defaultProps: {
        //       disableRipple: true,
        //     },
        //   },
        //   MuiCardContent: {
        //     styleOverrides: {
        //       root: {
        //         padding: "32px 24px",
        //         "&:last-child": {
        //           paddingBottom: "32px",
        //         },
        //       },
        //     },
        //   },
        //   MuiCardHeader: {
        //     defaultProps: {
        //       titleTypographyProps: {
        //         variant: "h6",
        //       },
        //       subheaderTypographyProps: {
        //         variant: "body2",
        //       },
        //     },
        //     styleOverrides: {
        //       root: {
        //         padding: "32px 24px",
        //       },
        //     },
        //   },
        //   MuiCssBaseline: {
        //     styleOverrides: {
        //       "*": {
        //         boxSizing: "border-box",
        //         margin: 0,
        //         padding: 0,
        //       },
        //       html: {
        //         MozOsxFontSmoothing: "grayscale",
        //         WebkitFontSmoothing: "antialiased",
        //         display: "flex",
        //         flexDirection: "column",
        //         minHeight: "100%",
        //         width: "100%",
        //       },
        //       body: {
        //         display: "flex",
        //         flex: "1 1 auto",
        //         flexDirection: "column",
        //         minHeight: "100%",
        //         width: "100%",
        //       },
        //       "#__next": {
        //         display: "flex",
        //         flex: "1 1 auto",
        //         flexDirection: "column",
        //         height: "100%",
        //         width: "100%",
        //       },
        //     },
        //   },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    // fontSize: '14px', // this kinda works
                    // lineHeight: '16px',
                    fontWeight: 600,
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    // fontSize: '45px', // this kinda works
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    // ['&.Mui-focused']: { // i want when not focused, and also, wrong place
                    //     fontSize: 45,
                    // },
                },

                // TODO -> when input is not focused, the text should be bold and maybe larger font
                multiline: {
                    // ['& span']: { // this was not working
                    //     fontWeight: 600,
                    //     fontSize: '35px',
                    // },
                },
                //       notchedOutline: {
                //         borderColor: "#E6E8F0",
                //       },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltipPlacementTop: {
                    // overriden by .MuiTooltip-popper[data-popper-placement*="top"] .MuiTooltip-tooltip
                    // marginBottom: 8,
                    top: 12,
                },
                tooltipPlacementRight: {
                    right: 10,
                },
                tooltip: {
                    // overriden by .MuiTooltip-popper[data-popper-placement*="top"] .MuiTooltip-tooltip
                    //marginBottom: 8,
                },
                popper: {
                    // ['&[data-popper-placement*="top"]']: { // did nothing...
                    //     marginBottom: 8,
                    // },
                    // marginBottom: 8, // overriden by element style
                },
            },
        },
        //   MuiTableHead: {
        //     styleOverrides: {
        //       root: {
        //         backgroundColor: "#F3F4F6",
        //         ".MuiTableCell-root": {
        //           color: "#374151",
        //         },
        //         borderBottom: "none",
        //         "& .MuiTableCell-root": {
        //           borderBottom: "none",
        //           fontSize: "12px",
        //           fontWeight: 600,
        //           lineHeight: 1,
        //           letterSpacing: 0.5,
        //           textTransform: "uppercase",
        //         },
        //         "& .MuiTableCell-paddingCheckbox": {
        //           paddingTop: 4,
        //           paddingBottom: 4,
        //         },
        //       },
        //     },
        //   },
    },
    palette: {
        //   neutral: {
        //     100: "#F3F4F6",
        //     200: "#E5E7EB",
        //     300: "#D1D5DB",
        //     400: "#9CA3AF",
        //     500: "#6B7280",
        //     600: "#4B5563",
        //     700: "#374151",
        //     800: "#1F2937",
        //     900: "#111827",
        //   },
        //   action: {
        //     active: "#6B7280",
        //     focus: "rgba(55, 65, 81, 0.12)",
        //     hover: "rgba(55, 65, 81, 0.04)",
        //     selected: "rgba(55, 65, 81, 0.08)",
        //     disabledBackground: "rgba(55, 65, 81, 0.12)",
        //     disabled: "rgba(55, 65, 81, 0.26)",
        //   },
        //   background: {
        //     default: "#F9FAFC",
        //     paper: "#FFFFFF",
        //   },
        //   divider: "#E6E8F0",
        //   primary: {
        //     main: "#5048E5",
        //     light: "#828DF8",
        //     dark: "#3832A0",
        //     contrastText: "#FFFFFF",
        //   },
        //   secondary: {
        //     main: "#10B981",
        //     light: "#3FC79A",
        //     dark: "#0B815A",
        //     contrastText: "#FFFFFF",
        //   },
        //   success: {
        //     main: "#14B8A6",
        //     light: "#43C6B7",
        //     dark: "#0E8074",
        //     contrastText: "#FFFFFF",
        //   },
        //   info: {
        //     main: "#2196F3",
        //     light: "#64B6F7",
        //     dark: "#0B79D0",
        //     contrastText: "#FFFFFF",
        //   },
        //   warning: {
        //     main: "#FFB020",
        //     light: "#FFBF4C",
        //     dark: "#B27B16",
        //     contrastText: "#FFFFFF",
        //   },
        //   error: {
        //     main: "#D14343",
        //     light: "#DA6868",
        //     dark: "#922E2E",
        //     contrastText: "#FFFFFF",
        //   },
        text: {
            primary: DARK_GREY,
            //     secondary: "#65748B",
            //     disabled: "rgba(55, 65, 81, 0.48)",
        },
    },
    // shape: {
    //   borderRadius: 8,
    // },
    // shadows: [
    //   "none",
    //   "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
    //   "0px 1px 2px rgba(100, 116, 139, 0.12)",
    //   "0px 1px 4px rgba(100, 116, 139, 0.12)",
    //   "0px 1px 5px rgba(100, 116, 139, 0.12)",
    //   "0px 1px 6px rgba(100, 116, 139, 0.12)",
    //   "0px 2px 6px rgba(100, 116, 139, 0.12)",
    //   "0px 3px 6px rgba(100, 116, 139, 0.12)",
    //   "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    //   "0px 5px 12px rgba(100, 116, 139, 0.12)",
    //   "0px 5px 14px rgba(100, 116, 139, 0.12)",
    //   "0px 5px 15px rgba(100, 116, 139, 0.12)",
    //   "0px 6px 15px rgba(100, 116, 139, 0.12)",
    //   "0px 7px 15px rgba(100, 116, 139, 0.12)",
    //   "0px 8px 15px rgba(100, 116, 139, 0.12)",
    //   "0px 9px 15px rgba(100, 116, 139, 0.12)",
    //   "0px 10px 15px rgba(100, 116, 139, 0.12)",
    //   "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    //   "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    //   "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    //   "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    //   "0px 25px 50px rgba(100, 116, 139, 0.25)",
    //   "0px 25px 50px rgba(100, 116, 139, 0.25)",
    //   "0px 25px 50px rgba(100, 116, 139, 0.25)",
    //   "0px 25px 50px rgba(100, 116, 139, 0.25)",
    // ],
    typography: {
        // allVariants: {

        // },
        //   button: {
        //     fontWeight: 600,
        //   },
        fontFamily: ['"Source Sans Pro"', 'Helvetica', 'Arial'].join(','),
        body1: {
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '18px',
        },
        //   body2: {
        //     fontSize: "0.875rem",
        //     fontWeight: 400,
        //     lineHeight: 1.57,
        //   },
        subtitle1: {
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '24px',
        },
        subtitle2: {
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: '18px',
        },
        //   overline: {
        //     fontSize: "0.75rem",
        //     fontWeight: 600,
        //     letterSpacing: "0.5px",
        //     lineHeight: 2.5,
        //     textTransform: "uppercase",
        //   },
        //   caption: {
        //     fontSize: "0.75rem",
        //     fontWeight: 400,
        //     lineHeight: 1.66,
        //   },
        //   h1: {
        //     fontWeight: 700,
        //     fontSize: "3.5rem",
        //     lineHeight: 1.375,
        //   },
        h2: {
            fontWeight: 'bold',
            fontSize: '32px',
            lineHeight: '34px',
        },
        //   h3: {
        //     fontWeight: 700,
        //     fontSize: "2.25rem",
        //     lineHeight: 1.375,
        //   },
        h4: {
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '18px',
        },
        h5: {
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '18px',
        },
        //   h6: {
        //     fontWeight: 600,
        //     fontSize: "1.125rem",
        //     lineHeight: 1.375,
        //   },
    },
});
