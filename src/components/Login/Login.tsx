import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { ErrorBanner } from '../Common';
import Config from '../../config';

const ERROR = 'something went wrong.. try again';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isError = searchParams.get('error') === 'true';
  const state = Math.random().toString(36).slice(2);
  const loginUrl = Config.apiBaseUrl + '/auth/login?state=' + state;
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="col-md-4">
          <div>{isError && <ErrorBanner message={ERROR} />}</div>
          <br />
          <div>
            <a href={loginUrl}>login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
