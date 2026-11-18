export default function RoomCardInfoBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-800 not-last:mb-2">{text}</p>
    </>
  );
}
