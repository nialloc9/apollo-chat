import Styled from "styled-components";
import SemanticTable from "semantic-ui-react/dist/commonjs/collections/Table";
import { remCalc } from "../../../common/helpers";
import { CUTTY_SARK } from '../../../common/style';

const TableCell = SemanticTable.Cell;
const TableHeaderCell = SemanticTable.HeaderCell;

export const Table = Styled(SemanticTable)`
    width: ${({width = "100%"}) => `${width} !important`};
`;

export const Cell = Styled(TableCell)`
    border-left: ${({borderLeft = "none"}) => `${borderLeft} !important`};
    margin: ${({margin = "auto auto"}) => `${margin}`};
    color: ${({ color = CUTTY_SARK }) => color};
`;

export const HeaderCell = Styled(TableHeaderCell)`
    border-left: ${({borderLeft = "none"}) => `${borderLeft} !important`};
    
    .item{
        font-size: ${({ fontSize = 14 }) => remCalc(fontSize)} !important;
    }
`;