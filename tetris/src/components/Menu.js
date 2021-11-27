import { StyledMenu } from "./styles/StyledMenu";
import { motion } from "framer-motion";

const Menu = ({ items }) => (
    <StyledMenu><motion.div layout initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{delayChildren: 1}}>{items}</motion.div></StyledMenu>
)

export default Menu;