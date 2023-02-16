// import {useRef,useEffect,useState} from 'react'
import { FaRupeeSign,FaDownload } from 'react-icons/fa';
import { FaPercentage } from 'react-icons/fa';
import { AiOutlineLink } from 'react-icons/ai';
import { IoArrowUpSharp } from 'react-icons/io5';
import { Rtables } from '../../components';
import {SideNavigation} from "../../components"
import Graph from "../../assets/graph.png"

const peerComparisonData:any = [
    {"S_no":1,
    "Name":"Godrej Agrovet",
    "CMP_Rs": 54.85,
    "P_E": 54.85,
    "Mar_Cap": 54.85,
    "Div_yld": 54.85,
    "NP_Qtr": 54.85,
    "Qtr Profit Var %": 54.85,
    "Sales_Qtr": 54.85,
    "Qtr_sales_var": 54.85,
    "ROCE": 54.85,
},
    {"S_no":2,
    "Name":"RCL Retail",
    "CMP_Rs": 54.85,
    "P_E": 54.85,
    "Mar_Cap": 54.85,
    "Div_yld": 54.85,
    "NP_Qtr": 54.85,
    "Qtr Profit Var %": 54.85,
    "Sales_Qtr": 54.85,
    "Qtr_sales_var": 54.85,
    "ROCE": 54.85,
},
    {"S_no":3,
    "Name":"Tanvi Foods",
    "CMP_Rs": 54.85,
    "P_E": 54.85,
    "Mar_Cap": 54.85,
    "Div_yld": 54.85,
    "NP_Qtr": 54.85,
    "Qtr Profit Var %": 54.85,
    "Sales_Qtr": 54.85,
    "Qtr_sales_var": 54.85,
    "ROCE": 54.85,
},
    {"S_no":4,
    "Name":"KSE",
    "CMP_Rs": 54.85,
    "P_E": 54.85,
    "Mar_Cap": 54.85,
    "Div_yld": 54.85,
    "NP_Qtr": 54.85,
    "Qtr Profit Var %": 54.85,
    "Sales_Qtr": 54.85,
    "Qtr_sales_var": 54.85,
    "ROCE": 54.85,
},
    {"S_no":5,
    "Name":"Avanti Feeds",
    "CMP_Rs": 54.85,
    "P_E": 54.85,
    "Mar_Cap": 54.85,
    "Div_yld": 54.85,
    "NP_Qtr": 54.85,
    "Qtr Profit Var %": 54.85,
    "Sales_Qtr": 54.85,
    "Qtr_sales_var": 54.85,
    "ROCE": 54.85,
},
    {"S_no":6,
    "Name":"Unique Organics",
    "CMP_Rs": 54.85,
    "P_E": 54.85,
    "Mar_Cap": 54.85,
    "Div_yld": 54.85,
    "NP_Qtr": 54.85,
    "Qtr Profit Var %": 54.85,
    "Sales_Qtr": 54.85,
    "Qtr_sales_var": 54.85,
    "ROCE": 54.85,
},

]

const datewiseData:any = [
      {"dates":"Debtor Days",
    "Mar_2011":"7",
    "Mar_2012": 54.85,
    "Mar_2013": 54.85,
    "Mar_2014": 54.85,
    "Mar_2015": 54.85,
    "Mar_2016": 54.85,
    "Mar_2017": 54.85,
    "Mar_2018": 54.85,
    "Mar_2019": 54.85,
    "Mar_2020": 54.85,
},
      {"dates":"Inventory Days",
    "Mar_2011":"-12",
    "Mar_2012": 54.85,
    "Mar_2013": 54.85,
    "Mar_2014": 54.85,
    "Mar_2015": 54.85,
    "Mar_2016": 54.85,
    "Mar_2017": 54.85,
    "Mar_2018": 54.85,
    "Mar_2019": 54.85,
    "Mar_2020": 54.85,
},
      {"dates":"Days Payable",
    "Mar_2011":"2",
    "Mar_2012": 54.85,
    "Mar_2013": 54.85,
    "Mar_2014": 54.85,
    "Mar_2015": 54.85,
    "Mar_2016": 54.85,
    "Mar_2017": 54.85,
    "Mar_2018": 54.85,
    "Mar_2019": 54.85,
    "Mar_2020": 54.85,
},
      {"dates":"Cash Conversion Cycle",
    "Mar_2011":"15",
    "Mar_2012": 54.85,
    "Mar_2013": 54.85,
    "Mar_2014": 54.85,
    "Mar_2015": 54.85,
    "Mar_2016": 54.85,
    "Mar_2017": 54.85,
    "Mar_2018": 54.85,
    "Mar_2019": 54.85,
    "Mar_2020": 54.85,
},
      {"dates":"Working Capital Days",
    "Mar_2011":"92",
    "Mar_2012": 54.85,
    "Mar_2013": 54.85,
    "Mar_2014": 54.85,
    "Mar_2015": 54.85,
    "Mar_2016": 54.85,
    "Mar_2017": 54.85,
    "Mar_2018": 54.85,
    "Mar_2019": 54.85,
    "Mar_2020": 54.85,
},
      {"dates":"ROCE %",
    "Mar_2011":"6",
    "Mar_2012": 54.85,
    "Mar_2013": 54.85,
    "Mar_2014": 54.85,
    "Mar_2015": 54.85,
    "Mar_2016": 54.85,
    "Mar_2017": 54.85,
    "Mar_2018": 54.85,
    "Mar_2019": 54.85,
    "Mar_2020": 54.85,
},
      {"dates":"RCL Retail",
    "Mar_2011":"8.6",
    "Mar_2012": 54.85,
    "Mar_2013": 54.85,
    "Mar_2014": 54.85,
    "Mar_2015": 54.85,
    "Mar_2016": 54.85,
    "Mar_2017": 54.85,
    "Mar_2018": 54.85,
    "Mar_2019": 54.85,
    "Mar_2020": 54.85,
},

]

