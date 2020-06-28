import React, { useReducer } from 'react'

function  estrutura(pessoa,paylaod){
    console.log(paylaod.nome)
    return paylaod
}

const TesteUseReducer = ()=> {
    const [pessoa, dispatch] = useReducer(estrutura,'')
   function setarNome(name,age) {
       console.log(pessoa);
       
    dispatch({
        nome: name,
        idade: age
    })
   }
    return (
        <h3>
            <button className="btn btn-primary mb-2" onClick={()=>setarNome('Daniel S Ferreira', '24')}>Setar</button>
            Agora vai! {pessoa.nome} e tenho {pessoa.idade} 
        </h3>
    )
}
export default TesteUseReducer