import React from 'react';
import ReactDOM from 'react-dom';

import Carousel from './component/carousel/Carousel.js';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }


  render() {
    return (
        <Carousel />
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
