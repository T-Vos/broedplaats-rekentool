export default function SimpleBlock({
  mainText = 'default',
  subtleText = 'default',
  type = 'default',
}: {
  mainText?: string | JSX.Element;
  subtleText?: string | JSX.Element;
  type?: 'default' | 'green' | 'red';
}) {
  let color = 'bg-gray-900 hover:bg-gray-800';
  if (type === 'green') {
    color = 'bg-green-900 hover:bg-green-800';
  } else if (type === 'red') {
    color = 'bg-red-900 hover:bg-red-800';
  }

  return (
    <div className={`group block space-y-1.5 rounded-lg ${color} px-5 py-3`}>
      <div className="font-medium text-gray-200 group-hover:text-gray-50">
        {mainText}
      </div>

      <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
        {subtleText}
      </div>
    </div>
  );
}
