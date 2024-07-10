import { database } from './firebaseConfig.js'
import { ref, set, get, onValue, update, remove } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js'

document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.querySelector('.form-cadastro')
    const inputNome = document.querySelector('.input-nome')
    const inputContato = document.querySelector('.input-contato')
    const inputDataNascimento = document.querySelector('.input-data-nascimento')
    const inputGenero = document.querySelector('.input-genero')
    const selectParentesco = document.querySelector('.select-parentesco')
    const selectDependente = document.querySelector('.select-dependente')
    const listaUsuarios = document.querySelector('.lista-usuarios')

    // if (!formCadastro || !inputNome || !inputContato || !inputDataNascimento || !inputGenero || !selectParentesco || !selectDependente || !listaUsuarios) {
    //     console.error('Um ou mais elementos do DOM não foram encontrados.')
    //     return
    // }

    const cadastroRef = ref(database, 'cadastro')

    const formatoData = (data) => {
        const [ano, mes, dia] = data.split('-')
        return `${dia}/${mes}/${ano}`
    }

    const cadastro = (userId, nome, telefone, nascimento, sexo, parentesco, dependente) => {
        return set(ref(database, `cadastro/${userId}`), {
            nome,
            telefone,
            nascimento,
            sexo,
            parentesco,
            dependente
        })
    }

    const editarCadastro = (userId, nome, telefone, nascimento, sexo, parentesco, dependente) => {
        return update(ref(database, `cadastro/${userId}`), {
            nome,
            telefone,
            nascimento,
            sexo,
            parentesco,
            dependente
        })
    }

    const excluirCadastro = (userId) => {
        return remove(ref(database, `cadastro/${userId}`))
    }

    const listarUsuarios = () => {
        get(cadastroRef).then((snapshot) => {
            if (snapshot.exists()) {
                const usuarios = snapshot.val()
                listaUsuarios.innerHTML = ''
                Object.keys(usuarios).forEach((userId) => {
                    const usuario = usuarios[userId]
                    const li = document.createElement('li')
                    li.innerHTML = `Nome: ${usuario.nome} <br> 
                    Contato: ${usuario.telefone} <br> 
                    Nascimento: ${usuario.nascimento} <br> 
                    Gênero: ${usuario.sexo} <br> 
                    Parentesco: ${usuario.parentesco}
                    <br/>
                    <button class="editar" data-id="${userId}">Editar</button>
                    <button class="excluir" data-id="${userId}">Excluir</button>
                    <hr/>`
                    listaUsuarios.appendChild(li)
                })

                document.querySelectorAll('.editar').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const userId = e.target.getAttribute('data-id')
                        const usuario = usuarios[userId]

                        if (!usuario) {
                            console.error('Usuário não encontrado:', userId)
                            return
                        }

                        if(inputNome)inputNome.value = usuario.nome || ''
                        if(inputContato)inputContato.value = usuario.telefone || ''
                        if(inputDataNascimento)inputDataNascimento.value = usuario.nascimento ? usuario.nascimento.split('/').reverse().join('-') : ''
                        if(inputGenero)inputGenero.value = usuario.sexo || ''
                        if(selectParentesco)selectParentesco.value = usuario.parentesco || ''
                        if(selectDependente)selectDependente.value = usuario.dependente || ''

                        const submitHandler = (e) => {
                            e.preventDefault()
                            editarCadastro(userId, inputNome.value, inputContato.value, formatoData(inputDataNascimento.value), inputGenero.value, selectParentesco.value, selectDependente.value)
                                .then(() => {
                                    alert('Usuário atualizado com sucesso')
                                    formCadastro.reset()
                                    listarUsuarios() // Recarrega a lista de usuários após atualização
                                    formCadastro.removeEventListener('submit', submitHandler)
                                })
                                .catch((error) => {
                                    console.error('Erro ao atualizar usuário:', error)
                                })
                        }

                        if(formCadastro)formCadastro.addEventListener('submit', submitHandler, { once: true })
                    })
                })

                document.querySelectorAll('.excluir').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const userId = e.target.getAttribute('data-id')
                        excluirCadastro(userId)
                        confirm('Deseja realmente excluir o cadastro?')
                            .then(() => {
                                listarUsuarios() 
                            })
                            .catch((error) => {
                                console.error('Erro ao excluir usuário:', error)
                            })
                    })
                })
            } else {
                listaUsuarios.innerHTML = '<li>Nenhum usuário encontrado.</li>'
            }
        }).catch((error) => {
            console.error('Erro ao listar usuários:', error)
        })
    }

    onValue(cadastroRef, listarUsuarios)

    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault()

            const userId = new Date().getTime().toString()
            const nome = inputNome.value
            const contato = inputContato.value
            const dataNascimento = formatoData(inputDataNascimento.value)
            const genero = inputGenero.value
            const parentesco = selectParentesco.value
            const dependente = selectDependente.value

            cadastro(userId, nome, contato, dataNascimento, genero, parentesco, dependente)
                .then(() => {
                    alert('Usuário cadastrado com sucesso')
                    formCadastro.reset()
                    listarUsuarios() // Recarrega a lista de usuários após cadastro
                })
                .catch((error) => {
                    console.error('Erro ao cadastrar usuário:', error)
                })
        })
    }
})
