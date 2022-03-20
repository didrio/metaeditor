import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty as authIsEmpty } from 'react-redux-firebase';
import AddTodo from './AddTodo';
import ToDoItem from './TodoItem';

function Todos() {
  const auth = useSelector((state) => state.firebase.auth);
  const { displayName, uid } = auth;
  useFirestoreConnect({
    collection: `users/${uid}/todos`,
    storeAs: 'todos',
  });
  const todos = useSelector((state) => state.firestore.data.todos);

  if (!isLoaded(auth) || authIsEmpty(auth)) {
    return (
      <Navigate
        replace
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return (
    <div>
      <h3>
        Hello
        {displayName}
      </h3>
      <h4>Todos</h4>
      <AddTodo />
      <ul
        style={{
          listStyleType: 'none',
        }}
      >
        {todos
          && Object.values(todos).map((todo) => (
            <li>
              <ToDoItem
                title={todo.title}
                isDone={todo.isDone}
                todoID={todo.todoID}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
export default Todos;
