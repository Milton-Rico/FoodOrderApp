import { use, useEffect, useState } from 'react';
import { CartContext } from '../store/foodApp-context';
import { currencyFormatting } from '../util/formatting.js';
import useHttp from '../http.js';
import Error from './Error.jsx';
import { fetchAvailableMeals } from '../http';

export default function Shop() {
  const { addItemToCart } = use(CartContext);
  const { isLoading, error, sendRequest } = useHttp(fetchAvailableMeals);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMeals() {
      try {
        const data = await sendRequest();
        setMeals(data);
      } catch (err) {
        // error is already handled in the hook
      }
    }
    loadMeals();
  }, [sendRequest]);

  if (isLoading) return <p className='center'>Fetching meals...</p>;
  if (error) return <Error title='Failed to fetch meals...' message={error} />;

  return (
    <section>
      <ul id='meals'>
        {meals?.map((item) => (
          <li key={item.id} className='meal-item'>
            <article className='product'>
              <img
                src={`http://localhost:3000/${item.image}`}
                alt={item.name}
              />
              <div className='product-content'>
                <div>
                  <h3>{item.name}</h3>
                  <p className='meal-item-price'>
                    {currencyFormatting.format(item.price)}
                  </p>
                  <p className='meal-item-description'>{item.description}</p>
                </div>
                <p className='meal-item-actions'>
                  <button
                    onClick={() => addItemToCart(item.id)}
                    className='button'
                  >
                    Add to Cart
                  </button>
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
