import React, { useState } from "react";
import { Button, Form } from "./elements";
import { api } from "~/trpc/react";

const Signup = ({ onSubmit, city }: { onSubmit: () => void; city: string }) => {
  const [name, setName] = useState("");
  const [gh, setGH] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [plusOneGH, setPlusOneGH] = useState("");
  const { mutateAsync } = api.attendees.create.useMutation();
  const utils = api.useUtils();
  const createUser = async () => {
    if (name) {
      if (plusOne && !plusOneName) return;

      mutateAsync({
        city: city,
        name: name,
        ghLink: gh || "QueerJS",
      });

      if (plusOne) {
        mutateAsync({
          city: city,
          name: plusOneName,
          ghLink: plusOneGH || "QueerJS",
        });
      }
      await utils.invalidate();
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        createUser();
        onSubmit();
      }}
    >
      <p>
        If you're not comfortable showing your photo and link, you may leave the
        `GitHub Handle` field blank and it will default to `QueerJS`.
      </p>
      <label htmlFor="name">
        Your Name
        <input
          required
          id="name"
          placeholder="Name"
          type="text"
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="gh">
        Github Handle
        <input
          id="gh"
          type="text"
          placeholder="QueerJS"
          pattern="[A-Za-z0-9-]{1,30}"
          value={gh}
          onChange={(e) => setGH(e.target.value.trim())}
        />
      </label>
      <label htmlFor="plus-one" className="flex gap-2">
        <input
          className="!w-auto"
          id="plus-one"
          type="checkbox"
          pattern="[a-zA-Z0-9]+"
          value={plusOne as unknown as string}
          style={{ width: "auto !important", marginRight: "12px !important" }}
          onChange={(e) => setPlusOne(e.target.checked)}
        />
        <span>I am taking a plus one</span>
      </label>
      {plusOne && (
        <label htmlFor="plus-one-name">
          +1 Name
          <input
            required
            id="plus-one-name"
            type="text"
            value={plusOneName}
            onChange={(e) => setPlusOneName(e.target.value)}
          />
        </label>
      )}
      {plusOne && (
        <label htmlFor="plus-one-gh">
          +1 Github Handle
          <input
            id="plus-one-gh"
            type="text"
            placeholder="QueerJS"
            pattern="[A-Za-z0-9-]{1,30}"
            value={plusOneGH}
            onChange={(e) => setPlusOneGH(e.target.value.trim())}
          />
        </label>
      )}

      <Button>
        I AM IN{" "}
        <span role="img" aria-label="Party">
          🎉
        </span>
      </Button>
    </Form>
  );
};

export default Signup;
