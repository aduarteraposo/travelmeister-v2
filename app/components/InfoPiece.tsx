export default function InfoPiece({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <dl>
      <dt className="font-semibold text-lg mb-1">{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
}
