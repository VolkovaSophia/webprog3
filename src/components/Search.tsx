interface SearchProps {
  query: string;
  onQueryChange: (value: string) => void;
}

function Search({ query, onQueryChange }: SearchProps) {
  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Найти курс..."
      />

      {query && (
        <button
          className="clear-button"
          onClick={() => onQueryChange("")}
          aria-label="Очистить поиск"
        >
          x
        </button>
      )}
    </div>
  );
}

export default Search;