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
} from "react-admin";

export const PostList = (props: JSX.IntrinsicAttributes & ListProps<any>) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="_id" />
      <TextField source="name" />
      <TextField source="status" />
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
      <TextInput source="title" />
      <TextInput source="body" />
    </SimpleForm>
  </Create>
);
