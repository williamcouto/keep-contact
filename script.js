let bttnAdd = document.querySelector('.btn')
let bttnRemove = document.querySelector('.btn-danger')
let form = document.getElementById('formContact')

form.addEventListener('submit', (Event) => {
    Event.preventDefault()
})

bttnAdd.addEventListener('click', () => {
    let textElem = ''
    let nome = document.getElementById('contactName').value
    let email = document.getElementById('emailContact').value
    let tel = document.getElementById('telContact').value
    let idCount = 1
    let tbAdd = document.getElementById('tb-contact')

    //Cria uma linha e celula
    let newRow = document.createElement('tr')
    let td_Name = document.createElement('td')

    newRow.appendChild(td_Name)
    textElem = document.createTextNode(nome)

    td_Name.appendChild(textElem)
    tbAdd.appendChild(newRow)
    

    // Apagando valores do input
    document.getElementById('contactName').value = ''
    document.getElementById('emailContact').value = ''
    document.getElementById('telContact').value = ''

    newRow.innerHTML = `    
        <td>${idCount++}</td>
        <td>${nome}</td>
        <td>${email}</td>
        <td>${tel}</td>
        <td><input type="checkbox" class="select-remove"></input></td>
    `
})
    
