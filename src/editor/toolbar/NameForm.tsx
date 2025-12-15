import { FormEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

export const TokenNameForm = ({
  id,
  onSubmit,
}: {
  id: string;
  onSubmit: (name: string) => Promise<unknown>;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");

    if (typeof name === "string") {
      try {
        await onSubmit(name);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Connection Error");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setError(undefined);
  }, [open]);

  return (
    <form onSubmit={handleSubmit} id={id}>
      <TextField
        autoFocus
        required
        name="name"
        label="Name"
        fullWidth
        variant="standard"
        slotProps={{ input: { sx: { fontFamily: "Monospace" } } }}
        error={!!error}
        helperText={error}
        disabled={loading}
      />
    </form>
  );
};
