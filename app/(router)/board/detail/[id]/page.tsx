import { useParams } from 'next/navigation';

export default function PostDetail() {
  const params = useParams();
  const id = params.id;

  return (
    <form id="postDetailForm">
      {/* Add form fields for post details here */}
      <input
        type="hidden"
        name="postId"
        value={id}
      />
      {/* Other input fields can be added as needed */}
    </form>
  );
}
