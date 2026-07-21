export default function ErrorAlert({ message }) {
  return (
    <div className="my-4 rounded-lg  bg-red-50 p-4">
      <h3 className="font-bold text-red-600 text-center uppercase text-2xl">
        sorry, video isn't allowed
      </h3>

      <p className="mt-2 whitespace-pre-wrap text-sm text-red-600 text-center">
        {message} so please refresh
      </p>
    </div>
  );
}