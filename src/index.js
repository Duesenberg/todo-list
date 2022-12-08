//need to:
//add checkboxes for the list items in the project checklist
//add functionalith to change priority of project via project window

import './style.css';

const toDoList = [
  {
    title: "To-Do List",
    description: "Create a functioning To-Do List app that works in the browser. Better get busy.",
    checkList: [
      {
        task: "Create basic page setup",
        checked: true,
      },
      {
        task: "Define page style and structure",
        checked: false,
      }
    ],
    dueDate: "12/10/2022",
    priority: "High",
  },
  {
    title: "Work Out",
    description: "Go to the gym and work out.",
    checkList: [
      {
        task: "Go to gym",
        checked: false,
      },
      {
        task: "Work out",
        checked: false,
      },
      {
        task: "Go back",
        checked: false,
      },
    ],
    dueDate: "12/03/2022",
    priority: "Medium",
  },
  
]

//create sidevar div where projects will be listed
const sideBar = () => {
  const content = document.querySelector('#content');
  const sideBarContainer = document.createElement('div');
  sideBarContainer.classList.add('sidebar');
  content.appendChild(sideBarContainer);
  sideBarContent();
}

//create main divs where project details will be shown
const mainArea = () => {
  const content = document.querySelector('#content');
  const mainAreaContainer = document.createElement('div');
  mainAreaContainer.classList.add('main');
  content.appendChild(mainAreaContainer);

  const projectContainer = document.createElement('div');
  projectContainer.classList.add('project-container');
  mainAreaContainer.appendChild(projectContainer);
}

//generate list of projects on sidebar (can import this one?)
const sideBarContent = () => {
  const sideBar = document.querySelector('.sidebar');
  for (let i = 0; i < toDoList.length; i++) {
    const sideBarItem = document.createElement('div');
    sideBarItem.classList.add('sidebar-item');
    sideBarItem.setAttribute('data-index', i);
    sidebarPriorityIndicator(sideBarItem);
    sideBar.appendChild(sideBarItem);
    sideBarItem.addEventListener('click', () => {
      let dataIndex = sideBarItem.getAttribute('data-index');
      generateMainContent(dataIndex);
    })
    
    const itemTitle = document.createElement('div');
    itemTitle.classList.add('title');
    itemTitle.textContent = toDoList[i].title;
    itemTitle.setAttribute('data-index', i);
    sideBarItem.appendChild(itemTitle);
  }
}

//generate project details (takes data-index as input, need to couple this with an event listener)
//might be a good idea to call a function for generating the elements here?
const mainAreaContent = (dataIndex) => {
  //main container
  const projectContainer = document.querySelector('.project-container');

  //title container
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');
  projectContainer.appendChild(titleContainer);

    //title
    const projectTitle = document.createElement('h1');
    projectTitle.classList.add('title');
    projectTitle.textContent = toDoList[dataIndex].title;
    titleContainer.appendChild(projectTitle);

    //close project
    const closeProject = document.createElement('button');
    closeProject.classList.add('close');
    titleContainer.appendChild(closeProject);
    closeProject.addEventListener('click', () => {
      removeAllChildNodes(projectContainer);    
    })

  //description
  const projectDescription = document.createElement('p');
  projectDescription.classList.add('text');
  projectDescription.textContent = toDoList[dataIndex].description;
  projectContainer.appendChild(projectDescription);

  //due date, priority & delete
  const info = document.createElement('div');
  info.classList.add('info');
  projectContainer.appendChild(info);
  
    //due date
    const dueDate1 = document.createElement('div');
    dueDate1.classList.add('due-date1');
    dueDate1.textContent = 'Due Date:';
    info.appendChild(dueDate1);
    const dueDate2 = document.createElement('div');
    dueDate2.classList.add('due-date2');
    dueDate2.textContent = toDoList[dataIndex].dueDate;
    info.appendChild(dueDate2);

    //priority
    const priority1 = document.createElement('div');
    priority1.classList.add('priority1');
    priority1.textContent = "Priority:"
    info.appendChild(priority1);
    const priority2 = document.createElement('div');
    priority2.classList.add('priority2');
    priority2.setAttribute('data-index', dataIndex)
    priority2.textContent = toDoList[dataIndex].priority;
    mainAreaPriorityIndicator(priority2);
    priority2.addEventListener('click', () => {
      changePriority(priority2);
      generateMainContent(dataIndex);
      generateSidebarContent();
    })
    info.appendChild(priority2);

    //remove project
    const removeProject = document.createElement('button');
    removeProject.classList.add('remove');
    info.appendChild(removeProject);
    removeProject.addEventListener('click', () => {
      projectRemove(projectContainer, dataIndex);
    })

  //checklist
  const checkList = document.createElement('div');
  checkList.classList.add('checklist');
  projectContainer.appendChild(checkList);

  const addItem = document.createElement('button');
  addItem.classList.add('add-item');
  addItem.textContent = "Add item to Checklist";
  checkList.appendChild(addItem);
  addItem.addEventListener('click', () => {
    bringUpChecklistPopUp(toDoList[dataIndex].checkList, dataIndex);
  })

  //need to add checkboxes for each item here
  const unorderedList = document.createElement('ul');
  unorderedList.classList.add('all-items')
  checkList.appendChild(unorderedList);
  for (let i = 0; i < toDoList[dataIndex].checkList.length; i++) {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    listItem.setAttribute('data-itemindex', i);
    unorderedList.appendChild(listItem);
  
    const listItemText = document.createElement('button');
    listItemText.classList.add('text');
    if (toDoList[dataIndex].checkList[i].checked == true) {
      listItemText.classList.add('checked');
    }
    listItemText.textContent = toDoList[dataIndex].checkList[i].task;
    listItem.appendChild(listItemText);
    listItemText.addEventListener('click', () => {
      makeChecked(listItem, dataIndex);
      generateMainContent(dataIndex);
    })

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-item');
    removeButton.addEventListener('click', () => {
      removeChecklistItem(listItem, dataIndex);
      generateMainContent(dataIndex);
    })
    listItem.appendChild(removeButton);
  }
}

