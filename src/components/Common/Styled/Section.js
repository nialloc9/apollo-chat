import Styled from "styled-components";
import { remCalc } from "../../../common/helpers";

const Section = Styled("section")`
    margin: ${({margin = `${remCalc(70)} 0 0 0`}) => margin};
    height: ${({ height = "100%" }) => height};
`;

export default Section;