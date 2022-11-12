const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

//Criar os LI do HTML, usarei na função criaTarefa()
function criaLi(){
const li = document.createElement('li')
return li
}
//função que será criado para criar as tarefas
function criaTarefa(textoInput) {
   const li = criaLi();
   li.innerText = textoInput;
   tarefas.appendChild(li);
   criaBotãoApagar (li)
   salvaTarefa();
}
// escuto evento de click em BtnTarefa verifico se está vazio
// se não estiver vazio, chamo a função criaTarefa
// já passando pra função o valor que ela deve usar 
//através do !value do input tarefa
btnTarefa.addEventListener('click', function(e)  {
   if (!inputTarefa.value) return;
   criaTarefa(inputTarefa.value);
   limpaInput();
});
// PERMITO ADICIONAR TAREFA COM ENTER
inputTarefa.addEventListener('keypress', function(e) {
   if (e.keyCode == 13) {
      criaTarefa(inputTarefa.value);
      limpaInput();
   };
});
//LIMPANDO INPUT E COLOCANDO FOCO
function limpaInput() {
   inputTarefa.value = '';
   inputTarefa.focus();
}
//CRIANDO BOTÃO DE DELETE ao lado dos LIs
function criaBotãoApagar (li){
   li.innerText += ' ';
   const botaoApagar = document.createElement('button');
   botaoApagar.innerText = 'Apagar';
   botaoApagar.setAttribute('class','delete')
   li.appendChild(botaoApagar);
}
//escutando no documento se o botao de classe delete foi apertado
document.addEventListener('click', function(e) {
   const el = e.target;
   if (el.classList.contains('delete')) {
      el.parentElement.remove();
      salvaTarefa();
   }
});
//Salvando tarefas, stringfy transforma array para caracteres
//local storage salva no 'banco' do navegador com o setItem 
function salvaTarefa(){
   const liTarefas = tarefas.querySelectorAll ('li');
   const listaDeTarefas = [];
   for (let tarefa of liTarefas) {
      let tarefaTexto = tarefa.innerText;
      tarefaTexto = tarefaTexto.replace('Apagar', '').trim();   
      listaDeTarefas.push(tarefaTexto);
   }
   const tarefasJSON = JSON.stringify(listaDeTarefas);
   localStorage.setItem('tarefas', tarefasJSON);
}
//recuperaTarefas usando o get item e setando com parse as tarefas de json 
// para um array
function recuperaTarefas(){
   const tarefas = localStorage.getItem('tarefas');
   const listaDeTarefas = JSON.parse(tarefas); 
   for (let tarefa of listaDeTarefas) {
      criaTarefa(tarefa)
   }
}
recuperaTarefas();
