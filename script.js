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
        if(!validTel){
            window.alert('Número de celular inválido')
        }
        else{
            addContact(nome, email, tel) 
        }

    }) 
}
// Validando campos
function validateInput(tel, email){
    const regexTel = /^\([1-9]{2}\)\s9[0-9]{4}\-[0-9]{4}$/
    return regexTel.test(tel)
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