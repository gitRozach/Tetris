import { StyledBlurryBackground } from "./styles/StyledBlurryBackground";

const BlurryBackground = ({ blurColor, blurRadius, zIndex }) => (
  <StyledBlurryBackground
    blurColor={blurColor}
    blurRadius={blurRadius}
    zIndex={zIndex}
  />
);

export default BlurryBackground;