/* clear the window of the displayed project, and display the one that 
  was selected. Or, can be used to refresh main window if cnages were made*/
const generateMainContent = (dataIndex) => {
  const mainContainer = document.querySelector('.project-container');
  removeAllChildNodes(mainContainer);  
  mainAreaContent(dataIndex);
}

//refresh the sidebar
const generateSidebarContent = () => {
  const mainContainer = document.querySelector('.sidebar');
  removeAllChildNodes(mainContainer);
  sideBarContent();  
}

//clear an element of all child nodes
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

//remove a project
const projectRemove = (mainWindow, dataIndex) => {
  removeAllChildNodes(mainWindow);
  toDoList.splice(dataIndex, 1);
  //reload sidebar
  const sideBar = document.querySelector('.sidebar');
  removeAllChildNodes(sideBar);
  sideBarContent();
}

//set indicator of priority on sidebar (green,yellow or red left border)
const sidebarPriorityIndicator = (item) => {
  let dataIndex = item.getAttribute('data-index');
  switch (toDoList[dataIndex].priority) {
    case 'Low':
      item.style.borderLeft = '5px solid green';
      break;
    case 'Medium':
      item.style.borderLeft = '5px solid yellow';
      break;
    case 'High':
      item.style.borderLeft = '5px solid red';
      break;
  }
}

//set color of priority indicator on project window
const mainAreaPriorityIndicator = (item) => {
  switch (item.textContent) {
    case 'Low':
      item.style.color = "green";
      break;
    case 'Medium':
      item.style.color = "yellow";
      break;
    case 'High':
      item.style.color = "red";
      break;
  }
}

//change the priority of the project
const changePriority = (item) => {
  let dataIndex = item.getAttribute('data-index');
  if (toDoList[dataIndex].priority === 'Low') toDoList[dataIndex].priority = 'Medium';
  else if (toDoList[dataIndex].priority === 'Medium') toDoList[dataIndex].priority = 'High';
  else toDoList[dataIndex].priority = 'Low';
  
  item.textContent = toDoList[dataIndex].priority;
}

//remove item from checklist
const removeChecklistItem = (item, dataIndex) => {
  let itemIndex = item.getAttribute('data-itemindex');
  toDoList[dataIndex].checkList.splice(itemIndex, 1);
  item.remove();
}

//change status of checklist item to checked/unchecked
const makeChecked = (item, dataIndex) => {
  let itemIndex = item.getAttribute('data-itemindex');
  toDoList[dataIndex].checkList[itemIndex].checked === false ?
  toDoList[dataIndex].checkList[itemIndex].checked = true :
  toDoList[dataIndex].checkList[itemIndex].checked = false;
}

//bring up pop up form for adding a checklist item
const bringUpChecklistPopUp = (dataLocation, dataIndex) => {
  const projectContainer = document.querySelector('.project-container');
  const form = document.createElement('form');
  const legend = document.createElement('legend');
  const taskContainer = document.createElement('div');
  const checkListItemText = document.createElement('input');
  const itemTextLabel = document.createElement('label');
  const checkBoxContainer = document.createElement('div');
  const checkBox = document.createElement('input');
  const checkBoxLabel = document.createElement('label');
  const submitButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  form.classList.add('checklist-form');
  form.setAttribute('action', '');
  form.setAttribute('method', '');
  projectContainer.appendChild(form);

  legend.classList.add('legend');
  legend.textContent = 'Add Task:';
  form.appendChild(legend);

  taskContainer.classList.add('task-container');
  form.appendChild(taskContainer);

    itemTextLabel.setAttribute('for', 'task');
    itemTextLabel.textContent = "Task:"
    taskContainer.appendChild(itemTextLabel);

    checkListItemText.setAttribute('type', 'text');
    checkListItemText.setAttribute('name', 'task');
    checkListItemText.setAttribute('id', 'task');
    checkListItemText.setAttribute('title', 'Enter task description here');
    checkListItemText.setAttribute('required', '');
    taskContainer.appendChild(checkListItemText);

  checkBoxContainer.classList.add('checkbox-container');
  form.appendChild(checkBoxContainer);

    checkBoxLabel.setAttribute('for', 'done');
    checkBoxLabel.textContent = "Done:"
    checkBoxContainer.appendChild(checkBoxLabel);

    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('name', 'done');
    checkBox.setAttribute('id', 'done');
    checkBox.setAttribute('title', 'Is this task finished?');
    checkBox.setAttribute('required', '');
    checkBoxContainer.appendChild(checkBox);

  submitButton.classList.add('submit-task');
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);
  submitButton.addEventListener('click', () => {
    const checkListItem = checkListItemFactory(checkListItemText.value, checkBox);
    dataLocation.push(checkListItem);
    generateMainContent(dataIndex);
    form.remove();
  })

  cancelButton.classList.add('cancel-task');
  cancelButton.textContent = "Cancel";
  form.appendChild(cancelButton);
  cancelButton.addEventListener('click', () => {
    form.remove();
  })
}

//factory for creating checklist item
const checkListItemFactory = (task, done) => {
  let checked;
  (done) ? checked = true : checked = false;
  return {task, checked};
}

sideBar();
mainArea();