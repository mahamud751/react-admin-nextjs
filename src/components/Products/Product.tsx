import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  ListProps,
  EditProps,
  CreateProps,
  ImageField,
  ImageInput,
  ReferenceField,
  ReferenceInput,
} from "react-admin";
import MultipleImageField from "./MultipleImageField";

export const ProductList = (
  props: JSX.IntrinsicAttributes & ListProps<any>
) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="_id" />
      <TextField source="name" />
      <TextField source="status" />
      <MultipleImageField source="photos" title="Image" />
    </Datagrid>
  </List>
);

export const ProductEdit = (
  props: JSX.IntrinsicAttributes & EditProps<any, Error>
) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="status" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="body" />
      <ReferenceInput
        source="categoryId"
        reference="category"
        label="category"
      />
      <ImageInput source="photos" label="Related pictures">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
