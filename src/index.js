//need to:
//add functionality for the color of the sidebar borders depending on project priority
//add checkboxes for the list items in the project checklist
//add functionality to remove projects

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
    sideBar.appendChild(sideBarItem);
    
    const itemTitle = document.createElement('div');
    itemTitle.classList.add('title');
    itemTitle.textContent = toDoList[i].title;
    itemTitle.setAttribute('data-index', i);
    sideBarItem.appendChild(itemTitle);
    itemTitle.addEventListener('click', () => {
      let dataIndex = itemTitle.getAttribute('data-index');
      generateMainContent(dataIndex);
    })

    //maybe I should remove this element from sidebar, put it in main instead
    const removeItem = document.createElement('button');
    removeItem.setAttribute('data-index', i);
    sideBarItem.appendChild(removeItem);
  }
}

//generate project details (takes data-index as input, need to couple this with an event listener)
//might be a good idea to call a function for generating the elements here?
const mainAreaContent = (dataIndex) => {
  //main container
  const projectContainer = document.querySelector('.project-container');

  //title
  const projectTitle = document.createElement('h1');
  projectTitle.classList.add('title');
  projectTitle.textContent = toDoList[dataIndex].title;
  projectContainer.appendChild(projectTitle);

  //description
  const projectDescription = document.createElement('p');
  projectDescription.classList.add('text');
  projectDescription.textContent = toDoList[dataIndex].description;
  projectContainer.appendChild(projectDescription);

  //due date
  const dueDate = document.createElement('div');
  dueDate.classList.add('due-date');
  dueDate.textContent = toDoList[dataIndex].dueDate;
  projectContainer.appendChild(dueDate);

  //priority
  const priority = document.createElement('div');
  priority.classList.add('priority');
  priority.textContent = toDoList[dataIndex].priority;
  projectContainer.appendChild(priority);

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

  //close project
  const closeProject = document.createElement('button');
  closeProject.classList.add('close');
  closeProject.textContent = "close";
  projectContainer.appendChild(closeProject);
  closeProject.addEventListener('click', () => {
    removeAllChildNodes(projectContainer);    
  })

  //remove project -NEED TO FINISH
  const removeProject = document.createElement('button');
  removeProject.classList.add('remove');
  removeProject.textContent = 'remove';
  projectContainer.appendChild(removeProject);
}

/* clear the screen of the displayed project, and display the one that 
  was selected*/
const generateMainContent = (dataIndex) => {
  const mainContainer = document.querySelector('.project-container');
  removeAllChildNodes(mainContainer);  
  mainAreaContent(dataIndex);
}

//clear an element of all child nodes
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

sideBar();
mainArea();