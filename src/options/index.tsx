import React from 'react';
import ReactDOM from 'react-dom';

function Options () {
  // window.onload = () => {
  //   const button = document.querySelector('button');
  
  //   button?.addEventListener('click', () => {
  //     // .getAuthToken({ interactive: true }, token => console.log('token', token));
  //   })
  // }

  return (
    <div>
      <h1>Options Page</h1>
      <button>
        Log in
      </button>
    </div>
  );
}

ReactDOM.render(<Options />, document.getElementById('root'));
