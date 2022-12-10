//need to:

import './style.css';
import {format, parseISO} from 'date-fns';

let toDoList = [
  {
    title: "Create a Project",
    description: "Go ahead and create a project :)",
    checkList: [
      {
        task: 'Click on "Add Project"',
        checked: false,
      },
      {
        task: "Add a title, description, due date and select project priority",
        checked: false,
      },
      {
        task: 'Click "Submit"',
        checked: false,
      },
      {
        task: 'Add your tasks by clicking on the "Add task" button',
        checked: false,
      },
      {
        task: 'Click on the task if it is done, or on the "x" next to it if you want to remove it',
        checked: false,
      },
      {
        task: 'Change your due date, priority, or remove the whole project from the buttons on the bottom of the project window',
        checked: false,
      },
    ],
    dueDate: "Dec 12, 2022",
    priority: "Low",
  },  
]

//event listener for add project button
const addProject = document.querySelector('.add-project');
addProject.addEventListener('click', () => {
  removeForms();
  bringUpProjectPopup();
})
//load local storage
const loadLocalStorage = () => {
  const loaded = window.localStorage.getItem("toDoListStorage");
  toDoList = JSON.parse(loaded);
}
const loadStorageButton = document.querySelector('.load-storage');
loadStorageButton.addEventListener('click', () => {
  loadLocalStorage();
  generateSidebarContent();
  console.log(toDoList)
})

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
    dueDate2.addEventListener('click', () => {
      removeForms();
      bringUpDatePopup(dataIndex);
    })

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
      window.localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
    })
    info.appendChild(priority2);

    //remove project
    const removeProject = document.createElement('button');
    removeProject.classList.add('remove');
    info.appendChild(removeProject);
    removeProject.addEventListener('click', () => {
      projectRemove(projectContainer, dataIndex);
      window.localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
    })

  //checklist
  const checkList = document.createElement('div');
  checkList.classList.add('checklist');
  projectContainer.appendChild(checkList);

  const addItem = document.createElement('button');
  addItem.classList.add('add-item');
  addItem.textContent = "Add task";
  checkList.appendChild(addItem);
  addItem.addEventListener('click', () => {
    removeForms();
    bringUpChecklistPopUp(toDoList[dataIndex].checkList, dataIndex);
  })

  //need to add checkboxes for each item here
  const unorderedList = document.createElement('ul');
  unorderedList.classList.add('all-items')
  checkList.appendChild(unorderedList);
  for (let i = 0; i < toDoList[dataIndex].checkList.length; i++) {
    const listItem = document.createElement('li');
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
      window.localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
      generateMainContent(dataIndex);
    })

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-item');
    removeButton.addEventListener('click', () => {
      removeChecklistItem(listItem, dataIndex);
      window.localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
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

  //form
  form.classList.add('checklist-form');
  form.setAttribute('action', '');
  form.setAttribute('method', '');
  projectContainer.appendChild(form);

  legend.classList.add('legend');
  legend.textContent = 'Add Task:';
  form.appendChild(legend);

  //task
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

  //checked
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

  //submit
  submitButton.classList.add('submit-task');
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);
  submitButton.addEventListener('click', () => {
    const checkListItem = checkListItemFactory(checkListItemText.value, checkBox);
    dataLocation.push(checkListItem);
    window.localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
    generateMainContent(dataIndex);
    form.remove();
  })

  //cancel
  cancelButton.classList.add('cancel-task');
  cancelButton.textContent = "Cancel";
  form.appendChild(cancelButton);
  cancelButton.addEventListener('click', () => {
    form.remove();
  })
}

