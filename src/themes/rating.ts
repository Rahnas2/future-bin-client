import { createTheme } from '@mui/material/styles';

const themeRating = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        root: {
          '& .MuiRating-iconEmpty': {
            color: "hsl(0, 0%, 50%)"
          },
        },
      },
    },

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
            borderRadius: 5,
            // fontFamily: "Nunito Sans",
  
           
          }
        }
      },


  },
});

export default themeRating