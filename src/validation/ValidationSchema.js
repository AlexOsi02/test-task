import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
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