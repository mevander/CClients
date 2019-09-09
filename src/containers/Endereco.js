import React from 'react'
import { Button, Form, FormField } from 'semantic-ui-react'
import './css/Styles.css';
import InputMask from 'react-input-mask';
import axios from 'axios';

class Endereco extends React.Component {
  state = {
    visible: false,
    rua: "",
    bairro: "",
    cidade: "",
    uf: "",
    numero: "",
    cep: "",
    disabled: false
  }

  //Fução que carrega o CEP via API
  carregacep(cep) {

    if (cep.length === 9) {

      //desabilita os inputs para ter uma visualização gráfica que um evento está ocorrendo
      this.setState({ disabled: true });

      //realiza chamada do endpoint passando o cep preenchido
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)

        //Com o resultado realiza as seguintes operações
        .then(res => {

          //Salva o json de responsta na constante
          const result = res.data;

          //Caso dê algum erro na chamada, reabilita os campos, e limpa os estados que guardam a informação do endereço
          if (result.erro === true) {
            this.rua.value = "";
            this.bairro.value = "";
            this.cidade.value = "";
            this.uf.value = "";
          }
          //Senão existir o campo erro significa que o endpoint retornou os dados do cep
          else {
            this.rua.value = result.logradouro;
            this.bairro.value = result.bairro;
            this.cidade.value = result.localidade;
            this.uf.value = result.uf;
          }

          //Reabilita os campos para o usuário
          this.setState({ disabled: false });
        })

    }
  }

  render() {
    return (
      <div>
        <div className="box">
          <label className="titulo"> Dados do Endereço </label>
          <hr />
          <Form>
            <Form.Group>
              <Form.Field>
                <label>CEP</label>
              <InputMask mask="99999-999" name="cep" fluid placeholder='00000-000'
               onBlur={event => this.carregacep(event.target.value)} onChange={event =>  this.setState({cep : event.target.value})}/>
              </Form.Field>
              <FormField style={{ width: "125px" }} max={5}>
                <label>Número</label>
                <input fluid type="text" name="numero" maxLength="5" disabled={this.state.disabled}
                placeholder='000' ref={(input) => { this.numero = input; }} onChange={event =>  this.setState({numero : event.target.value})}/>
              </FormField>
              <Form.Field style={{ width: "100%" }}>
                <label>Rua</label>
                <input name="rua" fluid placeholder='Alameda Costa' disabled={this.state.disabled}
                 ref={(input) => { this.rua = input; }} onChange={event =>  this.setState({rua : event.target.value})}/>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <FormField>
                <label>Bairro</label>
                <input name="bairro" placeholder="Parque das Nações" disabled={this.state.disabled}
                 ref={(input) => { this.bairro = input; }} onChange={event =>  this.setState({bairro : event.target.value})}/>
              </FormField>
              <FormField>
                <label>Cidade</label>
                <input name="Cidade" placeholder="Limeira" disabled={this.state.disabled}
                 ref={(input) => { this.cidade = input; }} onChange={event =>  this.setState({cidade : event.target.value})}/>
              </FormField>
              <FormField>
                <label>UF</label>
                <input name="uf" maxLength="2" placeholder="SP" disabled={this.state.disabled} 
                ref={(input) => { this.uf = input; }} onChange={event =>  this.setState({uf : event.target.value})}/>
              </FormField>
            </Form.Group>
          </Form>
          {this.state.visible ? null : <Button secondary
           onClick={() => this.setState({ visible: true })}>Adicionar outro endereço
           </Button>}
        </div>
        {this.state.visible ? <Endereco /> : null}
      </div>
    )
  }

}

export default Endereco