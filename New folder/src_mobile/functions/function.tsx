export const percentFormatter = (n: number) => {
  return (
    <span className={n > 0 ? 'text-green-600' : n === 0 ? 'text-gray-300' : 'text-red-600'}>{n === 0 ? '--' : n?.toFixed(2) + '%'}</span>
  );
};

export const numberFormatter = (n: number) => {
  return (
    <span className={n > 0 ? 'text-black' :'text-gray-300'}>{n === 0 ? '--' : n.toFixed(2)}</span>
  );
};


export const typeFormatter = (type: string) => {
  return <span> {type === 'CE' ? 'CALL' : 'PUT'}</span>;
};
