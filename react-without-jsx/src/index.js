import ReactDOM from 'react-dom';

import { Hello2WithoutJSX as Hello } from './hello';

ReactDOM.render(
    <Hello toWhat="World" />,
    document.getElementById('root')
);
