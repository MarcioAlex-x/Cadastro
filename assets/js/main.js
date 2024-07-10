document.addEventListener('DOMContentLoaded', () => {
    const selectParentesco = document.getElementById('select-parentesco')
    const selectDependente = document.getElementById('select-dependente')
    const parentesco = document.getElementById('parentesco')
    const dependente = document.getElementById('dependente')
    
    const checkParentesco = () => {
        if (selectParentesco.value === 'dependente') {
            dependente.classList.remove('hide')
        } else {
            dependente.classList.add('hide')
        }
    }

    checkParentesco()

    selectParentesco.addEventListener('change',checkParentesco)
})
