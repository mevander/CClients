import React from 'react'
import { Table, Button, Icon, Confirm } from 'semantic-ui-react'
import './css/Styles.css';
import axios from 'axios';

class Lista extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error: null,
            idCliente: 0,
            clientes: []
        }
    }

    show = () => this.setState({ open: true })
    handleCancel = () => this.setState({ open: false })

    handleConfirm() {
        const clientes = this.state.clientes;
        const url = `http://localhost:8000/clientes/${this.state.idCliente}/`;

        axios.delete(
            url,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        )
            .then(
                () => {
                    this.setState({
                        clientes: clientes.filter(cliente => cliente.id !== this.state.idCliente)
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:8000/clientes';

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        clientes: result
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    render() {
        const { error, clientes } = this.state;

        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            return (
                <div className="box">
                    <Table color={"teal"} key={"teal"}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign={"center"}>#ID</Table.HeaderCell>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell textAlign={"center"}>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {clientes.map(cliente => (
                                <Table.Row>
                                    <Table.Cell textAlign={"center"}>{cliente.id}</Table.Cell>
                                    <Table.Cell>{cliente.nome}</Table.Cell>
                                    <Table.Cell>{cliente.email}</Table.Cell>
                                    <Table.Cell textAlign={"center"}>
                                        <Button.Group>
                                            <Button animated='fade' color="teal">
                                                <Button.Content visible>Alterar</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='pencil' />
                                                </Button.Content>
                                            </Button>
                                            <Button.Or text="ou" />
                                            <Button animated='fade' color="red" onClick={() => {
                                                this.show();
                                                this.setState({ idCliente: cliente.id });
                                            }}>
                                                <Button.Content visible>Excluir</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='trash' />
                                                </Button.Content>
                                            </Button>
                                            <Confirm
                                                open={this.state.open}
                                                content='Tem certeza que deseja excluir este contato e seus endereços?'
                                                cancelButton='Não'
                                                confirmButton="Sim"
                                                onCancel={this.handleCancel}
                                                onConfirm={() => {
                                                    this.setState({ open: false });
                                                    this.handleConfirm();
                                                }}
                                            />
                                        </Button.Group>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            )
        }
    }
}

export default Lista