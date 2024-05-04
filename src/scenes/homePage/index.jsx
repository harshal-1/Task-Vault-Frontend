import { Box, useMediaQuery } from "@mui/material";
import {useSelector} from "react-redux";
import Navbar from "scenes/navbar";
import AddBoardWidget from "scenes/widgets/AddBoardWidget";
import BoardsWidget from "scenes/widgets/BoardsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  
  return (
    <Box >
      <Navbar />
      
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        
        <Box
          flexBasis={isNonMobileScreens ? "55%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
        <AddBoardWidget />
          <BoardsWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;