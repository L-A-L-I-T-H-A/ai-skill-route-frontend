function showPage(id){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 document.getElementById(id).classList.add('active');
}

function registerUser(){
 let user={
   name:regName.value,
   email:regEmail.value,
   password:regPassword.value
 };
 localStorage.setItem('studentUser',JSON.stringify(user));
 alert('Registration Successful');
 showPage('login');
}

function loginUser(){
 let saved=JSON.parse(localStorage.getItem('studentUser'));
 if(saved.email===loginEmail.value && saved.password===loginPassword.value){
   alert('Login Successful');
   showPage('predict');
 }else{
   alert('Invalid Login');
 }
}

document.getElementById('studentForm').addEventListener('submit',async function(e){
 e.preventDefault();

 const data={
   name:name.value,
   attendance:Number(attendance.value),
   coding:Number(coding.value),
   aptitude:Number(aptitude.value),
   communication:Number(communication.value),
   projects:Number(projects.value),
   certifications:Number(certifications.value)
 };

 const response=await fetch('https://ai-skill-route-backend-1.onrender.com/student',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(data)
 });

 const result = await response.json();

console.log(result);   // check backend response in browser console

document.getElementById("performance").innerText =
    Number(result.performance_score).toFixed(2);

document.getElementById("placement").innerText =
    result.placement_eligible == 1 ? "Eligible" : "Not Eligible";

document.getElementById("career").innerText =
    result.career_domain;

document.getElementById("skill").innerText =
    result.skill_category;

showPage("resultPage");
});
