import React from 'react';
import Styled from "styled-components";
import SemanticTable from "semantic-ui-react/dist/commonjs/collections/Table";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import { remCalc } from "../../../common/helpers";
import { THEME_COLOR, CUTTY_SARK } from '../../../common/style';

const TableCell = SemanticTable.Cell;
const TableHeaderCell = SemanticTable.HeaderCell;
const MenuItem = Menu.Item;

export const Table = Styled(SemanticTable)`
    width: 100% !important;
`;

export const Cell = Styled(TableCell)`
    border-left: none !important;
    marign-left: 0;
    
    color: ${({ color = CUTTY_SARK }) => color};
    
    .ui.inline.loader.active{
        margin: 0 0 0 ${remCalc(10)} !important;
    }
`;

export const HeaderCell = Styled(TableHeaderCell)`
    border-left: none !important;
    
    .item{
        font-size: ${({ fontSize = 14 }) => remCalc(fontSize)} !important;
    }
`;

export const Item = Styled(({active, margin, backgroundColor, ...rest}) =>
    <MenuItem {...rest} />
)`
    background-color: ${({ active = false }) => (active ? `${THEME_COLOR} !important` : `white !important`)}
    color: ${({ active = false }) => (active ? `white !important` : `${THEME_COLOR} !important`)}
    margin: ${({ margin = `0 ${remCalc(10)} 0 0` }) => margin}
    border-radius: ${remCalc(6)} ${remCalc(6)} 0 0 !important;
    font-size: ${({fontSize = remCalc(14)}) => fontSize};
`;