import React from 'react'
import {Formik, Form, Field} from 'formik'

const Formulario = () => {
  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-center text-xl uppercase'>Agregar cliente</h1>

        <Formik>
            <Form className='mt-10'>
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='nombre'>Nombre:</label>
                    <Field
                        id='nombre'
                        className="mt-2 block w-full p-3 bg-gray-50" 
                        type="text"
                        placeholder="Nombre del cliente"
                     />
                </div>
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='empresa'>Empresa:</label>
                    <Field
                        id='empresa'
                        className="mt-2 block w-full p-3 bg-gray-50" 
                        type="text"
                        placeholder="Empresa  del cliente"
                     />
                </div>
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='email'>Email:</label>
                    <Field
                        id='email'
                        className="mt-2 block w-full p-3 bg-gray-50" 
                        type="password"
                        placeholder="Email del cliente"
                     />
                </div>
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='telefono'>Telefono:</label>
                    <Field
                        id='telefono'
                        className="mt-2 block w-full p-3 bg-gray-50" 
                        type="tel"
                        placeholder="Telefono del cliente"
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
                     />
                </div>
                <input 
                    type="submit" 
                    value="Agregar cliente"
                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' 
                />
            </Form>
        </Formik>
    </div>
  )
}

export default Formulario