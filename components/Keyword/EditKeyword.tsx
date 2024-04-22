import * as React from "react";

import {EditBase, SimpleForm, TextInput, Title, useEditController} from "react-admin";
import {Card} from "@/components/ui/card";
import {RichTextInput} from "ra-input-rich-text";

export const EditKeyword = () => {
    const editContext = useEditController();

    if (editContext.isLoading) return null;

    return (
        <EditBase>
            <div>
                <Title title="Edit keyword"/>
                <Card>
                    <SimpleForm>
                        <TextInput name="Name" source="name"/>

                        <RichTextInput name="description" source="description" fullWidth/>

                    </SimpleForm>
                </Card>
            </div>
        </EditBase>
    );
};