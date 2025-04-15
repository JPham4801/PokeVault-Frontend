import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import * as binderService from '../../services/binderService';

const BinderDetails = () => {
  const { binderId } = useParams();
  const [ binder, setBinder ] = useState(null);
  
  useEffect(() => {
    const fetchBinder = async () => {
      const binderData = await binderService.show(binderId);
      setBinder(binderData);
    };
    fetchBinder();
  }, [binderId]);

  console.log('Binder state:', binder)
  if (!binder) return <main>Loading...</main>

  return (
    <main>
      <section>
        <h2>Cards</h2>

        {!binder.cards.length && <p>There are no cards.</p>}

        {binder.cards.map((card) => (
          <article key={card._id}>
            <header>
              <p>
                {`${card.author.username} posted on
                ${new Date(card.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{card.data.name}</p>
            <img src={card.data.images.small} alt="" />
          </article>
        ))}
      </section>
    </main>
  );
};

export default BinderDetails;