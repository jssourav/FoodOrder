import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{error.status}</h1>
      <h1>Oops!!!</h1>
      <h2>Something went wrrong</h2>
      <h3>{error.data}</h3>
    </div>
  );
};

export default Error;
