//load local storage
const loadLocalStorage = () => {
  const loaded = window.localStorage.getItem("toDoListStorage");
  toDoList = JSON.parse(loaded);
}

  //GENERATING/REFRESHING CONTENT
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
//bring up popup for changing due date
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

  //REMOVAL
//remove a project
const projectRemove = (mainWindow, dataIndex) => {
  removeAllChildNodes(mainWindow);
  toDoList.splice(dataIndex, 1);
  //reload sidebar
  const sideBar = document.querySelector('.sidebar');
  removeAllChildNodes(sideBar);
  sideBarContent();
}
//clear an element of all child nodes
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
//remove item from checklist
const removeChecklistItem = (item, dataIndex) => {
  let itemIndex = item.getAttribute('data-itemindex');
  toDoList[dataIndex].checkList.splice(itemIndex, 1);
  item.remove();
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

  //PRIORITY
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

  //CHANGE DATA
//change status of checklist item to checked/unchecked
const makeChecked = (item, dataIndex) => {
  let itemIndex = item.getAttribute('data-itemindex');
  toDoList[dataIndex].checkList[itemIndex].checked === false ?
  toDoList[dataIndex].checkList[itemIndex].checked = true :
  toDoList[dataIndex].checkList[itemIndex].checked = false;
}

  //FACTORY FUNCTIONS
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

export {
  loadLocalStorage, generateMainContent, generateSidebarContent,
  bringUpChecklistPopUp, bringUpProjectPopup, bringUpDatePopup,
  projectRemove, removeAllChildNodes, removeChecklistItem,
  removeForms, sidebarPriorityIndicator, mainAreaPriorityIndicator,
  changePriority, makeChecked, checkListItemFactory, projectFactory
}