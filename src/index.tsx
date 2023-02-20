import { Form, ActionPanel, Action, showToast, Clipboard } from "@raycast/api";
import csv from "csvtojson";
import jsonFormat from "json-format";

type Values = {
  csv: string;
};

export default function Command() {
  function handleSubmit(values: Values) {
    const target = values.csv.replaceAll("\t", ",");

    csv({
      noheader: !values.header,
      output: "json",
    })
      .fromString(target)
      .then((json) => {
        Clipboard.copy(jsonFormat(json, { type: "space", size: 2 }));
      });
    showToast({ title: "JSON Data copied to clipboard", message: "Paste you data where you want." });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Checkbox id="header" title="Header" label="Has header" storeValue />
      <Form.TextArea id="csv" title="Input CSV" placeholder="Paste CSV here..." />
    </Form>
  );
}
