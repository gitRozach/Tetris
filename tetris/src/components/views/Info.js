import TextOutput from "../controls/TextOutput";
import { COLOR_WHITE } from "../../constants/settingsConstants";

const Info = () => (
  <div key="info-component-container">
    <TextOutput animationColor={COLOR_WHITE} text="Made by Rozach with <3" color="white" />
  </div>
);

export default Info;
