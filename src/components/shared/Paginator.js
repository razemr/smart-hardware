export const Paginator = (props) => {
  const { page, total, limit, onChange } = props;
  const maxPage = Math.ceil(total / limit);

  return (
    <div>
      <input
        type="number"
        onChange={e => onChange(parseInt(e.target.value))}
        value={page}
        min="1"
        max={maxPage}
      ></input>{" "}
      / {maxPage}
    </div>
  );
};
