import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { format } from 'date-fns'; 

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
        navigate('/Home');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-6'>
      <BackButton />
      <h1 className='text-4xl font-bold my-6 text-sky-700'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl p-6 mx-auto w-full max-w-lg'>
          <div className='my-4'>
            <span className='text-xl text-gray-600 font-medium'>Id:</span>
            <span className='text-lg'>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl text-gray-600 font-medium'>Title:</span>
            <span className='text-lg'>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl text-gray-600 font-medium'>Author:</span>
            <span className='text-lg'>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl text-gray-600 font-medium'>Publish Year:</span>
            <span className='text-lg'>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl text-gray-600 font-medium'>Create Time:</span>
            <span className='text-lg'>{book.createdAt && format(new Date(book.createdAt), 'MMM dd, yyyy HH:mm')}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl text-gray-600 font-medium'>Last Update Time:</span>
            <span className='text-lg'>{book.updatedAt && format(new Date(book.updatedAt), 'MMM dd, yyyy HH:mm')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;