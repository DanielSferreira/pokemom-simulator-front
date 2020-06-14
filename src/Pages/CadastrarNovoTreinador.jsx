import React, { useState } from 'react'
import axios from 'axios';

const CadastrarPokemomParaTreinador = (props) => {

    const [nomeTreinadorState, setNome_treinador] = useState('')
    const [regiaoState, setRegiao] = useState('')
    const [id_de_treinadorState, setId_de_treinador] = useState('')
    
    const form = {
        nome_treinador: '0',
        regiao: '0',
        id_de_treinador: 0
    }

    function setForm() {
        form.nome_treinador = nomeTreinadorState
        form.regiao = regiaoState
        form.id_de_treinador = Number(id_de_treinadorState)
        console.log(form)
        postForm(form)
    }

    function postForm(sendForm) {
        
        console.log(sendForm)
        axios.post('http://localhost:5000/treinador/novo',sendForm)
        .then(function (response) {
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    return (
        <div>
            <h3>Cadastrar novo treinador</h3>
            <input type="text" onChange={(e)=>setNome_treinador(e.target.value)} name="nome_treinador" id="nome_treinador" placeholder="Nome do Treinador" />
            <input type="text" onChange={(e)=>setRegiao(e.target.value)} name="regiao" id="regiao" placeholder="Região do Treinador" />
            <input type="text" onChange={(e)=>setId_de_treinador(e.target.value)} name="id_de_treinado" id="id_de_treinado" placeholder="numero do Treinador" />
            <input type="button" value="Enviar" onClick={setForm} />
        </div>
    )
}

export default CadastrarPokemomParaTreinador