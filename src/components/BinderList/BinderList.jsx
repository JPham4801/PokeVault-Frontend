import { Link } from 'react-router';

const BinderList = (props) => {
  return (
    <main>
      {props.binders.map((binder) => (
        <Link key={binder._id} to={`/binders/${binder._id}`}>
          <article>
            <header>
              <h1>List of everyone's binders</h1>
              <h2>{binder.title}</h2>
              <p>
                {`${binder.author.username} posted on
                ${new Date(binder.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{binder.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default BinderList;