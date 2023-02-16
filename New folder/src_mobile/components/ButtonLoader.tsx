import ClipLoader from 'react-spinners/ClipLoader';

export default function ButtonLoader({ color, size = 10 }: { color: string; size?: number }) {
  return <ClipLoader color={color} loading={true} size={size} />;
}
