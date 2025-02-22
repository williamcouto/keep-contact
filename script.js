
//     newRow.innerHTML = `    
//         <td>${idCount++}</td>
//         <td>${nome}</td>
//         <td>${email}</td>
//         <td>${tel}</td>
//         <td>
//         <button class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
//         </td>` 
// })

let bttnAdd = document.querySelector('.btn')
let form = document.getElementById('formContact')
let idCount = 1

function contactHandler(bttnAdd, form){
    form.addEventListener('submit', (Event) => Event.preventDefault())

    bttnAdd.addEventListener('click', () => {
        let nome = document.getElementById('contactName').value
        let email = document.getElementById('emailContact').value
        let tel = document.getElementById('telContact').value

        addContact(nome, email, tel)
    })

    
}

//Criar função Adicionar Contato
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

        // newRow.querySelector('.btn-danger').addEventListener('click', (Event) => {
        //     const rowRemoved = Event.target.closest('tr')
        //     rowRemoved.remove()
        // })
}

//Limpando valores
function limparCampos(){
    document.getElementById('contactName').value = ''
    document.getElementById('emailContact').value = ''
    document.getElementById('telContact').value = ''
}

contactHandler(bttnAdd, form, idCount)