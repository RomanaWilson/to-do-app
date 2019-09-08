function onReady() {
  const ADD_TODO_FORM = document.getElementById('addToDoForm');
  let toDos = [];

  // Loads stored toDos from storage if defined.
  if (localStorage.getItem("todos")) {
    toDos = JSON.parse(localStorage.getItem("todos"));
  }

  let id = 0;

  // Creates a New ToDo
  function createNewToDo(){

    //get the new Todo text from the form
    const NEW_TODO_TEXT = document.getElementById('newToDoText');

    //No 'blank' toDos
    if(!NEW_TODO_TEXT.value){ return; }

    //new ToDo
    toDos.push({
      title: NEW_TODO_TEXT.value,
      complete: false,
      id: id
    });

    //Wrapup: increment and update storage and UI
    console.log(toDos[id]);
    NEW_TODO_TEXT.value = '';
    id++;
    localStorage.setItem("todos", JSON.stringify(toDos));
    renderTheUI();
  }

  //Renders UI - called whenever the state is updated, i.e. new ToDo
  function renderTheUI() {
    const TO_DO_LIST = document.getElementById('toDoList');
    TO_DO_LIST.textContent = '';
    toDos.forEach(function(toDo) {
      //Create ToDo list Elements
      const NEW_LI = document.createElement('li');

      const CHECKBOX = document.createElement('input');
      CHECKBOX.type = "checkbox";
      //checked is set as completed in the todo object
      if (toDo.complete) {
        CHECKBOX.checked = true
      } else {
        CHECKBOX.checked = false
      }

      const DELETE = document.createElement('button');
      DELETE.textContent = "Delete";

      //Build Event Listenr for the Checkbox
      CHECKBOX.addEventListener('click', event => {
        if (CHECKBOX.checked == true) {
          toDo.complete = true;
        } else {
          toDo.complete = false;
        };
        console.log(toDos);
        //Store modified array
        localStorage.setItem("todos", JSON.stringify(toDos));
      });


      //Build Event Listner for each Delete Button
      DELETE.addEventListener('click', event => {
         toDos = toDos.filter(function(item){
            return item.id !== toDo.id;
         });
         //Store modified array
         localStorage.setItem("todos", JSON.stringify(toDos));
         renderTheUI();
      });

      //Add the todo List text (from input)
      NEW_LI.textContent = toDo.title;

      //Update DOM
      TO_DO_LIST.appendChild(NEW_LI);
      NEW_LI.appendChild(CHECKBOX);
      NEW_LI.appendChild(DELETE);
    }) //end for each function
  }

  // Event Listners
  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  // Render
  renderTheUI();
}


window.onload = function() {
  onReady();
};
