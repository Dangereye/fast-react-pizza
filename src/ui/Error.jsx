// React router
import { useRouteError } from 'react-router-dom';

// Components
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();

  return (
    <div>
      <h1>
        {error.status && error.statusText
          ? `${error.status} Error - ${error.statusText}`
          : 'Oops! Something went wrong.'}
        😢
      </h1>
      <p>{error?.error?.message ? error.error.message : error.message}</p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
