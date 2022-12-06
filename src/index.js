//need to:
//add checkboxes for the list items in the project checklist
//add functionalith to change priority of project via project window

import './style.css';

const toDoList = [
  {
    title: "To-Do List",
    description: "Create a functioning To-Do List app that works in the browser. Better get busy.",
    checkList: ["Create basic page setup", "Define page style and structure",
  ""],
    dueDate: "12/10/2022",
    priority: "High",
  },
  {
    title: "Work Out",
    description: "Go to the gym and work out.",
    checkList: ["Go to gym", "Work out", "Go back"],
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
    const dueDate = document.createElement('div');
    dueDate.classList.add('due-date');
    dueDate.textContent = toDoList[dataIndex].dueDate;
    info.appendChild(dueDate);

    //priority
    const priority = document.createElement('div');
    priority.classList.add('priority');
    priority.setAttribute('data-index', dataIndex)
    priority.textContent = toDoList[dataIndex].priority;
    mainAreaPriorityIndicator(priority);
    priority.addEventListener('click', () => {
      changePriority(priority);
      generateMainContent(dataIndex);
      generateSidebarContent();
    })
    info.appendChild(priority);

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

  //need to add checkboxes for each item here
  const unorderedList = document.createElement('ul');
  unorderedList.classList.add('all-items')
  checkList.appendChild(unorderedList);
  for (let i = 0; i < toDoList[dataIndex].checkList.length; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.textContent = toDoList[dataIndex].checkList[i];
    unorderedList.appendChild(listItem);
  }
}

/* clear the screen of the displayed project, and display the one that 
  was selected*/
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
  console.log(toDoList[dataIndex]);
  if (toDoList[dataIndex].priority === 'Low') toDoList[dataIndex].priority = 'Medium';
  else if (toDoList[dataIndex].priority === 'Medium') toDoList[dataIndex].priority = 'High';
  else toDoList[dataIndex].priority = 'Low';
  
  item.textContent = toDoList[dataIndex].priority;
}

sideBar();
mainArea();