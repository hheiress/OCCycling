import React, { useState, useEffect } from "react";
import {useTable, usePagination} from 'react-table';
import { Link } from "react-router-dom";

const ResidentsTable = (props)=>{

  useEffect(() => {}, [props])

  const columns = React.useMemo( 
    () => [
    {
        Header:'Users',
        columns: [
          {
            Header: 'UserID',
            accessor: 'id',
        },
          {
              Header: 'First name',
              accessor: 'name',
          },
          {
              Header: 'Last name',
              accessor: 'last_name',
          },
            {
                Header: 'Passport',
                accessor: 'passport',
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Gender',
                accessor: 'gender',
            },
            {
                Header: 'Date of birthday',
                accessor: 'date_birth',
            },
            {
                Header: 'Nationality',
                accessor: 'nationality',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone number',
                accessor: 'phone_number',
            },
            {
                Header: 'Edit',
                accessor: '',
            },
            {
                 Header: 'Status',
                 accessor: 'status',
            },
          ],
        },
      ],
      []
      )

      const data = React.useMemo(
        () => props.filteredUsers,[props.filteredUsers]
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

    return (
      <>    
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            
              <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => {
                    console.log(column);
                    if(column.Header !== "UserID"){

                      return <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                         if(cell.column.Header !=='UserID'){
                          if(cell.column.Header === 'Edit') {
                            return <td {...cell.getCellProps()}>
                              <Link to={'/updaterenter/' + item.cells[0].value}>
                               <button className="update-button">Update</button>
                              </Link>
                               <Link to={'/userhistory/'+ item.cells[0].value}
                                user_name={cell.row.name} 
                                user_last_name={cell.row.last_name}> 
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
        {/* // <tr key={props.index}>
        //     <td>{props.item.name}</td>
        //             <td>{props.item.last_name}</td>
        //             <td>{props.item.passport}</td>
        //             <td>{props.item.address}</td>
        //             <td>{props.item.gender}</td>
        //             <td>{props.item.date_birth}</td>
        //             <td>{props.item.nationality}</td>
        //             <td>{props.item.email}</td>
        //             <td>{props.item.phone_number}</td>
        //             <td>
        //               <Link to={'/updaterenter/' + props.item.id}>
        //                 <button className="update-button">Update</button>
        //               </Link>
        //               <Link to={'/userhistory/'+ props.item.id}
        //                     user_name={props.item.name}
        //                     user_last_name={props.item.last_name}>    
        //                     <button className="history-button">History</button>
        //               </Link>
        //             </td>
        //             <td className={props.item.status}>{props.item.status}</td>
        // </tr> */}
        </>
    )
}

export default ResidentsTable;