import css from "./NoteForm.module.css";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

const noteTag = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Minimum length - 3")
    .max(50, "Maximum length - 50")
    .required("Please enter a title"),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(noteTag, "Invalid tag selected")
    .required("Tag is required"),
});

interface NoteFromValues {
  title: string;
  content: string;
  tag: string;
}
const initialValues: NoteFromValues = {
  title: "",
  content: "",
  tag: "Todo",
};

interface Props {
  onCancel: () => void;
}

export default function NoteForm({ onCancel }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createNote"],
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
    onError: (error) => {
      alert("Error during creation:" + error.message);
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={(values) => {
        mutate(values);
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
