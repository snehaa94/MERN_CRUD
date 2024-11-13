import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import BB from '../components/BB';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-6'>
      <div className='flex justify-center gap-x-6 mb-6'>
      <BB />
        <button
          className={`px-6 py-2 rounded-lg ${showType === 'table' ? 'bg-sky-600 text-white' : 'bg-sky-300 text-sky-800'} transition duration-300`}
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${showType === 'card' ? 'bg-sky-600 text-white' : 'bg-sky-300 text-sky-800'} transition duration-300`}
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold text-sky-700 my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl hover:text-sky-600 transition duration-200' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
