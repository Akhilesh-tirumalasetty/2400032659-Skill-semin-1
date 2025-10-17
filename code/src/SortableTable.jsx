import React, { useState } from 'react';

const employees = [
  { name: 'Alice', department: 'HR', salary: 50000 },
  { name: 'Bob', department: 'Engineering', salary: 70000 },
  { name: 'Charlie', department: 'Sales', salary: 60000 },
  { name: 'Diana', department: 'Engineering', salary: 75000 },
];

function SortableTable() {
  const [data, setData] = useState(employees);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setData(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <table style={{ borderCollapse: 'collapse', width: '60%', margin: 'auto', backgroundColor: '#000' }}>
      <thead>
        <tr>
          {['name', 'department', 'salary'].map((col) => (
            <th
              key={col}
              onClick={() => sortData(col)}
              style={{
                border: '1px solid white',
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: sortConfig.key === col ? '#333' : '#000',
                color: 'white',
              }}
            >
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((employee, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? '#111' : '#000',
              color: 'white',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#555')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#111' : '#000')
            }
          >
            <td style={{ border: '1px solid white', padding: '8px' }}>{employee.name}</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>{employee.department}</td>
            <td style={{ border: '1px solid white', padding: '8px' }}>{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SortableTable;
