export interface tableDataProps{
    tableData : tableDatatype;
    columnFormat : any;
}

export interface tableDatatype {
    "S.No":number,
    "Name":string,
    "CMP Rs.": number,
    "P/E": number,
    "Mar Cap Rs.Cr.": number,
    "Div yld %": number,
    "NP Qtr Rs.Cr.": number,
    "Qtr Profit Var %": number,
    "Sales Qtr Rs.Cr.": number,
    "Qtr Sales Var %": number,
    "ROCE %": number,
}