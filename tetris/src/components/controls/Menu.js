import { StyledMenu } from "./styles/StyledMenu";
import { motion } from "framer-motion";

export const Menu = ({
  items,
  background,
  padding,
  margin,
  keyPressedHandler,
  zIndex,
  animated,
}) => (
  <StyledMenu
    onKeyUp={keyPressedHandler}
    background={background}
    padding={padding}
    margin={margin}
    zIndex={zIndex}
  >
    {animated && (
      <motion.div
        className="menu-container"
        layout
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ delayChildren: 1 }}
      >
        {items}
      </motion.div>
    )}
    {!animated && <div className="menu-container">{items}</div>}
  </StyledMenu>
);
