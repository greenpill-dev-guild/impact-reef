import * as React from "react";

import {
    AutocompleteArrayInput,
    EditBase,
    ReferenceArrayInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Title,
    useEditController
} from "react-admin";
import {Card} from "@/components/ui/card";
import {RichTextInput} from "ra-input-rich-text";

export const EditImpactMetric = () => {
    const editContext = useEditController();

    if (editContext.isLoading) return null;

    const handleSubmit = (values: any) => {
        // handle submit
        console.log(values);
    }
    return (
        <EditBase save={handleSubmit}>
            <div>
                <Title title="Edit impact metric"/>
                <Card>
                    <SimpleForm>
                        <TextInput name="Name" source="name"/>
                        <SelectInput source="importance" choices={[
                            {id: "high", name: "High"},
                            {id: "medium", name: "Medium"},
                            {id: "low", name: "Low"},
                        ]}/>
                        <RichTextInput name="description" source="description" fullWidth/>

                        <RichTextInput name="Rationale" source={"rationale"} fullWidth/>

                        // TODO Input for relationships
                        <ReferenceArrayInput name="Categories" source="name" reference="categories">
                            <AutocompleteArrayInput label="Categories" optionValue="id" optionText="name"/>
                        </ReferenceArrayInput>

                        <ReferenceArrayInput name="Keywords" source="name" reference="keywords">
                            <AutocompleteArrayInput label="Keywords" optionValue="id" optionText="name"/>
                        </ReferenceArrayInput>

                        <ReferenceArrayInput name="Terms" source="name" reference="terms">
                            <AutocompleteArrayInput label="Terms" optionValue="id" optionText="name"/>
                        </ReferenceArrayInput>
                    </SimpleForm>
                </Card>
            </div>
        </EditBase>
    );
};