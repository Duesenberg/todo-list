import './style.css';

const toDoList = [
  {
    title: "To-Do List",
    description: "Create a functioning To-Do List app that works in the browser. Better get busy.",
    checkList: ["Create basic page setup", "Define page style and structure",
  ""],
  },
  {
    title: "Work Out",
    description: "Go to the gym and work out.",
    checkList: ["Go to gym", "Work out", "Go back"],
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

//create main div where project details will be shown
const mainArea = () => {
  const content = document.querySelector('#content');
  const mainAreaContainer = document.createElement('div');
  mainAreaContainer.classList.add('main');
  content.appendChild(mainAreaContainer);
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
    sideBarItem.appendChild(itemTitle);

    const removeItem = document.createElement('button');
    removeItem.setAttribute('data-index', i);
    sideBarItem.appendChild(removeItem);
  }
}

//generate project details (takes data-index as input, need to couple this with an event listener)
const mainAreaContent = (dataIndex) => {
  const mainContainer = document.querySelector('.main');
  const projectContainer = document.createElement('div');
  projectContainer.classList.add('project-container');
  mainContainer.appendChild(projectContainer);

  const projectTitle = document.createElement('h1');
  projectTitle.classList.add('title');
  projectTitle.textContent = toDoList[dataIndex].title;
  projectContainer.appendChild(projectTitle);

  const projectDescription = document.createElement('p');
  projectDescription.classList.add('text');
  projectDescription.textContent = toDoList[dataIndex].description;
  projectContainer.appendChild(projectDescription);

  /* NEED TO FINISH THIS */
}



sideBar();
mainArea();