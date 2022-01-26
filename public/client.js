const socket=io();

let name;
let textarea=document.getElementById('textarea');
let messageArea=document.querySelector('.message_area');
let button=document.getElementById('button');
do{
    name=prompt('Please enter you name: ');
}while(!name)
button.addEventListener("click",(e)=>{
    
    {
        sendMessage(textarea.value);
    }
});
textarea.addEventListener("keyup",(e)=>{
    if(e.key==='Enter')
    {
        sendMessage(e.target.value);
    }
});
function sendMessage(message) {
    let msg={
        user: name,
        message:message.trim()
    }
    // Append
    appendMessage(msg,'outgoing');
    textarea.value='';
    scrollToBottom()
    // send to server
    socket.emit('message', msg)

}
function appendMessage(msg,type) {
    let mainDiv=document.createElement('div');
    let className=type
    mainDiv.classList.add(className,'message');
    let markup=`<h4>${msg.user}</h4>
    <p>${msg.message}</p>`;

    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv)
}

// Recieve message
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})

// scroll to bottom
function scrollToBottom() {
    messageArea.scrollTop=messageArea.scrollHeight;
}