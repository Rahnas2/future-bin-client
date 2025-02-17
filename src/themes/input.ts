import { createTheme } from "@mui/material/styles"


const Input = createTheme({
  typography: {
    fontFamily: "'Nunito Sans', sans-serif",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": { 
            borderColor: "hsl(0, 0%, 30%)"
          },
          "&:hover .MuiOutlinedInput-notchedOutline": { 
            borderColor: "hsl(0, 0%, 30%)"
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { 
            borderColor: "#009E4F !important" 
          },
          background: "hsl(182, 56% , 11%)",
          color: "white",
          borderRadius: 10,
          // fontFamily: "Nunito Sans",
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "hsl(0, 0%, 50%)",
          "&.Mui-focused": { color: "#009E4F" },
        }
      }
    },
    // menu items 
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "Nunito Sans",
          "&:hover": {
            background: "hsl(182, 56% , 15%)"
          },
          "&.Mui-selected": {
            background: "hsl(182, 56% , 13%)",
          }
        }
      }
    }
  },
});

export default Input