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

const sideBar = () => {
  const content = document.querySelector('#content');
  const sideBarContainer = document.createElement('div');
  sideBarContainer.classList.add('sidebar');
  console.log(content);
  console.log(sideBarContainer);
  content.appendChild(sideBarContainer);
  sideBarContent();
}

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

sideBar();