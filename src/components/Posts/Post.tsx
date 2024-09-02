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
} from "react-admin";

export const PostList = (props: JSX.IntrinsicAttributes & ListProps<any>) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="status" />
      <ImageField source="photos" src="src" title="title" />
    </Datagrid>
  </List>
);

export const PostEdit = (
  props: JSX.IntrinsicAttributes & EditProps<any, Error>
) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="status" />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ImageInput source="photos" label="Related pictures" multiple>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
