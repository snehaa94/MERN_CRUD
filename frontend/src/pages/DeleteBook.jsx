import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/Home');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <BackButton />
      <h1 className="text-4xl font-bold text-center text-red-600 my-6">Delete Book</h1>
      {loading && <Spinner />}

      <div className="flex flex-col items-center border border-red-400 rounded-xl bg-white shadow-lg w-full p-6 mx-auto">
        <h3 className="text-2xl font-medium text-gray-800 mb-4 text-center">
          Are you sure you want to delete this book?
        </h3>

        <button
          className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 w-full transition duration-200"
          onClick={handleDeleteBook}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Yes, Delete it'}
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;