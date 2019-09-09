import React from 'react'
import { Button, Form, Input, Select, FormField, Icon, Label } from 'semantic-ui-react'
import './css/Styles.css';
import InputMask from 'react-input-mask';
import Endereco from './Endereco';
import axios from 'axios';
import { Redirect } from 'react-router';

const options = [
  { key: 'm', text: 'Masculino', value: 'Masculino' },
  { key: 'f', text: 'Feminino', value: 'Feminino' },
  { key: 'n', text: 'Não Binário', value: 'Não Binário' },
]

class Cadastro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      sexo: "Masculino",
      telefone: "",
      celular: "",
      email: "",
      dtnasc: "",
      cpf: "",
      rg: "",
      nomeErro: false,
      sexoErro: false,
      telefoneErro: false,
      celularErro: false,
      emailErro: false,
      dtnascErro: false,
      cpfErro: false,
      rgErro: false,
      formErro: false,
      redirect: false
    }
  }

  validaForm() {

    //Valida o nome inserido
    if (this.state.nome === "") {

      this.setState({
        nomeErro: true,
        formErro: true
      });

    } else {

      this.setState({
        nomeErro: false,
        formErro: false
      });

    }

    //Valida o email inserido
    if (this.state.email === "") {

      this.setState({
        emailErro: true,
        formErro: true
      });

    } else {

      this.setState({
        emailErro: false,
        formErro: false
      });

    }

    //Valida o telefone inserido
    if (this.state.telefone === "") {

      this.setState({
        telefoneErro: true,
        formErro: true
      });

    } else {

      this.setState({
        telefoneErro: false,
        formErro: false
      });

    }

    //Valida o celular inserido
    if (this.state.celular === "") {

      this.setState({
        celularErro: true,
        formErro: true
      });

    } else {

      this.setState({
        celularErro: false,
        formErro: false
      });

    }

    //Valida a data de nascimento inserido
    if (this.state.dtnasc === "") {

      this.setState({
        dtnascErro: true,
        formErro: true
      });

    } else {

      this.setState({
        dtnascErro: false,
        formErro: false
      });

    }

    //Valida o cpf inserido
    if (this.state.cpf === "") {

      this.setState({
        cpfErro: true,
        formErro: true
      });

    } else {

      this.setState({
        cpfErro: false,
        formErro: false
      });

    }

    //Valida o RG inserido
    if (this.state.rg === "") {

      this.setState({
        rgErro: true,
        formErro: true
      });

    } else {

      this.setState({
        rgErro: false,
        formErro: false
      });

    }

    if (this.state.formErro) {
      return false;
    } else {
      return true;
    }

  }

  handleSubmit() {

    if (this.validaForm()) {

      const cliente = {
        nome: this.state.nome,
        sexo: this.state.sexo,
        telefone: this.state.telefone,
        celular: this.state.celular,
        email: this.state.email,
        dtnasc: this.state.dtnasc,
        cpf: this.state.cpf,
        rg: this.state.rg,
        enderecos: []
      }

      const url = 'http://localhost:8000/clientes/';

      axios.post(
        url, cliente,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      )
        .then(
          () => {
            this.setState({redirect : true});
          },
          (error) => {
            this.setState({ error });
          }
        )
    }

  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to='/lista' /> : null}
        <div className="box">
          <label className="titulo"> Dados do Cliente </label>
          <hr />
          <Form>
            <Form.Group>
              <Form.Field style={{ width: "100%" }}>
                <label>Nome</label>
                <Input name="nome" fluid placeholder='Ex: Adriano Silva'
                  onChange={event => this.setState({ nome: event.target.value })} />
                {this.state.nomeErro ? <Label pointing prompt>
                  Nome Inválido
                </Label> : null}
              </Form.Field>
              <Form.Field
                control={Select}
                label='Sexo'
                options={options}
                placeholder='Selecione'
                name="sexo"
                onChange={event => this.setState({ sexo: event.target.textContent })}
                defaultValue='Masculino'
              />
              {this.state.sexoErro ? <Label pointing prompt>
                Informe o sexo
                </Label> : null}
            </Form.Group>
            <Form.Group widths='equal'>
              <FormField>
                <label>Email</label>
                <input name="email" fluid placeholder='email@email.com'
                  onChange={event => this.setState({ email: event.target.value })} />
                {this.state.emailErro ? <Label pointing prompt>
                  Email Inválido
                </Label> : null}
              </FormField>
              <FormField>
                <label>Celular</label>
                <InputMask name="celular" mask="(99) 99999-9999" placeholder="(99) 99999-9999"
                  onChange={event => this.setState({ celular: event.target.value })} />
                {this.state.celularErro ? <Label pointing prompt>
                  Celular Inválido
                </Label> : null}
              </FormField>
              <FormField>
                <label>Telefone Residencial</label>
                <InputMask name="telefone" mask="(99) 9999-9999" placeholder="(99) 9999-9999"
                  onChange={event => this.setState({ telefone: event.target.value })} />
                {this.state.telefoneErro ? <Label pointing prompt>
                  Telefone Inválido
                </Label> : null}
              </FormField>
            </Form.Group>
            <Form.Group widths='equal'>
              <FormField>
                <label>Data de Nascimento</label>
                <InputMask name="dtnasc" mask="99/99/9999" placeholder="DD / MM / AAAA"
                  onChange={event => this.setState({ dtnasc: event.target.value })} />
                {this.state.dtnascErro ? <Label pointing prompt>
                  Data Inválida
                </Label> : null}
              </FormField>
              <FormField>
                <label>RG</label>
                <InputMask name="rg" mask="99.999.999-9" placeholder="99.999.999-9"
                  onChange={event => this.setState({ rg: event.target.value })} />
                {this.state.rgErro ? <Label pointing prompt>
                  RG Inválido
                </Label> : null}
              </FormField>
              <FormField>
                <label>CPF</label>
                <InputMask name="cpf" mask="999.999.999-99" placeholder="999.999.999-99"
                  onChange={event => this.setState({ cpf: event.target.value })} />
                {this.state.cpfErro ? <Label pointing prompt>
                  CPF Inválido
                </Label> : null}
              </FormField>
            </Form.Group>
          </Form>
        </div>
        <Endereco />
        <div className="endPage">
          <Button color="green" animated='fade' type="submit" onClick={() => this.handleSubmit()}>
            <Button.Content visible>Salvar</Button.Content>
            <Button.Content hidden>
              <Icon name='save' />
            </Button.Content>
          </Button>
        </div>
      </div>
    )
  }
}

export default Cadastro