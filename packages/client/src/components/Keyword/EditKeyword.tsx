import * as React from "react";
import { RichTextInput } from "ra-input-rich-text";
import {
  EditBase,
  SimpleForm,
  TextInput,
  Title,
  useEditController,
} from "react-admin";

export const EditKeyword = () => {
  const editContext = useEditController();

  if (editContext.isLoading) return null;

  return (
    <EditBase>
      <div>
        <Title title="Edit keyword" />
        <div className="card">
          <SimpleForm>
            <TextInput name="Name" source="name" />

            <RichTextInput name="description" source="description" fullWidth />
          </SimpleForm>
        </div>
      </div>
    </EditBase>
  );
};