const columnFormat1 = [
      {
        Header: 'S.No',
        accessor: 'S_no',
        Cell: ({ value }: any) => {
            return (
              value
              );
        },
      },
      {
        Header: 'Name',
        accessor: 'Name',
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },
    {
        Header: 'CMP Rs.',
        accessor: 'CMP_Rs',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },
      {
        Header: 'P/E',
        accessor: 'P_E',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },

      {
        Header: 'Mar Cap Rs.Cr.',
        accessor: 'Mar_Cap',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },

      {
        Header: 'Div Yld %',
        accessor: 'Div_yld',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },

      {
        Header: 'Np Qtr Rs.Cr.',
        accessor: 'NP_Qtr',
        
        Cell: ({ value }: any) => {
            return 1;
        },
      },

      {
        Header: 'Sales Qtr Rs.Cr.',
        accessor: 'Sales_Qtr',
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },

      {
        Header: 'Qtr Sales Var %',
        accessor: 'Qtr_sales_var',
        
        Cell: ({ value }: any) => {
            return 1;
        },
      },

      {
        Header: 'ROCE %',
        accessor: 'ROCE',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },
]
const columnFormat2 = [
      {
        Header: '_____________',
        accessor: 'dates',
        Cell: ({ value }: any) => {
            return (
              value
              );
        },
      },
      {
        Header: 'Mar 2011',
        accessor: 'Mar_2011',
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },
    {
        Header: 'Mar 2012',
        accessor: 'Mar_2012',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },
      {
        Header: 'Mar 2013',
        accessor: 'Mar_2013',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },

      {
        Header: 'Mar 2014',
        accessor: 'Mar_2014',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },

      {
        Header: 'Mar 2015',
        accessor: 'Mar_2015',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },

      {
        Header: 'Mar 2016',
        accessor: 'Mar_2016',
        
        Cell: ({ value }: any) => {
            return 1;
        },
      },

      {
        Header: 'Mar 2017',
        accessor: 'Mar_2017',
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },

      {
        Header: 'Mar 2018',
        accessor: 'Mar_2018',
        
        Cell: ({ value }: any) => {
            return 1;
        },
      },

      {
        Header: 'Mar 2019',
        accessor: 'Mar_2019',
        
        Cell: ({ value }: any) => {
            return (
              <p className="text-center">
                {value}
              </p>
            );
        },
      },
]


const entries = [
  "Peer comparison",
        "Quarterly Results",
        "Profit & Loss",
        "Balance Sheet",
        "Cash Flows",
        "Ratios",
        "Shareholding Pattern",
]

