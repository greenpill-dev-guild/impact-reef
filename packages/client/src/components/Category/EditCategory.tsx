import * as React from "react";
import {
  EditBase,
  SimpleForm,
  TextInput,
  Title,
  useEditController,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

export const EditCategory = () => {
  const editContext = useEditController();

  if (editContext.isLoading) return null;

  return (
    <EditBase>
      <div>
        <Title title="Edit category" />
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
