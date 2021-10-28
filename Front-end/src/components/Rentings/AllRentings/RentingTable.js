import React, { useState, useEffect } from "react";
import { useTable, usePagination } from 'react-table';
import './Rentings.css';
import Pagination from "./Pagination";

function RentingTable (props) {

  const[newdata, setDataUsed] = useState(null);
  const[filtereddata, setDataFiltered] = useState({});
  // const[data, setDataSorted] = useState({});

  useEffect(() => {}, [props])
   
    const columns = React.useMemo( 
        () => [
        {
            Header: 'Bike',
            columns: [
                {
                    Header: 'Bicycle Number',
                    accessor: 'bike_number',
                },
                {
                    Header: 'Model name',
                    accessor: 'model_name',
                },
            ],
        },
        {
            Header: 'User',
            columns: [
                {
                    Header: 'User name',
                    accessor: d => `${d.name} ${d.last_name}`, 
                },
                {
                    Header: 'Renting date',
                    accessor: r => `${r.renting_date.slice(11,19)}  ${r.renting_date.slice(0,10)}`,
                },
                {
                    Header: 'Start Station',
                    accessor: 'location_start_name',
                },
                {
                    Header: 'Finish Station',
                    accessor: 'location_end_name',
                },
                {
                    Header: 'Condition',
                    accessor: 'conditions',
                },
                {
                    Header: 'Finished Date',
                    accessor: f =>`${f.finished_date.slice(11,19)} ${f.finished_date.slice(0,10)}`,
                },
            ],
        },
    ],
    []
    )
    // const pagination = paginationFactory({
    //     page: 2,
    //     sizePerPage: 10,
    //     lastPageText: '>>',
    //     firstPageText: '<<',
    //     nextPageText: '>',
    //     prePageText: '<',
    //     showTotal: true,
    //     alwaysShowAllBtns: true,
    //     onPageChange: function (page, sizePerPage) {
    //       console.log('page', page);
    //       console.log('sizePerPage', sizePerPage);
    //     },
    //     onSizePerPageChange: function (page, sizePerPage) {
    //       console.log('page', page);
    //       console.log('sizePerPage', sizePerPage);
    //     }
    //   });
  
  
    const data = React.useMemo(
        () => props.sortedRentings,[props.sortedRentings]
    )
    const dataFiltered = React.useMemo(
        () => props.filteredRentings,[props.filteredRentings]
    )
    console.log(filtereddata);
    // (dataFiltered);
  
// const data1 = data.map(item=>(item));
// console.log(data1)

  //   const search = (filteredVal, sortedVal) => {
  //     console.log(filteredVal, sortedVal)
  //     const result = (filteredVal, sortedVal) =>{
  //       if(filteredVal) {
  //                 return filteredVal;
  //             }
  //             else{
  //               return sortedVal;
  //             }
  //           }
  //     setDataUsed(result);
  // };

    //  const result = dataFiltered?.length >=0
    //   ? dataFiltered.map((item)=>{return item })
    //   : dataSorted.map((item)=>{ return item })
    //   console.log(result)
    //  const result = {name: "2. 3. 4", number:"dfs"};
    // setDataUsed(result)
    
  // search(dataFiltered, dataSorted);
 
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns, 
            data,
            initialState: { pageIndex: 0 }
        },
         usePagination, 
    )
    console.log(page)

    return (
        <>
        <table className="table" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                    {page?.length > 0 ?page.map((item, i) => {
                      console.log(page)
                    prepareRow(item)
                    return (
                        <tr {...item.getRowProps()} key={i}>
                            {item.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })
            :
             page.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()} key={i}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })
        } 
            </tbody>
        </table>
        {/* <Pagination /> */}
        <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
    )
}

export default RentingTable;