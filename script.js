let bttnAdd = document.querySelector('.btn')
let form = document.getElementById('formContact')
let idCount = 1

form.addEventListener('submit', (Event) => {
    Event.preventDefault()
})

bttnAdd.addEventListener('click', () => {
    let textElem = ''
    let nome = document.getElementById('contactName').value
    let email = document.getElementById('emailContact').value
    let tel = document.getElementById('telContact').value
    const tbAdd = document.getElementById('tb-contact')

    //Cria uma linha e celula
    let newRow = document.createElement('tr')
    let td_Name = document.createElement('td')

    newRow.appendChild(td_Name)
    textElem = document.createTextNode(nome)

    td_Name.appendChild(textElem)
    tbAdd.appendChild(newRow)
    
    limparCampos()

    newRow.innerHTML = `    
        <td>${idCount++}</td>
        <td>${nome}</td>
        <td>${email}</td>
        <td>${tel}</td>
        <td>
        <button class="btn btn-danger">Remover</button>
        </td>` 

    newRow.querySelector('.btn-danger').addEventListener('click', (Event) => {
        const rowRemoved = Event.target.closest('tr')
        rowRemoved.remove()
    })

    // Apagando valores do input
    function limparCampos(){
    document.getElementById('contactName').value = ''
    document.getElementById('emailContact').value = ''
    document.getElementById('telContact').value = ''
    }  
})
