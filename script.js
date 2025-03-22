let bttnAdd = document.querySelector('.btn')
let form = document.getElementById('formContact')
let contact = []

function contactHandler(bttnAdd, form){
    form.addEventListener('submit', (Event) => Event.preventDefault())
    bttnAdd.addEventListener('click', () => {
        let nome = document.getElementById('contactName').value
        let email = document.getElementById('emailContact').value
        let tel = document.getElementById('telContact').value
        
        if(checkFields(nome, email, tel)){  
            cardErrorNotification()
            return;
        } 
    
        const validTel = validateInput(tel)
        const validEmail = validateInputEmail(email)

        if(!validTel){
            window.alert('O número de celular é inválido')
                return;
        }
        if(!validEmail){
            window.alert('O email inserido é inválido')
                return;
        }
        cardSuccessInsert()
        setTimeout(removeCards, 1000)
        addContact(nome, email, tel)
    })   
}
// Validando campos
function validateInput(tel){
    const regexTel = /^\([1-9]{2}\)\s9[0-9]{4}\-[0-9]{4}$/
    return regexTel.test(tel)
}

//Validando campo de email
function validateInputEmail(email){
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regexEmail.test(email)
}

// Verificando se os campos estão vazios
function checkFields(){
    const fields = Array.from(arguments)
    return fields.some(field => field === "")
}

//Criando cards de notificação
function cardErrorNotification(){
    let cardError = document.querySelector('.alert-danger')
    
    //Remove a notificação e garante que apenas uma seja exibida por vez.
    if(cardError){
        cardError.remove()
    }
    let card = document.createElement('span')
    let form = document.getElementById('formContact')
    let textCardAlert = document.createTextNode('Todos os campos devem ser preenchidos!')
    card.setAttribute('class', 'alert alert-danger')

    card.appendChild(textCardAlert)
    form.appendChild(card)

    // Criando botão de fechar o card
    let btnCloseCard = document.createElement('button')
    btnCloseCard.classList.add('btn-close')
    card.appendChild(btnCloseCard)
    card.style.display = 'flex'
    card.style.justifyContent = 'space-between'

    //Fecha o card quando clica no botão de fechar(X)
    btnCloseCard.addEventListener('click', () =>{
        card.remove()
    })
}

//Criando card de confirmação da criação do contato
function cardSuccessInsert() {
    let form = document.getElementById('formContact')
    let card = document.createElement('span')
    let textSuccess = document.createTextNode('O contato foi adicionado!')
    card.setAttribute('class', 'alert alert-success')
    
    card.appendChild(textSuccess)
    form.appendChild(card)
}

const removeCards = function(){
    let cards = document.querySelectorAll('span')
    cards.forEach(
        card => card.remove()
    )
}

function addContact(nome, email, tel){
    contact.push({nome, email, tel})
    saveContactStorage(contact)
    createRow(nome, email, tel)
    limparCampos()
}

function createRow(nome, email, tel){
    const tbAdd = document.getElementById('tb-contact')
    let newRow = document.createElement('tr')
    let textElem = ''

    let tdName = document.createElement('td')
    textElem = document.createTextNode(nome)
    tdName.appendChild(textElem)
    newRow.appendChild(tdName)
    tbAdd.appendChild(newRow)

    let tdEmail = document.createElement('td')
    textElem = document.createTextNode(email)
    tdEmail.appendChild(textElem)
    newRow.appendChild(tdEmail)
    tbAdd.appendChild(newRow)

    let tdCel = document.createElement('td')
    textElem = document.createTextNode(tel)
    tdCel.appendChild(textElem)
    newRow.appendChild(tdCel)
    tbAdd.appendChild(newRow)

    limparCampos()

    // Criando botão de exclusão
    let tdRemove = document.createElement('td')
    let btnRemove = document.createElement('button')
    btnRemove.classList.add('btn', 'btn-danger')
    btnRemove.innerHTML = '<i class="bi bi-trash3-fill"></i>'
    newRow.appendChild(tdRemove)
    tdRemove.appendChild(btnRemove)

    btnRemove.addEventListener('click', (Event) => {
        const rowRemoved = Event.target.closest('tr')
        rowRemoved.remove()
    })
}
//Limpando valores
function limparCampos(){
    document.getElementById('contactName').value = ''
    document.getElementById('emailContact').value = ''
    document.getElementById('telContact').value = ''
}

contactHandler(bttnAdd, form)

// localStorage
document.addEventListener('DOMContentLoaded', () => {
    contact = loadStorage()
    updateTable()
})

function saveContactStorage(contact){
    localStorage.setItem('contact', JSON.stringify(contact))
}
function loadStorage() {
    let contact = localStorage.getItem('contact')
    return contact ? JSON.parse(contact) : []
}
function updateTable(){
    let contact = loadStorage()
    let tbodyStorage = document.querySelector('tbody')
    tbodyStorage.innerHTML = ""
    contact.forEach(contato => {
        createRow(contato.nome, contato.email, contato.tel)
    })
}
