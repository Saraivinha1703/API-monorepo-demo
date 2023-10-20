import { useParams } from 'react-router-dom';

export const UpdateAuthorForm = () => {
  const { authorId } = useParams();
  return (
    <form>
      <h1>Update Author</h1>
      <p>{authorId}</p>
    </form>
  );
};
