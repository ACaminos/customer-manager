import React from 'react'
import {Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {
    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre : Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa : Yup.string()
                    .required('El nombre de la empresa es Obligatorio'),
        email: Yup.string()
                .required('El email es obligatorio')
                .email('Email no valido'),
        telefono: Yup.number()
                    .typeError('El numero no es valido')
                    .integer('Numero no valido')
                    .positive('Numero no valido')
    })

    const handleSubmit = async (valores) => {
        try{
            const url = 'http://localhost:4000/clientes'

            const respuesta = await fetch(url, {
                method: 'POST', //se agrega esta linea siempre y cuando sea un metodo diferente a GET, caso contrario no se agrega nada ya que viene por defecto.
                body: JSON.stringify(valores),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            console.log(respuesta)
            const resultado = await respuesta.json()
            console.log(resultado)

            navigate('/clientes')
        } catch(error){
            console.log(error)
        }
        
    }
  return (
    cargando ? <Spinner/> : (
      <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-center text-xl uppercase'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1> {/*Si nombre existe, significa que se esta editando. Si no existe nombre quiere decir que se esta creando un nuevo cliente*/}

        <Formik
            initialValues={{
                nombre : cliente?.nombre ?? "",     //Si esta presente el nombre, se agrega, caso contrario es un string vacio, es una forma mas 'actual' de lo que seria una especie de ternario... Se llama "Nullish coalescing operator"
                empresa : cliente?.empresa ?? "",
                email: cliente?.email ?? "",
                telefono: cliente?.telefono ?? "",
                notas: cliente?.notas ?? ""
            }}
            enableReinitialize={true}
            onSubmit={ async (values, {resetForm}) => {
                handleSubmit(values);
                resetForm()
            }}

            validationSchema={nuevoClienteSchema}
        >
            {({errors, touched})=>{
                // console.log(data)
                return(
                <Form className='mt-10'>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='nombre'>Nombre:</label>
                        <Field
                            id='nombre'
                            className="mt-2 block w-full p-3 bg-gray-50" 
                            type="text"
                            placeholder="Nombre del cliente"
                            name="nombre"
                         />

                         {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                            ) : null
                         }
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='empresa'>Empresa:</label>
                        <Field
                            id='empresa'
                            className="mt-2 block w-full p-3 bg-gray-50" 
                            type="text"
                            placeholder="Empresa  del cliente"
                            name="empresa"
                         />
                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                             ) : null 
                        }
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='email'>Email:</label>
                        <Field
                            id='email'
                            className="mt-2 block w-full p-3 bg-gray-50" 
                            type="email"
                            placeholder="Email del cliente"
                            name="email"
                         />
                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                            ) : null 
                        }
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='telefono'>Telefono:</label>
                        <Field
                            id='telefono'
                            className="mt-2 block w-full p-3 bg-gray-50" 
                            type="tel"
                            placeholder="Telefono del cliente"
                            name="telefono"
                         />
                    </div>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='notas'>Notas:</label>
                        <Field
                            as='textarea'
                            id='notas'
                            className="mt-2 block w-full p-3 bg-gray-50 h-40" 
                            type="text"
                            placeholder="Notas del cliente"
                            name="notas"
                         />
                    </div>
                    <input 
                        type="submit" 
                        value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} /*Si nombre existe, significa que se esta editando. Si no existe nombre quiere decir que se esta creando un nuevo cliente*/
                        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' 
                    />
                </Form>
            )}}

        </Formik>
      </div>
    )
  )
}

Formulario.defaultProps={
    cliente: {},
    cargando: false
}

export default Formulario