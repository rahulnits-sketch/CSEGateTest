type QuestionCardProps = {
  number: number;
  question: string;
  options: string[];
};

export default function QuestionCard({ number, question, options }: QuestionCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-emerald-700">Question {number}</p>
      <h2 className="mt-3 text-lg font-medium leading-7 text-zinc-950">{question}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {options.map((option, index) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-700 hover:border-emerald-500"
          >
            <input type="radio" name={`question-${number}`} value={option} />
            <span>{String.fromCharCode(65 + index)}. {option}</span>
          </label>
        ))}
      </div>
    </article>
  );
}