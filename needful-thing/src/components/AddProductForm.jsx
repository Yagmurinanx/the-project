import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const AddProductForm = () => {
  const initialValues = {
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Product description is required'),
    price: Yup.number().typeError('Price must be a number').required('Price is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.string().url('Please enter a valid URL').required('Image URL is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:3001/clothingItems', values)
      .then((response) => {
        console.log('Product added:', response.data);
        // İşlem başarılı olduğunda kullanıcıya bilgi verilebilir veya farklı bir işlem yapılabilir
      })
      .catch((error) => {
        console.error('An error occurred while adding the product:', error);
        // Hata durumunda kullanıcıya bir hata mesajı gösterilebilir
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      
    >
      {({ isSubmitting }) => (
        <Form className='mt-6 max-w-md mx-auto flex flex-col h-screen justify-between'>
        <div className='my-4'>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name of the product:</label>
          <Field className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm" type="text" name="name" />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className='my-4'>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Description:</label>
          <Field className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm" type="text" name="description" />
          <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className='my-4'>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <Field className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm" type="number" name="price" />
          <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className='my-4'>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
          <Field className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm" type="text" name="category" />
          <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <div className='my-4'>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL:</label>
          <Field className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm" type="text" name="image" />
          <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
        </div>
        <button className='btn btn-info inline-block px-4 py-2 mt-4 ' type="submit" disabled={isSubmitting}>Add Product</button>
        <div className="flex-grow"></div>
      </Form>
      )}
    </Formik>
    </div>
  );
};

export default AddProductForm;
