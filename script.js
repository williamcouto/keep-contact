let bttnAdd = document.querySelector('.btn')
let form = document.getElementById('formContact')
let contact = []

function contactHandler(bttnAdd, form) {
    form.addEventListener('submit', (Event) => Event.preventDefault())
    bttnAdd.addEventListener('click', () => {
        let nome = document.getElementById('contactName').value
        let email = document.getElementById('emailContact').value
        let tel = document.getElementById('telContact').value

        if (checkFields(nome, email, tel)) {
            cardErrorNotification()
            return;
        }

        const validTel = validateInput(tel)
        const validEmail = validateInputEmail(email)

        if (!validTel) {
            window.alert('O número de celular é inválido')
            return;
        }
        if (!validEmail) {
            window.alert('O email inserido é inválido')
            return;
        }
        cardSuccessInsert()
        setTimeout(removeCards, 1000)
        addContact(nome, email, tel)
    })
}
// Validando campos
function validateInput(tel) {
    const regexTel = /^\([1-9]{2}\)\s9[0-9]{4}\-[0-9]{4}$/
    return regexTel.test(tel)
}

//Validando campo de email
function validateInputEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regexEmail.test(email)
}

// Verificando se os campos estão vazios
function checkFields() {
    const fields = Array.from(arguments)
    return fields.some(field => field === "")
}

//Criando cards de notificação
function cardErrorNotification() {
    let cardError = document.querySelector('.alert-danger')

    //Garante que apenas uma seja exibida por vez.
    if (cardError) {
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
    btnCloseCard.addEventListener('click', () => {
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

const removeCards = function () {
    let cards = document.querySelectorAll('span')
    cards.forEach(
        card => card.remove()
    )
}

function addContact(nome, email, tel) {
    contact.push({ nome, email, tel })
    saveContactStorage(contact)
    createRow(nome, email, tel)
    limparCampos()
}

function createRow(nome, email, tel) {
    const cardSect = document.querySelector('.card-container')
    let textElem = ''
    let cardUser = document.createElement('div')
    cardUser.setAttribute('class', 'card')

    let cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')

    cardSect.appendChild(cardUser)//Insere 
    cardSect.appendChild(cardBody)
    cardUser.appendChild(cardBody)

    //Criando labels do card
    let nameContactUser = document.createElement('h5')
    nameContactUser.setAttribute('class', 'card-title')
    textElem = document.createTextNode(nome)
    nameContactUser.appendChild(textElem)
    cardBody.appendChild(nameContactUser)

    let emailContactUser = document.createElement('p')
    emailContactUser.setAttribute('class', 'card-text')
    textElem = document.createTextNode(email)
    emailContactUser.appendChild(textElem)
    cardBody.appendChild(emailContactUser)

    // adicionando o telefone
    let telContactUser = document.createElement('p')
    telContactUser.setAttribute('class', 'card-text')
    textElem = document.createTextNode(tel)
    telContactUser.appendChild(textElem)
    cardBody.appendChild(telContactUser)

    limparCampos()

    // Criando botão de exclusão
    let btnRemove = document.createElement('button')
    btnRemove.classList.add('btn', 'btn-danger')
    btnRemove.innerHTML = '<i class="bi bi-trash3-fill"></i>'
    cardBody.appendChild(btnRemove)

    btnRemove.addEventListener('click', () => {
        cardBody.remove()
        removeContato(nome, email, tel)
    })
}
//Limpando valores
function limparCampos() {
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

function saveContactStorage(contact) {
    localStorage.setItem('contact', JSON.stringify(contact))
}
function loadStorage() {
    let contact = localStorage.getItem('contact')
    return contact ? JSON.parse(contact) : []
}
function updateTable() {
    let contact = loadStorage()
    let tbodyStorage = document.querySelector('tbody')
    tbodyStorage.innerHTML = ""
    contact.forEach(contato => {
        createRow(contato.nome, contato.email, contato.tel)
    })
}
function removeContato(nome, email, tel) {
    contact = contact.filter(contato => !(contato.nome === nome && contato.email === email && contato.tel === tel))
    saveContactStorage(contact)
}
