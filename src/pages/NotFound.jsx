import "@styles/NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404 Error!</h1>
        <p className="not-found__subtitle">
          The path you were trying to reach couldn&apos;t be found on the
          server.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
