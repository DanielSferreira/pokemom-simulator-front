import React, { useState } from 'react'
import ListaPokemom from "./../Componentes/ListaPokemom";
import ListaTreinador from "./../Componentes/ListaTreinador";
import axios from 'axios';

const CadastrarPokemomParaTreinador = (props) => {

    const [pokemom, setPokemom] = useState('')
    const [treinador, setTreinador] = useState('')
    const [alert, setAlert] = useState('')
    
    function Pokemom(v) {
        let data = v.split(';')
        setPokemom(data)
        console.log(pokemom);
    }

    function Treinador(v) {
        let data = v.split(';')
        setTreinador(data)
        console.log('treinador');
        console.log(treinador);
    }

    const form = {
        id_pokedex: 0,
        pokemom_nome: '',
        id_treinador: 0,
        nivel_pokemom: 0
    }

    function setForm() {
        form.id_pokedex = Number(pokemom[0])
        form.pokemom_nome = pokemom[1]
        form.id_treinador = Number(treinador[0])
        form.nivel_pokemom = 1
        console.log(form)
        postForm(form)
    }

    function postForm(sendForm) {
        
        console.log(sendForm)
        axios.post('http://localhost:5000/pokemom/setPokemomForTrainer/',sendForm)
        .then(function (response) {
            console.log(response.data)
            if (response.data.status === 'ok') {
                setAlert(<div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Sucesso!</strong> Seu Pokemom foi cadastrado com Sucesso.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>)
            }
            else {
                setAlert(<div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Eita!</strong> Deu ruim ao cadatrar, provavelmente esse pokemom já tenha sido cadastrado.
                <button type="button" onClick={fecha()} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>)
            }
          })
          .catch(function (error) {
            console.log(error);
            setAlert(<div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Eita!</strong> Deu ruim ao cadatrar, provavelmente esse pokemom já tenha sido cadastrado.
                <button type="button" onClick={fecha()} className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>)
          })
    }
    function fecha() {
        setAlert("")
    }
    return (
        <div>
            <h3>Cadastrar novo Pokemom para um treinador</h3>
            <ListaTreinador onChange={Treinador} />
            <ListaPokemom onChange={Pokemom} />
            <input type="button" className="btn btn-primary mb-2" value="Enviar" onClick={setForm} />
            {alert}
        </div>
    )
}

export default CadastrarPokemomParaTreinador