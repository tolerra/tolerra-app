interface ThreadProps {
    id: number;
    title: string;
    date: string;
    description: string;
}

export default function Thread({ title, date, description }: ThreadProps) {
    return (
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-semibold text-[#31406f] truncate">
          <a href="#" className="truncate block">{title}</a>
        </h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-700 truncate">{description}</p>
      </div>
    );
  }
  