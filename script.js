const inputs=document.querySelectorAll(".input");
function addc1(){
	let parent=this.parentNode.parentNode;
	parent.classList.add("focus");
}
function remc1(){
	let parent=this.parentNode.parentNode;
	if(this.value==""){
		parent.classList.remove("focus");
	}
}
inputs.forEach(input =>
{
	input.addEventListener("focus",addc1);
	input.addEventListener("blur",remc1);
});

const form = document.getElementById('login-form');

form.addEventListener('submit',function(event)
{
	event.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	if (username === "meenakshi" && password ==="abcde")
	{
		window.location.href = 'p.html';
	}
	else
	{
		/*const error = document.getElementById('error-message')
		error.textContent("Invalid username or password")*/
		alert("Invalid Username or Password.")
	}
});