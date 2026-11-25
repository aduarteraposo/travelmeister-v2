export default function InfoPiece({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <dl>
      <dt className="font-semibold mb-1">{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
}
