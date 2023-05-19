const employees = [
    {
      "id": 1,
      "name": "Mr. A",
      "designation": "Senior Developer",
      "skills": ["JavaScript", "Python", "Java"],
      "projects": [
        {
          "name": "Project A",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "team": [
            {
              "name": "Alice",
              "role": "Developer"
            },
            {
              "name": "Bob",
              "role": "Designer"
            },
            {
              "name": null,
              "role": "Tester"
            }
          ],
          "tasks": [
            {
              "id": 1,
              "name": "Task 1",
              "status": "In Progress"
            },
            {
              "id": 2,
              "name": "Task 2",
              "status": "Completed"
            },
            {
              "id": 3,
              "name": "Task 3",
              "status": null
            }
          ]
        },
        {
          "name": "Project B",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "team": [
            {
              "name": "Alice",
              "role": "Developer"
            },
            {
              "name": null,
              "role": "Designer"
            }
          ],
          "tasks": [
            {
              "id": 1,
              "name": "Task 1",
              "status": "In Progress"
            },
            {
              "id": 2,
              "name": "Task 2",
              "status": "In Progress"
            },
            {
              "id": 3,
              "name": "Task 3",
              "status": "undefined"
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Mr. B",
      "designation": null,
      "skills": ["HTML", "CSS", "Photoshop"],
      "projects": [
        {
          "name": "Project C",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "team": [
            {
              "name": "David",
              "role": "Developer"
            },
            {
              "name": "Eve",
              "role": "Designer"
            },
            {
              "name": "undefined",
              "role": "Tester"
            }
          ],
          "tasks": [
            {
              "id": 1,
              "name": "Task 1",
              "status": "Completed"
            },
            {
              "id": 2,
              "name": null,
              "status": "Completed"
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": null,
      "designation": "QA Engineer",
      "skills": ["Manual Testing", "undefined", "SQL"],
      "projects": null
    },
    {
      "id": "undefined",
      "name": "Mr. D",
      "designation": "Project Manager",
      "skills": [],
      "projects": [
        {
          "name": "Project D",
          "description": null,
          "team": [],
          "tasks": [
            {
              "id": 1,
              "name": "Task 1",
              "status": "Pending"
            },
            {
              "id": "undefined",
              "name": null,
              "status": "In Progress"
            }
          ]
        }
      ]
    }
  ];
  
  // Remove undefined and null values recursively from the object
  function removeUndefinedAndNullValues(obj) {
    for (let prop in obj) {
      if (obj[prop] === null || obj[prop] === undefined) {
        delete obj[prop];
      } else if (typeof obj[prop] === 'object') {
        removeUndefinedAndNullValues(obj[prop]);
      }
    }
  }
  
  // Process each employee
  for (let employee of employees) {
    removeUndefinedAndNullValues(employee);
  }
  
  // Print the updated employees array
  console.log(employees);
  

  
  // Filter/Search functionality
  const searchByName = (name, employees) => {
    if (!name) {
      return employees;
    }
    return employees.filter(employee => employee.name && employee.name.toLowerCase().includes(name.toLowerCase()));
  };
  
  const filterByDesignationOrSkills = (designation, skills, employees) => {
    return employees.filter(employee => {
      let matchDesignation = true;
      let matchSkills = true;
  
      if (designation) {
        matchDesignation = employee.designation && employee.designation.toLowerCase().includes(designation.toLowerCase());
      }
  
      if (skills && skills.length > 0) {
        matchSkills = employee.skills && skills.every(skill => employee.skills.includes(skill));
      }
  
      return matchDesignation && matchSkills;
    });
  };
  
  // Render table function
  const renderTable = (employees) => {
    const table = document.createElement('table');
    table.className = 'project-table';
  
    // Table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Project Name', 'Team Size', 'Completed Tasks'];
  
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
  
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // Table body
    const tbody = document.createElement('tbody');
    employees.forEach(employee => {
      if (employee.projects) {
        employee.projects.forEach(project => {
          const teamSize = project.team ? project.team.length : 0;
          const completedTasks = project.tasks ? project.tasks.filter(task => task.status === 'Completed').length : 0;
  
          const row = document.createElement('tr');
          const projectNameCell = document.createElement('td');
          const teamSizeCell = document.createElement('td');
          const completedTasksCell = document.createElement('td');
  
          projectNameCell.textContent = project.name;
          teamSizeCell.textContent = teamSize;
          completedTasksCell.textContent = completedTasks;
  
          row.appendChild(projectNameCell);
          row.appendChild(teamSizeCell);
          row.appendChild(completedTasksCell);
  
          tbody.appendChild(row);
        });
      }
    });
  
    table.appendChild(tbody);
  
    return table;
  };
  
  // Get the search input and filter form elements
  const searchInput = document.getElementById('search-input');
  const filterForm = document.getElementById('filter-form');
  
  // Handle filter/search events
  const handleFilterSearch = () => {
    const name = searchInput.value.trim();
    const designation = filterForm.designation.value.trim();
    const skills = Array.from(filterForm.skills.selectedOptions, option => option.value.trim());
  
    let filteredEmployees = jsonData.employees;
  
    // Apply filter/search
    filteredEmployees = searchByName(name, filteredEmployees);
    filteredEmployees = filterByDesignationOrSkills(designation, skills, filteredEmployees);
  
    // Render the table
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    const table = renderTable(filteredEmployees);
    tableContainer.appendChild(table);
  };
  
  // Attach event listeners
  searchInput.addEventListener('input', handleFilterSearch);
  filterForm.addEventListener('change', handleFilterSearch);
  
  // Initial render
  const initialTableContainer = document.getElementById('table-container');
  const initialTable = renderTable(jsonData.employees);
  initialTableContainer.appendChild(initialTable);
  
