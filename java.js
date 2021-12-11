let todos=[];
const inp =document.querySelector("input")
inp.addEventListener('keydown' ,(e)=>storageSet(e));

function storageSet(x){
	if(x.which==13) //Check if enter pressed
		{	
			if(inp.value===""){
				alert("Please Enter Todo First");
				return
				}
			else{
			const todoObject ={
					id:Date.now(),
					name:inp.value}
				todos.push(todoObject);
				addToLocalStorage(todos)
				inp.value=""
	
		}
	}
}
function addToLocalStorage(todos) {
	// conver the array to string then store it.
	localStorage.setItem('todos', JSON.stringify(todos));
	// render them to screen
	renderlist(todos)

  }
  // function helps to get everything from local storage
function getFromLocalStorage() {
	
	const reference = localStorage.getItem('todos');
	// if reference exists
	if (reference) {
	  // converts back to array and store it in todos array
	 todos= JSON.parse(reference);
	  
	}
	renderlist(todos)
  }
  
  // initially get everything from localStorage
  getFromLocalStorage()

function renderlist( mytodolist)
{	
	const ol =document.querySelector('ol');
					
							ol.innerHTML='';
						mytodolist.forEach((value)=>{
							
							const li =document.createElement('li');
							const btn=document.createElement('button');
						const btnup =document.createElement('button')
								const btndown =document.createElement('button')
						li.innerText =value.name
							
							btnup.setAttribute("class","fas fa-angle-double-up");
							btn.setAttribute("class","fas fa-trash-alt")
							btndown.setAttribute("class","fas fa-angle-double-down")
							li.setAttribute('data-key', value.id);
							btn.addEventListener("click",()=>
								{
								li.remove();
								x=li.getAttribute("data-key")
								deleteTodo(x)
								} );

							btnup.addEventListener("click",(e)=>{
								let target = e.target.parentNode;
								let prev = target.previousElementSibling;
								if(prev)
									prev.before(target);
							});
							btndown.addEventListener("click",(e)=>{
								let target = e.target.parentNode;
								let next = target.nextElementSibling;
								if(next)
									target.before(next);
							});
							
							li.append(btnup);
							li.append(btn);
							li.append(btndown);
							ol.append(li);
						});
}
function deleteTodo(id) {
	// filters out the <li> with the id and updates the todos array
	todos = todos.filter(function(item) {
	  // use != not !==, because here types are different. One is number and other is string
	  return item.id != id;
	});
	addToLocalStorage(todos);
}