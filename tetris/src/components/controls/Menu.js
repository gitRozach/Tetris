import { StyledMenu } from "./styles/StyledMenu";
import { motion } from "framer-motion";

const Menu = ({ items, background, padding, margin, keyPressedHandler }) => (
    <StyledMenu onKeyUp={keyPressedHandler} background={background} padding={padding} margin={margin}>
        {items}
    </StyledMenu>
);

const AnimatedMenu = ({ items, background, padding, margin, keyPressedHandler }) => (
    <StyledMenu onKeyUp={keyPressedHandler} background={background} padding={padding} margin={margin}>
        <motion.div className="motion-container" layout initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{delayChildren: 1}}>{items}</motion.div>
    </StyledMenu>
);

export { Menu, AnimatedMenu };