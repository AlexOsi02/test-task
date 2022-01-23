import {useState} from "react";
import SelectWrapper from "./SelectorWrapper";
import {Formik} from "formik";
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import {Button, Col, Row} from "react-bootstrap";
import {data} from "../services/services";
import InputWrapper from "./InputWrapper";

const ValidationSchema = Yup.object().shape({
    lastName: Yup.string()
        .max(35, 'Фамилия слишком длинная')
        .matches(/^[a-zA-Zа-яА-Я]+/, 'Некорректное значение')
        .required('Поле обязательно к заполнению'),
    firstName: Yup.string()
        .max(35, 'Имя слишком длинное')
        .matches(/^[a-zA-Zа-яА-Я]+/, 'Некорректное значение')
        .required('Поле обязательно к заполнению'),
    secondName: Yup.string()
        .max(35, 'Отчество слишком длинное')
        .matches(/^[a-zA-Zа-яА-Я]+/, 'Некорректное значение')
        .required('Поле обязательно к заполнению'),
    email: Yup.string().email('Некорректное значение').required('Поле обязательно к заполнению'),
    phoneNumber: Yup.string()
        .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, 'Некорректное значение')
        .min(11, 'Некорректное значение')
        .max(11, 'Некорректное значение')
        .required('Поле обязательно к заполнению'),
    district: Yup.string()
        .min(12, 'Выберите округ'),
    region: Yup.string()
        .min(12, 'Выберите регион'),
});

const DataCollectionForm = () => {
        const [selectedDistrict, setSelectedDistrict] = useState();
        const availableRegions = data.districts.find(item => item.name === selectedDistrict);
        return (
            <div>
                <Formik
                    initialValues={{
                        lastName: '',
                        firstName: '',
                        secondName: '',
                        email: '',
                        phoneNumber: '',
                        district: 'Выбрать...',
                        region: 'Выбрать...'
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={values => console.log(values)}
                >
                    {({
                          values,
                          errors,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-4">
                                <InputWrapper
                                    name={"lastName"}
                                    title={"Фамилия"}
                                    placeholder={"Введите фамилию"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.lastName}
                                    error={errors.lastName}/>
                                <InputWrapper
                                    name={"firstName"}
                                    title={"Имя"}
                                    placeholder={"Введите имя"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.firstName}
                                    error={errors.firstName}/>
                                <InputWrapper
                                    name={"secondName"}
                                    title={"Отчество"}
                                    placeholder={"Введите отчество"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.secondName}
                                    error={errors.secondName}/>
                            </Row>
                            <Row className="mb-4 col-6">
                                <InputWrapper
                                    name={"email"}
                                    title={"Email"}
                                    placeholder={"example@example.com"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.email}
                                    error={errors.email}/>
                            </Row>
                            <Row className="mb-3">
                                <InputWrapper
                                    name={"phoneNumber"}
                                    title={"Номер телефона"}
                                    placeholder={"+7(999)-999-99-99"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.phoneNumber}
                                    error={errors.phoneNumber}/>

                                <Form.Group as={Col}
                                            controlId="formGridDistrict"
                                            onChange={(e) => setSelectedDistrict(e.target.value)}>
                                    <Form.Label>Округ</Form.Label>
                                    <SelectWrapper
                                        name="district"
                                        placeholder="Выбрать..."
                                        error={errors.district}
                                        isInvalid={!!errors.district}
                                        options={data.districts.map(item => item.name)}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.district}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*todo:создатькомпонентусInputom*/}

                                <Form.Group as={Col} controlId="formGridRegion">
                                    <Form.Label>Регион</Form.Label>
                                    <SelectWrapper
                                        name="region"
                                        placeholder="Выбрать..."
                                        error={errors.region}
                                        disabled={!availableRegions?.regions}
                                        isInvalid={!!errors.region}
                                        options={availableRegions?.regions ? availableRegions?.regions : data.districts[0].regions}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.region}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button variant="primary" type="submit">
                                Отправить форму
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
;

export default DataCollectionForm;