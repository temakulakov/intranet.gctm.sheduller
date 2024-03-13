import React from 'react';
import './App.css';
import {useEvents} from "./hooks/useEvents";


function App() {
  const { isLoading, isSuccess, error, data } = useEvents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
      <div className="App">
        <h1>{isSuccess && data.length}</h1>
          {
              isSuccess && data?.map(event => <h1 key={event.id}>{`id: ${event.id} name: ${event.title} `}</h1>)
          }
      </div>
  );
}

export default App;
