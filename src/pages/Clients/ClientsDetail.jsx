import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Button,
    Label,
    Input,
    Container,
    FormFeedback,
    Form,
} from "reactstrap";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { FormInput } from "../../components/FormInputs/Input";
import { useMount } from "react-use";
import { useHistory, useParams } from "react-router-dom";
import { get, patch, post } from "../../helpers/axiosClient";
import useStore from "../../helpers/store";

const NewClient = () => {
    const { id } = useParams();
    const history = useHistory();
    const [isEdit, setIsEdit] = useState(false);
    const { getEmpresas } = useStore();

    useMount(async () => {
        if (!id) return;
        setIsEdit(true);
        const data = await get(`/empresas/${id}`);
        validation.setFieldValue("nombre", data.nombre);
        validation.setFieldValue("descripcion", data.descripcion);
        validation.setFieldValue("ruc", data.ruc);
        validation.setFieldValue("telefono", data.telefono);
    }, [id]);

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            nombre: "",
            descripcion: "",
            telefono: "",
            ruc: "",
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required(
                "Por favor ingresa el nombre del cliente"
            ),
            descripcion: Yup.string().required(
                "Por favor ingresa una descripcion"
            ),
            telefono: Yup.string().required(
                "Por favor ingresa un numero de telefono valido"
            ),
            ruc: Yup.string().required(
                "Por favor ingresa un numero ruc valido"
            ),
        }),
        onSubmit: async (values) => {
            try {
                if (isEdit) {
                    await patch(`/empresas/${id}`, values);
                    await getEmpresas();
                    history.push(`/clients`);
                } else {
                    const { id } = await post(`/empresas`, values);
                    await getEmpresas();
                    history.push(`/clients/${id}`);
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Clients" breadcrumbItem="New" />
                <Container fluid={true}>
                    <Row>
                        <Col xl="6">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">Cliente</h4>
                                    <p className="card-title-desc">
                                        Agregar un nuevo cliente.
                                    </p>
                                    <Form
                                        className="needs-validation"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                    >
                                        <Row>
                                            <Col md="4">
                                                <FormInput
                                                    id="validationName"
                                                    className="mb-3"
                                                    name="nombre"
                                                    label="Nombre"
                                                    placeholder="Ingrese su nombre"
                                                    validation={validation}
                                                />
                                            </Col>
                                            <Col md="4">
                                                <FormInput
                                                    id="validationRuc"
                                                    className="mb-3"
                                                    name="ruc"
                                                    label="Numero Ruc"
                                                    placeholder="Ej: M123817312396"
                                                    validation={validation}
                                                />
                                            </Col>
                                            <Col md="4">
                                                <FormInput
                                                    id="validationTelefono"
                                                    className="mb-3"
                                                    name="telefono"
                                                    label="Numero Telefonico"
                                                    placeholder="Ej: 22252635"
                                                    validation={validation}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormInput
                                                    id="validationDesc"
                                                    className="mb-3"
                                                    type="textarea"
                                                    name="descripcion"
                                                    label="Descripcion"
                                                    placeholder=""
                                                    validation={validation}
                                                />
                                            </Col>
                                        </Row>
                                        <Button color="primary" type="submit">
                                            Guardar
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default NewClient;
