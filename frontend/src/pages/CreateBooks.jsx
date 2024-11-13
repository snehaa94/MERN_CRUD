import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/Home');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <BackButton />
      <h1 className="text-4xl font-bold text-center text-sky-700 my-6">Create a New Book</h1>
      {loading && <Spinner />}

      <div className="flex flex-col border border-sky-400 rounded-xl bg-white shadow-lg w-full md:w-[600px] p-6 mx-auto">
        <div className="my-4">
          <label className="text-lg font-medium text-gray-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 border border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-400 focus:outline-none transition"
            placeholder="Enter book title"
          />
        </div>

        <div className="my-4">
          <label className="text-lg font-medium text-gray-600">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-2 border border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-400 focus:outline-none transition"
            placeholder="Enter author's name"
          />
        </div>

        <div className="my-4">
          <label className="text-lg font-medium text-gray-600">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="mt-2 border border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-400 focus:outline-none transition"
            placeholder="Enter year of publication"
          />
        </div>

        <button
          className="mt-6 px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 transition duration-200"
          onClick={handleSaveBook}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Book'}
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
