const btn=document.querySelector('button');

/* btn.onclick=function(){
    alert('hello there');
}; */

function onclickHandler(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
    console.log('clicked button');
    console.log(event)
}

btn.addEventListener('click',onclickHandler);

/* setTimeout(function(){
    btn.removeEventListener('click',onclickHandler);
},2000); */

/* const boundfn=onclickHandler.bind(this)
btn.addEventListener('click',boundfn);

setTimeout(function(){
    btn.removeEventListener('click',boundfn);
},2000); */

const form=document.querySelector('form');
form.addEventListener('submit',event =>{
    event.preventDefault();
    console.log(event);
});

const div=document.querySelector('div');

div.addEventListener('click', (event) =>{
    console.log('clicked div')
    console.log(event)
}) // true for capturing and by default it is false which mean bubbling

const li=document.querySelectorAll('li')

/* li.forEach(item =>{
    item.addEventListener('click',(event) =>{
        event.target.classList.toggle('highlight');
    });
}); */

const ul=document.querySelector('ul')

ul.addEventListener('click',(event)=>{
    event.target.closest('li').classList.toggle('highlight');
    //form.submit(); triggering dom element programmatically
    btn.click();
});