const Meta = () => {
    // const refCard = useRef<HTMLDivElement>(null);
    // const [scrollHeight,setScrollHeight] = useState<number>()
    // useEffect(()=>{
    //     console.log(refCard.current !== null ? refCard?.current.offsetTop : "")
    //     function handleResize(){
    //         if(refCard.current !== null){
    //             setScrollHeight(refCard.current.offsetTop)
    //         }
    //     }
    //          if(refCard.current !== null){
    //     document.documentElement.addEventListener("scroll", handleResize)
    //          }
    //     return ()=>{
    //              if(refCard.current !== null){
    //         document.documentElement.removeEventListener("scroll",handleResize)
    //     }}
    // },[])


  return (
    <div className="bg-gray-300 p-8 overflow-hidden">

        {/* dashboard */}
        <div className="card1 bg-white rounded-md p-6 px-4 flex flex-col justify-between">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
            <h1 className="text-5xl">Meta</h1>
                <div className="flex gap-2 items-center">
                        <FaRupeeSign />
                        <div className="flex items-center gap-2 text-green-400">
                        <div className="bg-green-400 text-white rounded-full p-2 text-xs">
                        <IoArrowUpSharp />
                        </div>
                            <span>None</span>
                        <FaPercentage />
                        </div>
                </div>

                </div>
                <div className="flex gap-4">
                    <h1 className="px-4 py-2 border-gray-400 border-2 rounded-md uppercase flex gap-2 items-center">
                        <FaDownload/>
                         Export to Excel </h1>
                    <h1 className="px-4 py-2 bg-violet-600 text-white rounded-md"> + Follow </h1>
                </div>
            </div>
            <div className="text-left py-6">
                <h1 className=" text-violet-600 text-left font-semibold text-3xl flex gap-2 items-center">
                    <AiOutlineLink/>
                    Company website</h1>
            </div>

{/* top table */}
            <div className="flex w-full gap-8">
                <div className="flex-2 grid grid-cols-3 gap-14 w-5/6 border-2 border-gray-200 px-4 py-6">
                            <div className="col flex flex-col gap-8">
                                <div className="flex justify-between">
                                    <p>Market Cap</p>
                                    <p>$ 5,780 Cr.</p>
                                </div>
                                <div className="flex justify-between bg-gray-200 p-2">
                                    <p>Stock P/E</p>
                                    <p>24.0</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>ROCE</p>
                                    <p>19.3 %</p>
                                </div>
                            </div>
                            <div className="col flex flex-col gap-8">
                                <div className="flex justify-between">
                                    <p>Current Price</p>
                                    <p>$424</p>
                                </div>
                             <div className="flex justify-between bg-gray-200 p-2">
                                    <p>Book Price</p>
                                    <p>$ 139</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>ROE</p>
                                    <p>$</p>
                                </div>
                            </div>
                            <div className="col flex flex-col gap-8">
                                <div className="flex justify-between">
                                    <p>High / Low</p>
                                    <p>$ 675 / 384</p>
                                </div>
                                <div className="flex justify-between bg-gray-200 p-2">
                                    <p>Dividend Yield</p>
                                    <p>1.47 %</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Face value</p>
                                    <p>$ 1.00</p>
                                </div>
                            </div>
                </div>
                <div className="about flex flex-col gap-4 w-1/2">
                    <h1 className="font-semibold ">ABOUT</h1>
                    <p className="w-5/6">Avanti Feeds is a leading provider of high quality shrimp feed, best technical support to the farmer and caters to the quality standards of global shrimp</p>
                    <h1 className="font-semibold">KEY POINTS</h1>
                    <p className="w-5/6">Shrimp Feed Business (78% of revenues)[1]
The company is the largest producer of shrimp feed</p>
                <h1 className="text-blue-500 font-semibold">READ MORE</h1>
                </div>
            </div>


        </div>

        <div className="flex mt-8 relative overflow-visible h-screen">
        <div className="sidenav flex flex-1 sticky t-0 h-fit rounded-md">
            {/* <SideNavigation/> */}
              <div className="flex flex-col m-6 mx-16 ml-0 p-6 gap-4 bg-white rounded-md min-w-full">
        <h1 className="font-semibold text-gray-600">Company Overview</h1>
       {entries.map((entry,i)=>(
         <a href={"#"+entry} className=" hover:underline" key={entry+i}>{i+1}.{entry}</a>
       ))
}
    </div>
        </div>

        {/* cards section  */}
        <div 
        // ref={refCard}
         className="card2 flex flex-col overflow-scroll no-scrollbar"
         >

             {/* card 0 */}
        <div id="Peer comparison" className="bg-white card2 rounded-md p-8 flex px-6 flex-col justify-between m-6 ml-6">
                      <h1 className="text-2xl font-semibold pb-2 text-gray-700">Peer Comparison</h1>
                      <div className="flex justify-between pb-8">
                          <div className="card_left flex gap-4 items-center">
                              <h1>Sector : <span className="text-blue-500">Miscellaneous</span></h1>
                              <h1>Industry : <span className="text-blue-500">Food-Processing-Indian</span></h1>
                          </div>
                          <div className="card_right ">
                              <h1 className="text-blue-500 border-2 border-blue-500 rounded-md p-2 text-md uppercase font-semibold">Edit Columns</h1>
                          </div>
                          </div>  
                    <Rtables columnFormat={columnFormat1} tableData={peerComparisonData}/>
        </div>

        {/* card 1 */}
        <div className="bg-white card2 rounded-md p-8 px-6 m-6 ml-6">
            <img src={Graph} alt="lla" className="w-full h-full object-cover"/>
        </div>

             {/* card 2 */}

        <div id="Quarterly Results" className="bg-white card2 rounded-md p-8 flex px-6 flex-col justify-between m-6 ml-6">
                    <h1 className="text-2xl font-semibold pb-2 text-gray-700">Quarterly Results</h1>
                      <div className="flex justify-between pb-8">
                          <div className="card_left flex gap-4 items-center">
                              <h1>Consolidated Figures in Rs. Crores /  <span className="text-blue-500">View Standalone :</span></h1>
                          </div>
                          <div className="card_right ">
                              <h1 className="text-blue-500 border-2 border-blue-500 rounded-md p-2 text-md uppercase font-semibold">Product segments</h1>
                          </div>
                          </div>  

                    <Rtables columnFormat={columnFormat2} tableData={datewiseData}/>
        </div>

             {/* card 3 */}

        <div  id="Profit & Loss" className="bg-white card2 rounded-md p-8 flex px-6 flex-col justify-between m-6 ml-6">
                    <h1 className="text-2xl font-semibold pb-2 text-gray-700">Profits & Loss</h1>
                      <div className="flex justify-between pb-8">
                          <div className="card_left flex gap-4 items-center">
                                <h1>Consolidated Figures in Rs. Crores /  <span className="text-blue-500">View Standalone :</span></h1>
                            </div>
                          <div className="card_right ">
                              <h1 className="text-blue-500 border-2 border-blue-500 rounded-md p-2 text-md uppercase font-semibold">Product segments</h1>
                          </div>
                          </div>  
                    <Rtables columnFormat={columnFormat2} tableData={datewiseData}/>
        </div>

             {/* card 4 */}

        <div  id="Balance Sheet" className="bg-white card2 rounded-md p-8 flex px-6 flex-col justify-between m-6 ml-6">
                    <h1 className="text-2xl font-semibold pb-2 text-gray-700">Balance Sheet</h1>
                      <div className="flex justify-between pb-8">
                           <div className="card_left flex gap-4 items-center">
                                <h1>Consolidated Figures in Rs. Crores /  <span className="text-blue-500">View Standalone :</span></h1>
                            </div>
                          <div className="card_right ">
                              <h1 className="text-blue-500 border-2 border-blue-500 rounded-md p-2 text-md uppercase font-semibold">corporate actions</h1>
                          </div>
                          </div>  
                    <Rtables columnFormat={columnFormat2} tableData={datewiseData}/>
        </div>

             {/* card 5 */}

        <div  id="Cash Flows" className="bg-white card2 rounded-md p-8 flex px-6 flex-col justify-between m-6 ml-6">
                    <h1 className="text-2xl font-semibold pb-2 text-gray-700">Cash Flow</h1>
                      <div className="flex justify-between pb-8">
                          <div className="card_left flex gap-4 items-center">
                                <h1>Consolidated Figures in Rs. Crores /  <span className="text-blue-500">View Standalone :</span></h1>
                            </div>
                          <div className="card_right ">
                              <h1 className="text-blue-500 border-2 border-blue-500 rounded-md p-2 text-md uppercase font-semibold">Edit Columns</h1>
                          </div>
                          </div>  
                    <Rtables columnFormat={columnFormat2} tableData={datewiseData}/>
        </div>

             {/* card 6 */}

        <div id="Ratios" className="bg-white card2 rounded-md p-8 flex px-6 flex-col justify-between m-6 ml-6">
                    <h1 className="text-2xl font-semibold pb-2 text-gray-700">Ratios</h1>
                      <div className="flex justify-between pb-8">
                           <div className="card_left flex gap-4 items-center">
                                <h1>Consolidated Figures in Rs. Crores /  <span className="text-blue-500">View Standalone :</span></h1>
                            </div>
                          <div className="card_right ">
                          </div>
                          </div>  
                    <Rtables columnFormat={columnFormat2} tableData={datewiseData}/>
        </div>


             {/* card 7 */}

        <div id="Shareholding Pattern" className="bg-white card2 rounded-md p-8 flex px-6 flex-col justify-between m-6 ml-6">
                    <h1 className="text-2xl font-semibold pb-2 text-gray-700">Shareholding </h1>
                      <div className="flex justify-between pb-8">
                        <div className="card_left flex gap-4 items-center">
                                <h1>Consolidated Figures in Rs. Crores /  <span className="text-blue-500">View Standalone :</span></h1>
                            </div>
                          <div className="card_right ">
                              <h1 className="text-blue-500 border-2 border-blue-500 rounded-md p-2 text-md uppercase font-semibold">Insider Trades</h1>
                          </div>
                          </div>  
                    <Rtables columnFormat={columnFormat2} tableData={datewiseData}/>
        </div>
        </div>
        </div>


    </div>
  )
}

export default Meta