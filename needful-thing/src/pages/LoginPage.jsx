import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleLogin = (values) => {
    const { email, password } = values;

    if (isLogin) {
      // Perform login
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        navigate('/product');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Login successful');
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Register a new user
      const userData = { email, password };
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/product');
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('User registered successfully');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values);
          resetForm();
        }}
      >
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <Field
              type="email"
              name="email"
              className="input input-bordered w-full max-w-xs"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="p" className="text-red-500" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="input input-bordered w-full max-w-xs"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="p" className="text-red-500" />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className='btn btn-outline btn-info' 
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            <button
              type="button"
              className='ml-3 btn btn-info' 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'Create an account' : 'Already have an account?'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;

