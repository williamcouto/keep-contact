let bttnAdd = document.querySelector('.btn')
let form = document.getElementById('formContact')
let idCount = 1

function contactHandler(bttnAdd, form){
    form.addEventListener('submit', (Event) => Event.preventDefault())
    bttnAdd.addEventListener('click', () => {
        let nome = document.getElementById('contactName').value
        let email = document.getElementById('emailContact').value
        let tel = document.getElementById('telContact').value
        const validTel = validateInput(tel)

        if(checkFields(nome, email, tel)){
            //window.alert('Todos os campos devem ser preenchidos!')
            cardNotifications()
                return;
        }

        if(!validTel){
            window.alert('O número de celular é inválido')
                return;
        }
        addContact(nome, email, tel) 
    })   
}
// Validando campos
function validateInput(tel, email){
    const regexTel = /^\([1-9]{2}\)\s9[0-9]{4}\-[0-9]{4}$/
    return regexTel.test(tel)
}

// Verificando se os campos estão vazios
function checkFields(){
    const fields = Array.from(arguments)
    return fields.some(field => field === "")
}

//Criando cards de notificação
function cardNotifications(){
    let card = document.createElement('span')
    let form = document.getElementById('formContact')

    let textCardAlert = document.createTextNode('Todos os campos devem ser preenchidos!')
    card.setAttribute('class', 'alert alert-danger')

    
    card.appendChild(textCardAlert)
    form.appendChild(card)

    // Criando botão de fechar aviso
    let btnCloseCard = document.createElement('button')
    btnCloseCard.classList.add('btn-close')
    card.appendChild(btnCloseCard)
    card.style.display = 'flex'
    card.style.justifyContent = 'space-between'

}

function addContact(nome, email, tel){
    createRow(nome, email, tel)
    limparCampos()
}

function createRow(nome, email, tel){
    const tbAdd = document.getElementById('tb-contact')
    let newRow = document.createElement('tr')
    let textElem = ''
    let idCount = Date.now()

    let tdID = document.createElement('td')
    textElem = document.createTextNode(idCount)
    tdID.appendChild(textElem)
    newRow.appendChild(tdID)

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