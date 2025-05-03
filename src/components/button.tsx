type Props = {
  label: string;
  onClick?: () => void;
};

const onDefaultClick = () => console.log('clicked');

export function Button({ label, onClick = onDefaultClick }: Props) {
  return (
    <button className="border rounded bg-zinc-100 px-1.5" onClick={onClick}>
      {label}
    </button>
  );
}