//bring up popup for adding a project
const bringUpProjectPopup = () => {
  const projectContainer = document.querySelector('.project-container');
  const form = document.createElement('form');
  const legend = document.createElement('legend');
  const titleContainer = document.createElement('div');
  const titleText = document.createElement('input');
  const titleLabel = document.createElement('label');
  const descriptionContainer = document.createElement('div');
  const descriptionText = document.createElement('textarea');
  const descriptionLabel = document.createElement('label');
  const dueDateContainer = document.createElement('div');
  const dueDateText = document.createElement('input');
  const dueDateLabel = document.createElement('label');
  const priorityContainer = document.createElement('div');
  const priorityText = document.createElement('select');
  const priorityLabel = document.createElement('label');
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  const option3 = document.createElement('option');
  const submitButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  form.classList.add('project-form');
  form.setAttribute('action', '');
  form.setAttribute('method', '');
  projectContainer.appendChild(form);

  legend.classList.add('legend');
  legend.textContent = 'Add Project:';
  form.appendChild(legend);

  //title
  titleContainer.classList.add('project-title-container');
  form.appendChild(titleContainer);

    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = "Title:"
    titleContainer.appendChild(titleLabel);

    titleText.setAttribute('type', 'text');
    titleText.setAttribute('name', 'title');
    titleText.setAttribute('id', 'title');
    titleText.setAttribute('title', 'Enter title here');
    titleText.setAttribute('required', '');
    titleContainer.appendChild(titleText);

  //description
  descriptionContainer.classList.add('description-container');
  form.appendChild(descriptionContainer);

    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = "Description:"
    descriptionContainer.appendChild(descriptionLabel);

    descriptionText.setAttribute('name', 'description');
    descriptionText.setAttribute('id', 'description');
    descriptionText.setAttribute('title', 'Enter project description here');
    descriptionText.setAttribute('required', '');
    descriptionText.setAttribute('rows', '4');
    descriptionContainer.appendChild(descriptionText);

  //due date
  dueDateContainer.classList.add('duedate-container');
  form.appendChild(dueDateContainer);

    dueDateLabel.setAttribute('for', 'date');
    dueDateLabel.textContent = "Due date:"
    dueDateContainer.appendChild(dueDateLabel);

    dueDateText.setAttribute('type', 'date');
    dueDateText.setAttribute('name', 'date');
    dueDateText.setAttribute('id', 'date');
    dueDateText.setAttribute('title', 'Enter due date');
    dueDateText.setAttribute('required', '');
    dueDateContainer.appendChild(dueDateText);

  //priority
  priorityContainer.classList.add('priority-container');
  form.appendChild(priorityContainer);

    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.textContent = "Project priority:"
    priorityContainer.appendChild(priorityLabel);

    priorityText.setAttribute('name', 'priority');
    priorityText.setAttribute('id', 'priority');
    priorityText.setAttribute('title', 'Select priority');
    priorityText.setAttribute('required', '');
    priorityContainer.appendChild(priorityText);

    //options
    option1.value = 'Low';
    option1.textContent = 'Low';
    priorityText.appendChild(option1);

    option2.value = 'Medium';
    option2.textContent = 'Medium';
    priorityText.appendChild(option2);

    option3.value = 'High';
    option3.textContent = 'High';
    priorityText.appendChild(option3);


  //submit
  submitButton.classList.add('submit-project');
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);
  submitButton.addEventListener('click', () => {
    const project = projectFactory(titleText.value, descriptionText.value, dueDateText.value, priorityText.value);
    toDoList.push(project);
    window.localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
    generateSidebarContent();
    form.remove();
  })

  //cancel
  cancelButton.classList.add('cancel-project');
  cancelButton.textContent = "Cancel";
  form.appendChild(cancelButton);
  cancelButton.addEventListener('click', () => {
    form.remove();
  })

}

//bring up popup for changing date
const bringUpDatePopup = (dataIndex) => {
  const projectContainer = document.querySelector('.project-container');
  const form = document.createElement('form');
  const legend = document.createElement('legend');
  const dueDateContainer = document.createElement('div');
  const dueDateText = document.createElement('input');
  const dueDateLabel = document.createElement('label');
  const submitButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  form.classList.add('duedate-form');
  form.setAttribute('action', '');
  form.setAttribute('method', '');
  projectContainer.appendChild(form);

  legend.classList.add('legend');
  legend.textContent = 'Change due date:';
  form.appendChild(legend);

  //due date
  dueDateContainer.classList.add('duedate-container');
  form.appendChild(dueDateContainer);

    dueDateLabel.setAttribute('for', 'date');
    dueDateLabel.textContent = "Due date:"
    dueDateContainer.appendChild(dueDateLabel);

    dueDateText.setAttribute('type', 'date');
    dueDateText.setAttribute('name', 'date');
    dueDateText.setAttribute('id', 'date');
    dueDateText.setAttribute('title', 'Enter due date');
    dueDateText.setAttribute('required', '');
    dueDateContainer.appendChild(dueDateText);

  //submit
  submitButton.classList.add('submit-duedate');
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);
  submitButton.addEventListener('click', () => {
    toDoList[dataIndex].dueDate = format(parseISO(dueDateText.value), 'MMM dd, yyyy');    ;
    generateMainContent(dataIndex);
    window.localStorage.setItem("toDoListStorage", JSON.stringify(toDoList));
    form.remove();
  })

  //cancel
  cancelButton.classList.add('cancel-duedate');
  cancelButton.textContent = "Cancel";
  form.appendChild(cancelButton);
  cancelButton.addEventListener('click', () => {
    form.remove();
  })

}

//factory for creating checklist item
const checkListItemFactory = (task, done) => {
  let checked;
  (done.checked) ? checked = true : checked = false;
  return {task, checked};
}

//factory for project
const projectFactory = (title, description, dueDate, priority) => {
  let checkList = [];
  dueDate = format(parseISO(dueDate), 'MMM dd, yyyy');
  return {title, description, checkList, dueDate, priority};
}

//remove forms if present
const removeForms = () => {
  const projectForm = document.querySelector('.project-form');
  const checklistForm = document.querySelector('.checklist-form');
  const dueDateForm = document.querySelector('.duedate-form');
  if (projectForm != null) projectForm.remove();
  if (checklistForm != null) checklistForm.remove();
  if (dueDateForm != null) dueDateForm.remove();
}

sideBar();
mainArea();

