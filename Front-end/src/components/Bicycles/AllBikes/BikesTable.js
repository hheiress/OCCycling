import React, { useState, useEffect } from "react";
import {useTable, usePagination} from 'react-table';
import {Link} from "react-router-dom";

function BikesTable (props) {

    useEffect(() => {}, [props])

    const columns = React.useMemo( 
        () => [
        {
            Header:'Bicycles',
            columns: [
              {
                  Header: 'BikeId',
                  accessor: 'id',
              },
              {
                  Header: 'Bike Number',
                  accessor: 'bike_number',
              },
                {
                    Header: 'Brand',
                    accessor: 'brand_name',
                },
                {
                    Header: 'Model name',
                    accessor: 'model_name',
                },
                {
                    Header: 'Station',
                    accessor: 'station_name',
                },
                {
                    Header: 'Entry Date',
                    accessor: 'entry_date',
                },
                {
                    Header: 'Condition',
                    accessor: 'conditions',
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                },
                {
                    Header: 'Edit',
                    accessor: '',
              },
            ],
        },
    ],
    []
    )

    const data = React.useMemo(
        () => props.filteredBikes,[props.filteredBikes]
    )
    // useMemo to not rerender the data,
    console.log(data);
    console.log(columns);

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
  
    return(
        <>
        <table className="table" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                  
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => {
                          console.log(column);
                          if(column.Header !== "BikeId"){

                            return<th {...column.getHeaderProps()}>{column.render('Header')}</th>
                          }
})}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                    {page.map((item, i) => {
                      console.log(page)
                    prepareRow(item)
                    return (
                        <tr {...item.getRowProps()} key={i}>

                            {item.cells.map((cell, i) => {
                               if(cell.column.Header !=='BikeId'){
                                if(cell.column.Header === 'Edit') {
                                  return <td {...cell.getCellProps()}>
                                    <Link to={'/updatebicycle/' + item.cells[0].value}>
                                     <button className="update-button">Update</button>
                                    </Link>
                                     <Link to={'/bikehistory/'+ item.cells[0].value}
                                      bike_name={cell.row.model_name}>
                                    <button className="history-button">History</button>
                                    </Link>
                                  </td>
                                }
                                  return <td {...cell.getCellProps()}>{cell.render('Cell')} </td>
                               }
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

        // <tr key={props.index}>
        //    <td className="id-number">{props.item.bike_number}</td>
        //         <td>{props.item.brand_name}</td>
        //         <td>{props.item.model_name}</td>
        //         <td>{props.item.station_name}</td>
        //         <td>{props.item.entry_date.slice(0, 10)}</td>
        //         <td>{props.item.conditions}</td>
        //         <td className={props.item.status}>{props.item.status}</td>
        //         <td>
        //             <Link to={'/updatebicycle/' + props.item.id}>
        //                 <button className="update-button">Update</button>
        //             </Link>
        //             <Link to={'/bikehistory/'+ props.item.id}
        //                 bike_name={props.item.model_name}>
        //                 <button className="history-button">History</button>
        //             </Link>
        //         </td> 
        // </tr>
    )
}

export default BikesTable;