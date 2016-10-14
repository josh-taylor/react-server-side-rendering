import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

const Index = ({todos}) => {
  return <div>
    <h1 className="title">Homepage</h1>
    {todos.map((todo, index) => <div key={`todo-${index}`} className="card">
      <div className="card-content">
        <p>{todo.name}</p>
      </div>
    </div>)}
  </div>
}

Index.propTypes = {
  todos: PropTypes.array.isRequired
}

const mapStateToProps = ({ todos }) => {
  return { todos }
}

export default connect(mapStateToProps)(Index);

