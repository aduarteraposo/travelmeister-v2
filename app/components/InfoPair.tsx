export default function InfoPair({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex mb-3">
      <span className="w-2/5 md:w-1/3">{label}</span>
      <span className="flex-1">{value}</span>
    </div>
  );
}
