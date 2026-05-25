type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  loadingLabel: string;
  errorLabel: string;
  emptyLabel: string;
};

export function QueryState({
  isLoading,
  isError,
  isEmpty,
  loadingLabel,
  errorLabel,
  emptyLabel
}: QueryStateProps) {
  if (isLoading) {
    return (
      <div className="rounded-md border border-dashed border-border px-4 py-8 text-center text-sm text-text-muted">
        {loadingLabel}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-red-200 bg-error-bg px-4 py-4 text-sm text-error-text dark:border-red-800">
        {errorLabel}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="rounded-md border border-dashed border-border px-4 py-8 text-center text-sm text-text-muted">
        {emptyLabel}
      </div>
    );
  }

  return null;
}
