const TaskDialog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [haniwaDialog, setHaniwaDialog] = useState(null);

  async function getHaniwaDialog() {
    if (!task.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('@/api/haniwa', {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ haniwaDialog }),
      });

      const data = await response.json();
      setHaniwaDialog(data.message);
    } catch (err) {
      setError('Failed to get dialog');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <p>Hmm...</p>}
      {error && <p>{error}</p>}
      {haniwaDialog ? !isLoading && <p>{haniwaDialog}</p> : null}
    </>
  );
};
