import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('Failed to load book details', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully', { variant: 'success' });
        navigate('/Home');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <BackButton />
      <h1 className="text-4xl font-bold text-center text-sky-700 my-6">Edit Book</h1>
      {loading && <Spinner />}

      <div className="flex flex-col border border-sky-300 bg-white shadow-lg rounded-xl p-8 mx-auto">
        <div className="mb-4">
          <label className="text-xl text-gray-700 mb-2 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-xl text-gray-700 mb-2 block">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500"
          />
        </div>
        <div className="mb-6">
          <label className="text-xl text-gray-700 mb-2 block">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-sky-500"
          />
        </div>
        <button
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 w-full"
          onClick={handleEditBook}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default EditBook;
